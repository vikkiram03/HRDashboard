
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleLogin = () => {
        axios.post('/api/v1/login', credentials)
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            console.log(response)
            window.location.href = '/';
        })
        .catch((error) => {
            console.error('Error logging in:', error);
        });
    };

    return (
        <div>
            <div className='my-10 mx-12 flex flex-col gap-5 items-stretch'>
                <div className='flex flex-col gap-5 items-center justify-center'>
                    <h1 className='text-5xl font-bold' style={{color:`rgba(255,255,255,0.7)`}}> Log In </h1>
                </div> <br/>
                <center>
                <div className="space-y-4 items-center">
                    <div className="w-64 flex flex-col">
                        <label style={{color:`rgba(255,255,255,0.7)`}} htmlFor='email' className="text-lg items-start font-semibold"/>
                        <input type="email" id="email" className="border p-2 rounded-md bg-gray-300" placeholder='Enter Email'
                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}/>
                    </div>
                    <div className="w-64 flex flex-col">
                        <label style={{color:`rgba(255,255,255,0.7)`}} htmlFor="password" className="text-lg items-start font-semibold"/>
                        <input type="password" id="password" className="border p-2 rounded-md bg-gray-300" placeholder='Enter Password'
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
                    </div> <br/>
                    <center>
                        <button onClick={handleLogin} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:border-blue-300">
                            Log In
                        </button>
                    </center>
                </div>
                </center>
            </div>
        </div>
    );
};

export default Login;