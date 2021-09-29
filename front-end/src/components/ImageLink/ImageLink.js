import React from 'react';
import './ImageLink.css';

const ImageLink = ({onInputChange,onButtonChange}) => {
    return (
        <div style={{ flexDirection: 'column' }}
            className='pa3 direction'>
            <h2 className='black pa2 ma3 '>The magic brain will detect faces in your pictures! </h2>
            <div className='my-link pa4 br3 direction' style={{ width: '45%' }} >
                <input className='link pa0 br3' style={{ height: '3em', width: '65%' }}
                onChange={onInputChange} />
                <button className='pa1 white bg-light-purple br2'
                    style={{ height: '3em', width: '35%', fontFamily:'arial' }} 
                    onClick={onButtonChange}>
                    <strong>Detect</strong></button>
            </div>
        </div>
    )
}

export default ImageLink;