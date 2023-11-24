import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateJob = () => {
    const {id} = useParams();
    const [jobDetails, setJobDetails] = useState({
        title: '',
        description: '',
        location: '',
        employmentType: '',
        salary: 0,
        qualifications: [],
        applicationDeadline: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        axios.get('/api/v1/admin/jobdetail/' + id)
        .then((res) => setJobDetails(res.data.job))
        .catch((err) => console.log(err))
    }, [id]);

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

    const navigate = useNavigate();
    const handleUpdate = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Job Update Confirmation",
            text: "Are you sure you want to update this job?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then((result) => {
            if (result.isConfirmed) {
            axios.put('/api/v1/admin/updatejob/' + id, jobDetails)
                .then((res) => {
                    Swal.fire({
                        title: "Job Updated",
                        text: "Job has been successfully updated.",
                        icon: "success"
                    }).then(() => {
                        navigate('/editjobs');
                    });
                })
                .catch((err) => {
                    console.error(err);
                    Swal.fire({
                        title: "Error Updating Job",
                        text: "An error occurred while updating the job.",
                        icon: "error"
                    });
                });
            }
        });
    };

    return (
        <div>
            <Link to='/editjobs' className="text-xs bg-purple-600 text-white px-4 py-2 mt-6 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:border-blue-300">Back</Link>
            <div className='flex flex-col items-center justify-center mt-10'>
                <h1 className='text-5xl font-bold' style={{color:`rgba(255,255,255,0.7)`}}>Update Job</h1>
            </div> <br/>
            <form onSubmit={handleUpdate} className='my-10 mx-14 flex flex-col gap-5 items-stretch'>
                {/* Job Title */}
                <div className="flex flex-col">
                    <label style={{color:`rgba(255,255,255,0.7)`}} for="title" className="text font-semibold mb-1">Job Title</label>
                    <input type="text" id="title" name="title" className="border p-2 rounded-md bg-gray-300" 
                    value={jobDetails.title}
                    onChange={e => setJobDetails({...jobDetails, title:e.target.value})}/>
                </div>
                {/* Job Description */}
                <div className='flex flex-col'>
                    <label style={{color:`rgba(255,255,255,0.7)`}} for="jd" className='text font-semibold mb-1'>Job Description</label>
                    <textarea id="jd" name='jd' className='border p-2 rounded-md bg-gray-300'
                    value={jobDetails.description}
                    onChange={e => setJobDetails({...jobDetails, description:e.target.value})}/>
                </div>
                {/* Location */}
                <div className="flex flex-col">
                    <label style={{color:`rgba(255,255,255,0.7)`}} for="loc" className="text font-semibold mb-1">Location</label>
                    <input type="text" id="loc" name="loc" className="border p-2 rounded-md bg-gray-300" 
                    value={jobDetails.location}
                    onChange={e => setJobDetails({...jobDetails, location:e.target.value})}/>
                </div>
                {/* Employment Type */}
                <div className='flex flex-col'>
                    <label style={{color:`rgba(255,255,255,0.7)`}} for="type" className="text font-semibold mb-1">Employement Type</label>
                    <select placeholder='Employement Type' id="jobType" name="jobType" className="border p-2 rounded-md bg-gray-300"
                    value={jobDetails.employmentType}
                    onChange={e => setJobDetails({...jobDetails, employmentType:e.target.value})}>
                        <option value="" disabled selected></option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>
                {/* Salary */}
                <div className="flex flex-col">
                    <label style={{color:`rgba(255,255,255,0.7)`}} for="salary" className="text font-semibold mb-1">Salary</label>
                    <input type="number" id="salary" name="salary" min="0" className="border p-2 rounded-md bg-gray-300" 
                    value={jobDetails.salary}
                    onChange={e => setJobDetails({...jobDetails, salary:e.target.value})}/>
                </div>
                {/* Qualifications */}
                <div className="flex flex-col">
                    <label style={{color:`rgba(255,255,255,0.7)`}} for="qual" className="text font-semibold">Qualifications</label>
                    <p style={{color:`rgba(255,255,255,0.7)`}} className='text-sm mb-1'>Press enter to add qualification</p>
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
                            }
                        }
                    /> <br/>
                    <ol className='my-2 items-center justify-center' type='1'>
                        <div className='flex flex-col'>
                        {jobDetails.qualifications && 
                            jobDetails.qualifications.map((qual, index) => (
                                <li key={index} className="flex justify-between items-center my-2 border p-2 rounded-md focus:border-black-300 w-full">
                                    <span style={{color:`rgba(255,255,255,0.7)`}}>{qual}</span>
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
                        <label style={{ color: `rgba(255,255,255,0.7) `}} for="deadline" className="text font-semibold mb-1">Application Deadline</label>
                        <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            className="border p-2 rounded-md bg-gray-300 w-full"
                            value={jobDetails.applicationDeadline}
                            onChange={(e) => setJobDetails({ ...jobDetails, applicationDeadline: e.target.value })}
                        />
                    </div>
                </div>
                <button type='submit' className="bg-purple-600 text-white px-4 py-2 mt-6 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:border-blue-300">Update Job</button>
            </form>
        </div>
    )
}

export default UpdateJob;
