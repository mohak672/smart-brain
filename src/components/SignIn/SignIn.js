import React from 'react';


class SignIn extends React.Component {

	constructor(props){
		super(props)
		this.state={
			signInEmail:'',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({
			signInEmail:event.target.value
		});
	}

	onPasswordChange = (event) => {
		this.setState({
			signInPassword:event.target.value
		});
	}

	onSignInSubmit = () => {
		fetch('https://quiet-cove-86364.herokuapp.com/signin',{ //we dont have to add the git related heroku link,
      //bcoz it is the location of the our app on github,that will not work
      //we have to use this link that heroku open command will give us(without the git part)
       //for our localhost use 'http://localhost:3000/'
			method: 'post',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
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
					      <legend className="f1 fw6 ph0 center mh0">Sign In</legend>
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
					         name="password"  id="password" />
					      </div>

					    </fieldset>
					    <div className="">
					      <input
					       onClick={this.onSignInSubmit} 
					       className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
					       type="submit"
					       value="Sign in" />
					    </div>
					    <div className="lh-copy mt3">
					      <p //this should ne p tag instead of anchor <a> tag bcoz anchor tag does not have onclick event,
					      //it requires page link to work
					      onClick={() => this.props.onRouteChange('register')} 
					      className="f6 link dim black db pointer">Register</p>
					     
					    </div>
					  </div>
					</main>
				</article>
		);
	}

	
}
export default SignIn;