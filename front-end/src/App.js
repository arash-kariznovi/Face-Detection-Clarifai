import React, { Component } from 'react';
import './App.css';
import FaceBox from './components/FaceBox/FaceBox'
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLink from './components/ImageLink/ImageLink';
import Particles from 'react-particles-js';
import 'tachyons';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '9b6e35fb551b40a69711278c2ddf6e10'
});



class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,    
    user: {
      id: '',
      name: '',
      email: '',
      entries:0,
      joined:''
    }
    }
  }


  loadUser = (data) => {
    this.setState({user : {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
  }
    )
  }

  calculateFaceLocation = (data) => {
    const Face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('faceImage');
    const height = Number(image.height);
    const width = Number(image.width);

    return {
      leftCol: Face.left_col * width,
      rightCol: width - (Face.right_col * width),
      topRow: Face.top_row * height,
      bottomRow: height - (Face.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInput = (event) => {
    console.log(this.state.input);
    this.setState({ input: event.target.value });
  }

  onButton = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((res) => {
        this.displayFaceBox(this.calculateFaceLocation(res))
      }
      )
      .catch(err => {
        console.log(err);
      })
  }

  onRoute = (route) => {
    this.setState({ route: route })
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
   
  }

  render() {
    const{isSignedIn, box, route, imageUrl}=this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={{
            particles: {
              number: 700,
              density: {
                enable: true,
                value_area: 800
              }
            }
          }}
        />

        <Navigation onRoute={this.onRoute} isSignedIn={isSignedIn} />

        {
          route === 'home' ? <div>
            <Logo />
            <Rank />
            <ImageLink onInputChange={this.onInput} onButtonChange={this.onButton} />
            <FaceBox imageUrl={imageUrl} box={box} />
          </div> :
            (route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRoute={this.onRoute} />
              : <Register loadUser={this.loadUser} onRoute={this.onRoute} />
            )

        }
      </div>
    );
  }
}

export default App;
