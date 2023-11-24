import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const AllApplicants = () => {
    const {id} = useParams();
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/admin/job/' + id)
        .then((res) => setApplicants(res.data.applications))
        .catch((err) => console.log(err))
    })

    const getMonthAndYear = (timestamp) => {
        let date = new Date(timestamp);
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return months[month - 1] + ' ' + year;
    }

    const getDuration = (t1, t2) => {
        let date1 = new Date(t1);
        let date2 = new Date(t2);
        let yearDiff = date2.getFullYear() - date1.getFullYear();
        let monthsDiff = date2.getMonth() - date1.getMonth();
        if (date2.getDate() < date1.getDate()) monthsDiff--;
        let s1 = (yearDiff !== 1) ? (yearDiff + ' years ') : (yearDiff + ' year ');
        let s2 = (monthsDiff !== 1) ? (monthsDiff + ' months ') : (monthsDiff + ' month ');
        return s1 + 'and ' + s2;
    }

    return (
        <div>
            <Link to='/editjobs' className="text-xs bg-purple-600 text-white px-4 py-2 mt-6 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:border-blue-300">Back</Link>
            <div className='mt-10 flex flex-col gap-5 items-center justify-center'>
                <h1 className='text-5xl font-bold' style={{color:`rgba(255,255,255,0.7)`}}>All Applicants</h1>
            </div> <br/> <br/> 

            {/* Cards */}
            <div className='mx-28 gap-5'>
            {
                applicants && applicants.map((emp) => (
                    <div className='mb-3 flex justify-between items-center px-6 py-4 bg-white rounded-md border border-black shadow-lg hover:scale-y-105 hover:scale-x-105 duration-300 my-2'>
                        <div className='flex flex-col items-start gap-3'>
                            <h1 className='text-xl font-bold'>{emp.user.firstName} {emp.user.lastName}</h1>
                            <p className='text-sm'>
                                <span className='font-semibold text text-sm'>Email: </span>{emp.user.email}<br/>
                                <span className='font-semibold text text-sm'>Status: </span>{emp.status} <br/>
                                <div className='flex flex-row items-center gap-2 mt-1'>
                                    <span className='font-semibold text text-sm'>Skills: </span>
                                    {
                                        emp.user.profileId.skills.map((sk) => (
                                            <p key={sk} className='text-gray-500 py-1 px-2 rounded-md border border-black'>{sk}</p>
                                        ))
                                    }
                                </div> <br/>
                                <span className='font-semibold text text-sm'>Education: </span>
                                <div className='flex items-center gap-2 mt-1'>
                                    {
                                        <ol type='1'>
                                        {
                                            emp.user.profileId.education.map((ed) => (
                                                <p key={ed}>
                                                <span className='text text-sm'>Degree: </span>{ed.degree}<br/>
                                                <span className='text text-sm'>Institution: </span>{ed.institution}<br/>
                                                <span className='text text-sm'>Graduation Year: </span>{ed.graduationYear}<br/>
                                            </p>
                                        ))
                                        }
                                        </ol>
                                    }
                                </div> <br/>
                                <span className='font-semibold text text-sm'>Experience: </span>
                                <div className='flex items-center gap-2 mt-1'>
                                    {
                                        <ol type='1'>
                                        {
                                            emp.user.profileId.experience.map((exp) => (
                                                <li key={exp}>
                                                    <span className='text text-sm'>Job Role: </span>{exp.title}<br/>
                                                    <span className='text text-sm'>Company: </span>{exp.company}<br/>
                                                    <span className='text text-sm'>Period: </span>{getMonthAndYear(exp.startDate)} - {getMonthAndYear(exp.endDate)}<br/>
                                                    <span className='text text-sm'>Duration: </span>{getDuration(exp.startDate, exp.endDate)}<br/>
                                                </li>
                                            ))
                                        }
                                        </ol>
                                    }
                                </div>
                            </p>
                        </div>
                    </div>
                ))
            }
            </div>  
        </div>
    )
}

export default AllApplicants;
