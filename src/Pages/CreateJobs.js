import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CreateJobs = (props) => {
    const [jobDetails, setJobDetails] = useState({
        title: '',
        description: '',
        location: '',
        employmentType: '',
        salary: 0,
        qualifications: [],
        applicationDeadline: new Date()
    });

    const handleInput = (key, value) => {
        setJobDetails({
            ...jobDetails,
            [key]: value,
        });
    };

    const handleAddQual = (chip) => {
        setJobDetails({
            ...jobDetails,
            qualifications: [...jobDetails.qualifications, chip],
        });
    };

    const handleDeleteQual = (index) => {
        let updatedQualifications = [...jobDetails.qualifications];
        updatedQualifications.splice(index, 1);
        setJobDetails({
            ...jobDetails,
            qualifications: updatedQualifications,
        });
    };

    const handleUpdate = () => {
        console.log(jobDetails)
        axios
            .post('/api/v1/admin/postjob', jobDetails, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                console.log(response)
                // Reset to default values
                setJobDetails({
                    title: '',
                    description: '',
                    location: '',
                    employmentType: '',
                    salary: 0,
                    qualifications: [],
                    applicationDeadline: new Date()
                });

                Swal.fire({
                    title: "Hurray",
                    text: "Job created successfully!",
                    icon: "success"
                }).then(() => {
                    window.location.href = '/'; 
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: "Oops..",
                    text: "Job not created",
                    icon: "error"
                });
                console.log(err.response);
            });
    };

    return (
        <div>
            <div className='my-10 mx-14 flex flex-col gap-5 items-stretch'>
                <div className='flex flex-col gap-5 items-center justify-center'>
                    <h1 className='text-5xl font-bold' style={{color:`rgba(255,255,255,0.7)`}}>Create a Job</h1>
                </div> <br/>
                <div className="flex flex-col gap-5">
                    <label style={{color:`rgba(255,255,255,0.7)`}} for="title" className="text-lg font-semibold">Job Title</label>
                    <input type="text" id="title" name="title" className="border p-2 rounded-md bg-gray-300" 
                    onChange={(event) => handleInput("title", event.target.value)}/>
                </div>
                <div className='flex flex-col'>
                    <label style={{color:`rgba(255,255,255,0.7)`}} for="jd" className='text-lg font-semibold'>Job Description</label>
                    <textarea id="jd" name='jd' className='border p-2 rounded-md bg-gray-300'
                    onChange={(event) => handleInput("description", event.target.value)}/>
                </div>
                <div className="flex flex-col">
                    <label style={{color:`rgba(255,255,255,0.7)`}} for="loc" className="text-lg font-semibold">Location</label>
                    <input type="text" id="loc" name="loc" className="border p-2 rounded-md bg-gray-300" 
                    onChange={(event) => handleInput("location", event.target.value)}/>
                </div>
                <div className='flex flex-col'>
                    <label style={{color:`rgba(255,255,255,0.7)`}} for="type" className="text-lg font-semibold">Employement Type</label>
                    <select id="jobType" name="jobType" className="border p-2 rounded-md bg-gray-300"
                    onChange={(event) => handleInput("employmentType", event.target.value)}>
                        <option value="" disabled selected>--Select--</option>
                        <option value="Full-Time">Full Time</option>
                        <option value="Part-Time">Part Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label style={{color:`rgba(255,255,255,0.7)`}} for="salary" className="text-lg font-semibold">Salary</label>
                    <input type="number" id="salary" name="salary" min="0" className="border p-2 rounded-md bg-gray-300" 
                    onChange={(event) => handleInput("salary", event.target.value)}/>
                </div>
                <div className="flex flex-col">
                    <label style={{color:`rgba(255,255,255,0.7)`}} for="qual" className="text-lg font-semibold">Qualifications</label> 
                    <p style={{color:`rgba(255,255,255,0.7)`}}>Press enter to add qualifications</p>
                    <input
                        type="text"
                        id="qual"
                        name="qual"
                        className="border p-2 rounded-md bg-gray-300"
                        onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim() !== '') {
                            handleAddQual(e.target.value.trim());
                            e.target.value = '';
                        }
                        }}
                    /> <br/>
                    <ol className='mx-4 flex flex-col' type='1'>
                        <div className='gap-4'>
                        {
                            jobDetails.qualifications.map((qual, index) => (
                            <li key={index} style={{color:`rgba(255,255,255,0.7)`}} className="flex justify-between items-center my-2 border p-2 rounded-md focus:border-black-300">
                                <span>{qual}</span>
                                <button type='button' onClick={() => handleDeleteQual(index)}
                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"> 
                                    Remove
                                </button>
                            </li>
                            ))
                        }
                        </div>
                    </ol>
                    {/* Application Deadline */}
                    <div className="flex flex-col">
                        <label style={{ color: `rgba(255,255,255,0.7)` }} for="deadline" className="text-lg font-semibold">Application Deadline</label>
                        <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            className="border p-2 rounded-md bg-gray-300"
                            onChange={(event) => handleInput("applicationDeadline", event.target.value)}
                        />
                    </div>
                </div>
                <button onClick={() => handleUpdate()} className="bg-purple-600 text-white px-4 py-2 mt-6 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:border-blue-300">Create Job</button>
            </div>
        </div>
    )
}

export default CreateJobs;
