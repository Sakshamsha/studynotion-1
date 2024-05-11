import toast from "react-hot-toast";
import {apiConnector} from "../apiconnector"
import {settingsEndpoints} from "../apis"
import {setUser} from "../../slices/profileSlice"
import { logout } from "./authApi";


const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints;


export function updateProfile(token,formData){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");

        console.log("Printing formData1:",formData);

        try {

            // const {user} = useSelector((state)=>state.profile);
            console.log("This is step 0");
            const response = await apiConnector(
                "PUT",
                UPDATE_PROFILE_API,
                formData,
                {
                    Authorization: `Bearer${token}`,
                }
             )

             console.log("This is step 1");
             
             console.log("UPDATE_PROFILE_API API response : ",response);
             console.log("UPDATE_PROFILE_API API response.data : ",response.data);
             
             if(!response.data.success){
                 throw new Error(response.data.message);
                }
                
             console.log("This is step 2");
             toast.success("Profile Updated successfully");
             console.log("Hi");
             dispatch(setUser(response.data.newUser));
             localStorage.setItem("user",JSON.stringify(response.data.newUser));
            // //  user.user.image = response.data.data;
            //  console.log("This is step 2");
             
        } catch (error) {
            console.log("There is some error in updating profile form data  : ",error);
            toast.error("Could Not Update profile");
        }

        toast.dismiss(toastId);
    }
}

export function updateDisplayPicture(token,formData){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");

        try {

            // const {user} = useSelector((state)=>state.profile);
            console.log("This is step 0");
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
             )

             console.log("This is step 1");
             
             console.log("UPDATE_DISPLAY_PICTURE_API API response : ",response);
             
             if(!response.data.success){
                 throw new Error(response.data.message);
                }
                
             console.log("This is step 2");
             toast.success("Display Picture Updated successfully");
             console.log("Hi");
             dispatch(setUser(response.data.data));
             localStorage.setItem("user",JSON.stringify(response.data.data));
            //  user.user.image = response.data.data;
             console.log("This is step 2");
             
        } catch (error) {
            console.log("There is some error in updating profile : ",error);
            toast.error("Could Not Update Display Picture")
        }

        toast.dismiss(toastId);
    }
}
export function updatePassword(token,formData){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");

        try {

            // const {user} = useSelector((state)=>state.profile);
            console.log("This is step 0");
            const response = await apiConnector(
                "POST",
                CHANGE_PASSWORD_API,
                formData,
                {Authorization: `Bearer${token}`}
             )

             console.log("This is step 1");
             
             console.log("CHANGE_PASSWORD_API API response : ",response);
             
             if(!response.data.success){
                 throw new Error(response.data.message);
                }
                
             console.log("This is step 2");
             toast.success("Password Changed successfully");
             console.log("Hi");
            //  dispatch(setUser(response.data.data));
            //  localStorage.setItem("user",JSON.stringify(response.data.data));
            //  user.user.image = response.data.data;
            //  console.log("This is step 2");
             
        } catch (error) {
            console.log("There is some error in updating profile : ",error);
            toast.error("Could Not Update Password")
        }

        toast.dismiss(toastId);
    }
}

export function deleteAccount(token,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");

        try {

            // const {user} = useSelector((state)=>state.profile);
            console.log("This is step 0");
            const response = await apiConnector(
                "DELETE",
                DELETE_PROFILE_API,
                null,
                {
                    Authorization: `Bearer${token}`
                }
             )

             console.log("This is step 1");
             
             console.log("DELETE_PROFILE_API API response : ",response);
             
             if(!response.data.success){
                 throw new Error(response.data.message);
                }
                
             console.log("This is step 2");
             toast.success("Account Deleted successfully");
             console.log("Hi");
             dispatch(logout(navigate));
            //  dispatch(setUser(response.data.data));
            //  localStorage.setItem("user",JSON.stringify(response.data.data));
            //  user.user.image = response.data.data;
            //  console.log("This is step 2");
             
        } catch (error) {
            console.log("There is some error in updating profile : ",error);
            toast.error("Could Not Update Password")
        }

        toast.dismiss(toastId);
    }
}