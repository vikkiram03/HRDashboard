import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './Components/SidebarHR';
import Jobs from './Pages/JobsHR';
import CreateJobs from './Pages/CreateJobs';
import EditJobs from './Pages/EditJobs';
import Login from './Pages/LogIn';
import axios from 'axios';
import AllApplicants from './Pages/AllApplicants';
import UpdateJob from './Pages/UpdateJob';

function App() {
    const [jobData, setJobData] = useState([]);
    useEffect(() => {
        axios.get('/api/v1/admin/viewjob')
            .then((res) => setJobData(res.data.job))
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    return (
        <BrowserRouter>
            <Sidebar>
                <Routes>
                    <Route path='/' element={<Jobs jobData={jobData}/>}/>
                    <Route path='/jobs' element={<Jobs jobData={jobData}/>}/>
                    <Route path='/createjob' element={<CreateJobs/>}/>
                    <Route path='/editjobs' element={<EditJobs/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/applicants/:id' element={<AllApplicants/>}/>
                    <Route path='/update/:id' element={<UpdateJob/>}/>
                </Routes>
            </Sidebar>
        </BrowserRouter>
    );
}

export default App;
