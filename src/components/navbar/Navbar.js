import React, { useEffect } from 'react'
import zensarlogo from '../../images/zensar-logo.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../navbar/navbar.css'

function Navbar() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            <nav className="navigbar sticky top-0 z-10 " data-aos="zoom-in-up" >
                <div className="max-w-5xl mx-auto px-4 sm:mx-16">
                    <div className="flex items-center justify-between h-16">
                        <a href="#">
                            <img src={zensarlogo} className="w-40 " />
                        </a>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar