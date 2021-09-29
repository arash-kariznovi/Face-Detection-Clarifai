import React from 'react';
import Tilt from 'react-tilt';
import  brain from './Logo.png';
import './logo.css';


const Logo = () => {
    return (
        <div className="pa3 pl4">
            <Tilt className="Tilt pa2 shadow-3" options={{ max: 55 }} style={{ height: 120, width: 120 }} >
                <img alt='brain' src={brain}/>
            </Tilt>
        </div>
    )
}

export default Logo;