import React, { Component } from 'react';

class SignUp extends Component {

    state = {
        name: '',
        email: '',
        password: ''
    }

    nameChangeHandler = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    emailChangeHandler = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    passwordChangeHandler = (event) => {
        this.setState({
            password: event.target.value
        });
    }


    registerHandlerMethod = (event) => {
        event.preventDefault();
        fetch('https://damp-falls-23580.herokuapp.com/signUp', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    this.props.setUser(data.user);
                    this.props.routeChanger('home');
                }
            });
        event.preventDefault();

    }



    render() {
        return (
            <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-40-l mw6 center" style={{ "marginTop": "10%" }}>
                <main className="pa4 black-80">
                    <form className="measure" >
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
                            <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input onChange={this.nameChangeHandler} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                            </div>
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
                            <input onClick={this.registerHandlerMethod} className="b ph3 pv2 input-reset ba b--black bg-transparent  pointer f6 dib" type="submit" value="Sign Up" />
                        </div>
                        <div className="lh-copy mt3">
                            <a onClick={() => this.props.routeChanger('signIn')} href="#0" className="f6 pointer link dim black db">Already have a account !</a>
                        </div>
                    </form>
                </main >
            </article>
        );
    }
}


export default SignUp;