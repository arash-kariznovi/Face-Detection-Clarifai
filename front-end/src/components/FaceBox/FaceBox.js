import React from 'react';
import './FaceBox.css';

const FaceBox = ({ imageUrl, box }) => {
	return (
		<div className='tc flex pa3 justify-center'>
			<div className='absolute mt2'>
				<img alt='Face' id='faceImage' src={imageUrl}
					style={{ height: '400px', width: '400px' }} />
				<div className='bounding-box' style={{ left: box.leftCol, right: box.rightCol, top: box.topRow, bottom: box.bottomRow }}></div>

			</div>
		</div>
	)
}

export default FaceBox;