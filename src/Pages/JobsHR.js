// import React, { useState } from 'react';
import React from 'react';
// import Searchbar from '../Components/Searchbar';

const Jobs = (props) => {    
    const jobData = props.jobData;
    return (
        <div>
            <div className='mt-10 flex flex-col gap-5 items-center justify-center'>
                <h1 className='text-5xl font-bold' style={{color:`rgba(255,255,255,0.7)`}}>Jobs</h1>
            </div> <br/> <br/> 
            {/* <Searchbar/> */}
            
            {/* Cards */}
            <div className='mx-28 mb-4 gap-5'>
            {
                jobData && jobData.map((job) => (
                    <div className='flex justify-between items-center px-6 py-4 bg-white rounded-md border border-black shadow-lg hover:scale-y-105 hover:scale-x-105 duration-300 my-2'>
                        <div className='flex flex-col items-start gap-3'>
                            <h1 className='text-xl font-bold'>{job.title}</h1>
                            <p className='text-sm'>
                                <span className='font-semibold text text-sm'>Job description: </span><span className='whitespace-normal break-words'>{job.description}</span><br/>
                                <span className='font-semibold text text-sm'>Location: </span>{job.location} <br/>
                                <span className='font-semibold text text-sm'>Job Type: </span>{job.employmentType} <br/>
                                <span className='font-semibold text text-sm'>Salary: </span>{job.salary} <br/>
                                <span className='font-semibold text text-sm'>Qualifications: </span>
                                <div className='flex items-center gap-2 mt-1'>
                                    {job.qualifications.map((qual) => (
                                        <p key={qual} className='text-gray-500 py-1 px-2 rounded-md border border-black'> {qual}</p>
                                    ))}
                                </div>
                            </p>
                        </div>
                        <div className='flex items-end'>
                            <button style={{width:"200px"}} type='button' disabled className='text-gray-500 border border-gray-500 px-10 py-2 rounded-md'>
                                Apply Now
                            </button>
                        </div>
                    </div>
                ))
            }
            </div>  
        </div>
    )
}

export default Jobs;
