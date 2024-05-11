import { endpoints } from "../apis";
import {setToken,setLoading} from "../../slices/authSlice"
import {setUser} from "../../slices/profileSlice"
import {resetCart} from "../../slices/cartSlice"
import toast from "react-hot-toast";
import {apiConnector} from "../apiconnector"
import {useSelector} from "react-redux"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = endpoints

export function sendOtp(email,navigate){


    return async (dispatch) =>{
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));

        console.log("This is the line before try block!!");
        try{
            const response = await apiConnector("POST",SENDOTP_API,{
                email,
                
            })

            console.log("This is the line afeter the response");
            console.log("SendOTP API response .........",response);
            console.log("Printing the status of response : ",response.data.success);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Email sent successfully");
            navigate("/verify-email");
        }
        catch(error){
            console.log("Error in sending OTP : ",error);
            toast.error("Could not sent OTP");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);


    }
}

export function logout(navigate){
    return (dispatch) =>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        resetCart();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");

    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async (dispatch) =>{

        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST",SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });

            console.log("SIGNUP API response : ",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Account created successfully");
            navigate("/login");
        }
        catch(error){
            console.log("There is some error in created this account",error);
            toast.error("Signup Failed!");
            navigate("/signup");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login(email,password,navigate){

    // const {user} = useSelector((state)=>state.profile);

    return async(dispatch)=>{

    // const {user} = useSelector((state)=>state.profile)
        
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            
            const response = await apiConnector("POST",LOGIN_API,{
                email,
                password,
            })

            console.log("Login API response : ",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Login successful");
            dispatch(setToken(response.data.token));

            console.log("Now I am in the login api and trying to solve the error");

            const userImage = response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({...response.data.user,image:userImage}));

            // console.log("Now the user in the api is : ",user);
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.user));
            // console.log(use)
            navigate("/dashboard/my-profile")
        } catch (error) {
            console.log("There is some error in login of user : ",error);
            toast.error("Login Failed");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch)=>{

        const toastId = toast.loading("Loading..");
        dispatch(setLoading(true));

        try {
            
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{
                email,
            })

            console.log("RESETPASSTOKEN API response : ",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);

        } catch (error) {
            console.log("There is some error in sending Reset Email : ",error);
            toast.error("Failed to send reset Email");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function resetPassword(password,confirmPassword,token,navigate){
    return async(dispatch)=>{

        const toastId = toast.loading("Loading..");
        dispatch(setLoading(true));

        try {
            
            const response = await apiConnector("POST",RESETPASSWORD_API,{
                password,
                confirmPassword,
                token,
            })

            console.log("RESET PASSWORD API response : ",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Password reset successfully");
            navigate("/login");

        } catch (error) {
            console.log("There is some error in reset password",error);
            toast.error("Failed to reser password !"); 
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

