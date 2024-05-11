import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import { useSelector } from 'react-redux';
import Error from "../components/core/Auth/Error"
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Footer from '../components/common/Footer';

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
    const {catalogName} = useParams();
    const [categoryId,setCategoryId] = useState(null);
    const string = catalogName[0].toUpperCase() + catalogName.substring(1);
    const [catalogPageData,setCatalogPageData] = useState(null);
    const [active,setActive] = useState(1);

    const fetchCategoryDetails = async() =>{
        const result = await apiConnector("GET",categories.CATEGORIES_API);
        console.log("Result in catalog : ",result);
        const array = result?.data?.allCategories;
        console.log("Printing the array IN Category : ",array);
        const id = array.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
        setCategoryId(id);

        console.log("Printing the category id : ",categoryId);
    }
    useEffect(()=>{
        fetchCategoryDetails();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                console.log("PRinting res!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);

    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }
  return (
    <div className=' h-screen w-screen '>

            {/* Section-1 */}
            <div className=' w-screen bg-richblack-900'>
                <div className=' w-11/12 mx-auto max-w-maxContent text-richblack-25 pt-28 pb-16 flex flex-col gap-5 '>
                    <p>{`Home / Catalog / ` }
                    <span className=' text-yellow-50'>{string}</span></p>
                    <p className=' text-3xl font-bold'>{catalogPageData?.data?.selectedCategory?.name}</p>
                    <p className=''>{catalogPageData?.data?.selectedCategory?.description}</p>
                </div>
            </div>


            {/* Section-2 */}
            <div className=' w-screen bg-richblack-700'>
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">

                    <div className=" text-4xl font-bold text-white">Courses to get you started</div>

                    <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p
                        className={`px-4 py-2 ${
                        active === 1
                            ? "border-b border-b-yellow-25 text-yellow-25"
                            : "text-richblack-50"
                        } cursor-pointer`}
                        onClick={() => setActive(1)}
                    >
                        Most Populer
                    </p>
                    <p
                        className={`px-4 py-2 ${
                        active === 2
                            ? "border-b border-b-yellow-25 text-yellow-25"
                            : "text-richblack-50"
                        } cursor-pointer`}
                        onClick={() => setActive(2)}
                    >
                        New
                    </p>
                    </div>

                    <div>
                    <CourseSlider
                        Courses={catalogPageData?.data?.selectedCategory?.courses}
                    />
                    </div>
                </div>
            </div>
            

            {/* Section-3 */}

            {
                catalogPageData?.data?.differentCategories.map((cc)=>{
                    return <div> {
                        cc.courses.length>0?
                        <div className=' w-screen bg-richblack-700'>
                            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">

                                {
                                    console.log("Thus is the name of the person : ")
                                }
                                <div className=" text-4xl font-bold text-white">Top Courses in {cc.name}</div>

                                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                                </div>

                                <div>
                                <CourseSlider
                                    Courses={cc?.courses}
                                />
                                </div>
                            </div>
                        </div>
                        :
                        <div className=' w-screen bg-richblack-700'>
                            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">

                                {
                                    console.log("This is the name of the perosn DDDDDDDDD",cc)
                                }

                                <div className=" text-4xl font-bold text-white">Top Courses in {cc.name}</div>

                                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                                </div>

                                <div className=' ml-4 text-richblue-300'>
                                    No Courses found in this Category
                                </div>
                            </div>
                        </div>
                    }
                    </div>
                })
            }
        

            {/* Section-4 */}
            <div className=' w-screen bg-richblack-700'>
                <div className=' mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>

                    <div className=" text-4xl font-bold text-white">Frequently Bought</div>

                    <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <CourseSlider
                            Courses={catalogPageData?.data?.mostSellingCourses}
                        />
                    </div>

                </div>
            </div>
            
            <Footer/>
    </div>
  )
}

export default Catalog