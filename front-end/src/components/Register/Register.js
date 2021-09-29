import React from 'react';


class Register extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
			signInName: ''
		}
	}

	onEmail = (event) => {
		this.setState({ signInEmail: event.target.value })
	}

	onPassword = (event) => {
		this.setState({ signInPassword: event.target.value })
	}

	onName = (event) => {
		this.setState({ signInName: event.target.value })
	}

	onSubmit = () => {
		fetch('http://localhost:3000/register/', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: this.state.signInName,
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(res => console.log(res))
			.then(data => {
				if (data) {
					this.onRoute('home')
				}
			})
	}

	render() {

		return (
			<article className="br3 tc ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
				<main className="pa4 black-80">
					<form className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
								<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									onChange={this.onName}
									type="text" name="name" id="name" />
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									onChange={this.onEmail}
									type="email" name="email-address" id="email-address" />
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									onChange={this.onPassword}
									type="password" name="password" id="password" />
							</div>
						</fieldset>
						<div className="">
							<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit" value="Sign in" onClick={this.onSubmit} />
						</div>

					</form>
				</main>
			</article>

		)
	}




}

export default Register;