import React, {useState} from 'react'
import { Icon } from '@iconify/react';
import bxMoon from '@iconify/icons-bx/bx-moon';
import bxSun from '@iconify/icons-bx/bx-sun';

function Navbar() {

    const [toggle, setToggle] = useState(true)

    function toggleTheme(){
        if (toggle) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        setToggle(prev => !prev) 
    }

    return (
        <div className="navbar">
            <div className="nav-logo">
                <span className="nav-logo-main">Olds</span>
                <small className="nav-logo-foot">the new news...</small>
            </div>
            <div className="nav-dark" onClick={toggleTheme}>
                {
                    toggle ? 
                    <Icon icon={bxMoon} style={{color: '#f1f1f5', fontSize: '20px'}} /> : 
                    <Icon icon={bxSun} style={{color: '#f1f1f5', fontSize: '20px'}} />
                }
            </div>
        </div>
    )
}

export default Navbar
