import React, { Component } from 'react';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
    }
  }

  emailChangeHandler = (event) => {
    this.setState({
      signInEmail: event.target.value
    });
  }

  passwordChangeHandler = (event) => {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onSubmitHandler = (event) => {

    console.log(this.state);
    fetch('https://damp-falls-23580.herokuapp.com/signIn', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    }).then((response) => {
      return response.json();
      //this function will return a promise of what we send from the server!
    }).then((data) => {
      console.log(data);
      if (data.status === 'success') {
        console.log("successs!!!!!");
        this.props.setUser(data.user[0]);
        this.props.routeChanger('home');
      }
    });
    event.preventDefault();
  }



  render() {
    return (
      <article className="br5 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-40-l  mt4 center" style={{ "marginTop": "10%" }}>
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={this.emailChangeHandler} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={this.passwordChangeHandler} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
              </div>
            </fieldset>
            <div className="">
              <input onClick={this.onSubmitHandler} className="b ph3 pv2 input-reset ba b--black bg-transparent  pointer f6 dib" type="submit" value="Sign In" />
            </div>
            <div className="lh-copy mt3">
              <a href="#0" onClick={() => this.props.routeChanger('signUp')} className="f6 pointer link dim black db">Sign up</a>
            </div>
          </form>
        </main >
      </article>
    );
  }


}


export default SignIn;
