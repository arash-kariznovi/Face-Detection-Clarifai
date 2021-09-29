import React from 'react';

const Navigation = ({ onRoute, isSignedIn }) => {
	if (isSignedIn) {
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }} className='pr4'>
				<p className='pointer link f3 dim black underline pa3' onClick={() => onRoute('signout') }>Sign Out</p>
			</nav>
		)
	} else {
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }} className='pr4'>
				<p className='pointer link f3 dim black underline pa3' onClick={() => onRoute('register') }>Register</p>
				<p className='pointer link f3 dim black underline pa3' onClick={() => onRoute('signin') }>Sign in</p>
			</nav>
		)
	}


}

export default Navigation;