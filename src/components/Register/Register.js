import React from 'react';


class Register extends React.Component {

	constructor(props){
		super(props)
		this.state= {
			registerName: '',
			registerEmail: '',
			registerPassword: ''
		}
		
	}

	onNameChange = (event) => {
		this.setState({
			registerName:event.target.value
		});
	}

	onEmailChange = (event) => {
		this.setState({
			registerEmail:event.target.value
		});
	}

	onPasswordChange = (event) => {
		this.setState({
			registerPassword:event.target.value
		});
	}

	onRegisterSubmit = () => { 
		fetch('https://quiet-cove-86364.herokuapp.com/register',{   //we dont have to add the git related heroku link,
      //bcoz it is the location of the our app on github,that will not work
      //we have to use this link that heroku open command will give us(without the git part)
      //for our localhost use 'http://localhost:3000/'
			method: 'post',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPassword
			})
		})
		.then(response => response.json())
		.then(data => {
			if(data.id){
				this.props.onLoadUser(data);
				this.props.onRouteChange('home');
			}
		})
	}

	render(){

		return(
				<article className="br3 ba shadow-5 b--black mv4 w-100 w-50-m w-25-l mw6 center">
					<main className="pa4 black-80">
					  <div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 center mh0">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
					        <input
					        onChange={this.onNameChange} 
					        className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
					        type="text" 
					        name="name"  
					        id="name" />
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input
					        onChange={this.onEmailChange} 
					        className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
					        type="email" 
					        name="email-address"  
					        id="email-address" />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input
					        onChange={this.onPasswordChange} 
					        className="b pa2 input-reset b--black ba bg-transparent hover-bg-black hover-white w-100" 
					        type="password" 
					        name="password"  
					        id="password" />
					      </div>
					    </fieldset>
					    <div className="">
					      <input
					       onClick={this.onRegisterSubmit} 
					       className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
					       type="submit"
					       value="Register" />
					    </div>
					  </div>
					</main>
				</article>
		);

	}

	
}
export default Register;