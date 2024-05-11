import React from 'react'
import HighlightText from '../Homepage/HighlightText';
import Button from '../Homepage/Button';

const Description = () => {
    const LearningGridArray = [
        {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/",
        },
        {
          order: 1,
          heading: "Curriculum Based on Industry Needs",
          description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 3,
          heading: "Certification",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 5,
          heading: "Ready to Work",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
      ];
  return (
    <div className=' bg-richblack-900 w-full'>
        <div className=' grid lg:grid-cols-4 grid-cols-1 w-11/12 max-w-maxContent mx-auto pt-20'>
            {
                LearningGridArray.map((card,index)=>{
                    return <div
                    key={index}
                    className={` h-[300px]
                    ${index==0?" col-span-2 bg-transparent":" col-span-1"}
                    ${card.order === 3 && " col-start-2"}
                    ${card.order>0 && card.order%2 ===0 ? " bg-richblack-800":" bg-richblack-700"}`}>
                        
                        {
                            index ===0?(
                                <div className=''>
                                    <div className=' text-richblack-5 text-4xl font-semibold pr-20'>
                                        {card.heading}
                                        <HighlightText text={`${card.highlightText}`}/>
                                    </div>
                                    <div className=' text-richblack-300 pr-16 mt-3'>
                                        {card.description}
                                    </div>
                                    <div className=' w-fit mt-4'>
                                        <Button linkto={card.BtnLink} active={true}>
                                            {card.BtnText}
                                        </Button>
                                    </div>
                                </div>
                            ):(
                                <div className=' p-8 flex flex-col gap-7'>
                                    <div className=' text-richblack-5 text-[18px]'>{card.heading}</div>
                                    <div className=' text-richblack-300'>{card.description}</div>
                                </div>
                            )
                        }
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default Description