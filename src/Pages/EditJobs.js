import React from 'react';
import JobcardHR from '../Components/JobcardHR';

const EditJobs = () => {
    return (
        <div>
            <div className='mt-10 flex flex-col gap-5 items-center justify-center'>
                <h1 className='text-5xl font-bold' style={{color:`rgba(255,255,255,0.7)`}}>Edit Jobs</h1>
            </div> <br/> <br/>
            <JobcardHR/>
        </div>
    )
}

export default EditJobs;
