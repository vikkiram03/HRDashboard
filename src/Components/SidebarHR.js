import React, { useState } from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import { BsPersonWorkspace } from "react-icons/bs";
import { MdPersonAddAlt1 } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';

function Sidebar({children}) {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path:'/',
            name:'Jobs',
            icon:<BsPersonWorkspace/>
        },
        {
            path:'/createjob',
            name:'Create Jobs',
            icon:<MdPersonAddAlt1/>
        },
        {
            path:'/editjobs',
            name:'Edit Jobs',
            icon:<RiEdit2Fill/>
        }
    ];

    const logout = [
        {
            path:'/login',
            name:'Log Out',
            icon:<FaUser/>
        }
    ];

    return (
        <aside>
            <div className='container-custom'>
                <div style={{width: isOpen ? "200px" : "50px"}} className='sidebar-custom'>
                    <div className='top_section'>
                        <h1 style={{display: isOpen ? "block" : "none"}} className='logo'>HR</h1>
                        <div style={{marginLeft: isOpen ? "50px" : "0px"}} className='bars'>
                            <FaBars onClick={toggle}/>
                        </div>
                    </div>
                    {
                        menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className='link' activeclassname='active'>
                                <div className='icon'>{item.icon}</div>
                                <div style={{display : isOpen ? "block" : "none"}} className={`link_text ${isOpen ? "open" : ""}`}>{item.name}</div>
                            </NavLink>
                        ))                        
                    }
                    {
                        logout.map((item, index) => (
                            <NavLink to={item.path} key={index} className='link' activeclassname='active'>
                                <div className='icon'>{item.icon}</div>
                                <div style={{display : isOpen ? "block" : "none"}} className='link_text'>{item.name}</div>
                            </NavLink>
                        ))
                    }
                </div>
                <main> 
                    {children} 
                </main>
            </div>
        </aside>
    )
}

export default Sidebar
