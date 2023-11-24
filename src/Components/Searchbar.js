import React from 'react';

function Searchbar() {
    return (
        <div className='items-center justify-center flex gap-4 mt-4 mb-14'>
            <select className='text-sm w-60 py-2 bg-zinc-200 font-semibold rounded-md text-center'>
            {/* onChange={(e) => setFilters({...filters, jobRole: e.target.value})}> */}
                <option value="" disabled hidden selected>Job Role</option>
                <option value="Frontend developer">Frontend Developer</option>
                <option value="Backend developer">Backend Developer</option>
                <option value="Fullstack developer">Full Stack Developer</option>
                <option value="UI/UX designer">UI/UX Designer</option>
                <option value="Data scientist">Data Scientist</option>
                <option value="Machine learning engineer">Machine Learning Engineer</option>
                <option value="Devops engineer">DevOps Engineer</option>
                <option value="Product manager">Product Manager</option>
                <option value="Project manager">Project Manager</option>
                <option value="QA tester">QA Tester</option>
                <option value="Sales representative">Sales Representative</option>
                <option value="Marketing specialist">Marketing Specialist</option>
                <option value="Digital marketing specialist">Digital Marketing Specialist</option>
                <option value="SEO specialist">SEO Specialist</option>
                <option value="Social media specialist">Social Media Specialist</option>
                <option value="Content writer">Content Writer</option>
            </select>
            <select className='text-sm w-60 py-2 bg-zinc-200 font-semibold rounded-md text-center'>
             {/* onChange={(e) => setFilters({...filters, employmentType: e.target.value})}> */}
                <option value="" disabled hidden selected>Employment Type</option>
                <option value="Full-Time">Full Time</option>
                <option value="Part-Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
            </select>
            <select className='text-sm w-60 py-2 bg-zinc-200 font-semibold rounded-md text-center'>
             {/* onChange={(e) => setFilters({...filters, location: e.target.value})}> */}
                <option value="" disabled hidden selected>Location</option>
                <option value="Kanpur">Kanpur</option>
                <option value="Chennai">Chennai</option>
                <option value="Delhi">Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Noida">Noida</option>
                <option value="Pune">Pune</option>
            </select>
            <button className='text-sm w-60 py-2 text-white bg-purple-500 font-bold rounded-md hover:bg-purple-600 hover:text-purple-50'>
             {/* onClick={handleSearch}>  */}
                Search 
            </button>
        </div>
    )
}

export default Searchbar
