import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import bxMoon from '@iconify/icons-bx/bx-moon';
import bxSun from '@iconify/icons-bx/bx-sun';

function Navbar() {

    const [isDark, setIsDark] = useState(localStorage.getItem('darkModePerference') === 'dark' ? true : false)

    useEffect(() => {
        if(!!localStorage.getItem('darkModePerference')){
            if(localStorage.getItem('darkModePerference') === 'dark')
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            }
    }, [])

    function toggleTheme(){
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('darkModePerference', 'light');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('darkModePerference', 'dark');
        }
        setIsDark(prev => !prev) 
    }

    return (
        <div className="navbar">
            <div className="nav-logo">
                <span className="nav-logo-main">Olds</span>
                <small className="nav-logo-foot">the new news...</small>
            </div>
            <div className="nav-dark" onClick={toggleTheme}>
                {
                    isDark ? 
                    <Icon icon={bxSun} style={{color: '#f1f1f5', fontSize: '20px'}} /> :
                    <Icon icon={bxMoon} style={{color: '#f1f1f5', fontSize: '20px'}} />
                }
            </div>
        </div>
    )
}

export default Navbar
