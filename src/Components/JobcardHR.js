import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const JobcardHR = () => {
    const [jobData, setJobData] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/admin/viewjob')
            .then((response) => {
                console.log('Axios Reponse: ', response);
                setJobData(response.data.job);
                console.log(response.data);
            })
            .catch((error) => { console.error('Error fetching data:', error);});
    }, []);

    // Delete
    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async(result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleting...",
                        text: "Please wait while we delete the job.",
                        showConfirmButton: false
                    });
            
                    try {
                        const response = await axios.delete(`/api/v1/admin/deleteNotification/${id}`);
                        Swal.fire({
                            title: "Deleted!",
                            text: "The job has been deleted.",
                            icon: "success"
                        }).then(() => {
                            const updatedJobData = jobData.filter(job => job._id !== id);
                            setJobData(updatedJobData);
                            console.log('Job deleted: ', response.data);
                            window.location.reload();
                        });
                    } catch (error) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong! Try again",
                        });
                        console.error('Error deleting job: ', error);
                    }
                }
            });
        } catch (error) {
          console.error('Error deleting job: ', error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Try again",
          });
        }
      };
      

    return (
        <div className='mx-28 mb-4 gap-5'>
            {
                jobData.map((jobData) => (
                    <div className='flex justify-between items-center px-6 py-4 bg-white rounded-md border border-black shadow-lg hover:border-purple-500 hover:scale-y-105 hover:scale-x-105 duration-300 my-2'>
                        <div className='flex flex-col items-start gap-3'>
                            <h1 className='text-xl font-bold'>{jobData.title}</h1>
                            <p className='text-sm'>
                                <span className='font-semibold text-sm'>Job description: </span><span className='whitespace-norma break-wordsl'>{jobData.description}</span><br/>
                                <span className='font-semibold text-sm'>Location: </span>{jobData.location} <br/>
                                <span className='font-semibold text-sm'>Job Type: </span>{jobData.employmentType} <br/>
                                <span className='font-semibold text-sm'>Salary: </span>{jobData.salary} <br/>
                                <span className='font-semibold text-sm'>Qualifications: </span>
                                <div className='flex items-center gap-2 mt-1'>
                                    {jobData.qualifications.map((qual) => (
                                        <p key={qual} className='text-sm text-gray-500 py-1 px-2 rounded-md border border-black'> {qual}</p>
                                    ))}
                                </div>
                            </p>
                        </div>
                        <div className='flex flex-col items-end gap-4'>
                            <Link style={{width:"250px", cursor:'pointer'}} className='text-center text-blue-500 border border-blue-500 px-10 py-2 rounded-md hover:bg-blue-600 hover:text-purple-50'
                            to={`/applicants/${jobData._id}`}>
                                See Applicants
                            </Link>
                            <Link style={{width:"250px", cursor:'pointer'}} className='text-center text-green-500 border border-green-500 px-10 py-2 rounded-md hover:bg-green-600 hover:text-purple-50'
                            to={`/update/${jobData._id}`}>
                                Update Details
                            </Link>
                            <button style={{width:"250px", cursor:'pointer'}} type='button' className='text-red-500 border border-red-500 px-10 py-2 rounded-md hover:bg-red-600 hover:text-purple-50'
                            onClick={() => handleDelete(jobData._id)}>
                                Delete Job
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default JobcardHR;
