import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Aux from './components/hoc/hocAux';
import Spinner from './components/Spinner/Spinner';
import './App.css';



const app = new Clarifai.App({
  apiKey: '1e54b9db0baf466e8f09fdc2528d54a0'
});

const ParticleOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};
class App extends Component {
  state = {
    input: '',
    imageUrl: '',
    box: [],
    route: 'signIn',
    loading: false,
    signedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      password: '',
      entries: '',
      joined: ''
    }
  }



  onChangeEventHandler = (event) => {
    console.log(event.target.value);
    const url = event.target.value;
    this.setState({ input: url, imageUrl: url, box: [] });
  }

  calculateFaceLocation = (data) => {
    //console.log(data[0].region_info.bounding_box);
    const boxes = data.map((person) => {
      const clarifaiFace = person.region_info.bounding_box;
      console.log(clarifaiFace);
      const image = document.getElementById('inputimage');
      console.log(image);
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        left: clarifaiFace.left_col * width,
        right: width - (clarifaiFace.right_col * width),
        top: clarifaiFace.top_row * height,
        bottom: height - (clarifaiFace.bottom_row * height)
      }
    });
    return boxes;
  }

  displayFaceBox = (boxes) => {
    console.log(boxes);
    this.setState({ box: boxes, loading: false });
  }

  updateUserEntries = () => {
    console.log(this.state.user.id);
    fetch('https://damp-falls-23580.herokuapp.com/image', {
      method: 'put',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id
      })
    }).then((response) => {
      console.log("response ", response);
      return response.json()
    })
      .then(data => {
        console.log("dataUSER-----------", data);
        if (data.user) {
          this.setState({
            user: data.user,
            loading: false,
            box: []
          })

        }
      }).catch(e => {
        this.setState({ loading: false });
        console.log(e)
      });

  }


  onClickHandler = () => {
    this.setState({ loading: true });
    console.log("click");
    const input = this.state.input;
    this.setState({ imageUrl: input });
    const url = this.state.input;
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", { url }).then((response) => {
      console.log(response);
      const data = response.outputs[0].data.regions;
      this.displayFaceBox(this.calculateFaceLocation(data));
      this.updateUserEntries();
    }).catch((e) => {
      this.setState({ loading: false })
      console.log(e);
    })
  }

  onRouteChange = (newRoute) => {
    console.log("INSIDE FUNCTION  ", newRoute);

    if (newRoute === 'signIn' || newRoute === 'signUp') {
      this.setState({
        route: newRoute,
        signedIn: false
      })
    }
    else if (newRoute === 'home') {
      this.setState(
        {
          signedIn: true,
          route: newRoute
        });
    }
  }

  setUserFunction = (user) => {
    this.setState({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        entries: user.entries,
        joined: user.joined
      }
    });
  }





  render() {
    return (
      <div className="App">
        <Particles
          className="particles"
          params={ParticleOptions} />
        <Navigation routeChanger={this.onRouteChange} isSigned={this.state.signedIn}
        />
        <div className="pv2 ph2 tc-l">
          <h4>
            Love It ! Give a star on github
          </h4>
          <a class="no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center ma2 tc br2 pa2" href="https://github.com/sudipt1999/FaceRecApp" title="GitHub">
            <svg class="dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M8 0C3.58 0 0 3.582 0 8c0 3.535 2.292 6.533 5.47 7.59.4.075.547-.172.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.223 1.873.87 2.33.665.072-.517.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.873.31-1.587.823-2.147-.083-.202-.358-1.015.077-2.117 0 0 .672-.215 2.2.82.638-.178 1.323-.266 2.003-.27.68.004 1.364.092 2.003.27 1.527-1.035 2.198-.82 2.198-.82.437 1.102.163 1.915.08 2.117.513.56.823 1.274.823 2.147 0 3.073-1.87 3.75-3.653 3.947.287.246.543.735.543 1.48 0 1.07-.01 1.933-.01 2.195 0 .215.144.463.55.385C13.71 14.53 16 11.534 16 8c0-4.418-3.582-8-8-8" /></svg>
            <span class="f6 ml3 pr2">GitHub</span>
          </a>
        </div>
        {(this.state.route === 'signIn') ?
          <SignIn routeChanger={this.onRouteChange} setUser={this.setUserFunction} />
          : null}
        {(this.state.route === 'signUp') ?
          <SignUp routeChanger={this.onRouteChange} setUser={this.setUserFunction} />
          : null}
        {(this.state.route === 'home') ?
          (<Aux>
            <Logo />
            {(this.state.loading) ? <Spinner /> : null}

            <Rank
              user={this.state.user}
            />
            <ImageLinkForm
              onChangeEvent={this.onChangeEventHandler}
              onClickEvent={this.onClickHandler}
            />
            <FaceRecognition box={this.state.box} url={this.state.imageUrl} />
          </Aux>)
          : null}</div>
    );
  }
}

export default App;
