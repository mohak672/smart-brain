import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';


const initialState = { //we are creating this to set all the state to initial state,
  //after one logged out his account
    input:'',
    imageUrl: '',
    box: {},
    route:'signin',//starting route is signin so that is our starting page is signin form
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  }

const particles={
                   particles: {
                    number: {
                      value: 150, //in javascript object integer is assigned as it is but string is assigned is single ''
                      density: {
                      enable: true,
                      area:800
                        }
                    
                      }
                  }
              }

class App extends Component {

constructor(){
  super()
  this.state= initialState;
}


faceDetectionBox = (data) =>{
  //console.log(data);
  const boundingBox= data.outputs[0].data.regions[0].region_info.bounding_box;
  const imageId=document.getElementById('imgBox');
  const width= Number(imageId.width);
  const height= Number(imageId.height);
  return {
    leftCol: boundingBox.left_col * width,
    topRow: boundingBox.top_row * height,
    rightCol: width - (boundingBox.right_col * width),
    bottomRow: height - (boundingBox.bottom_row * height)
  }

}

displayBox = (box) => {
  //console.log(box);
  this.setState({
      box: box
    });

}

onInputChange = (event) =>{
  
    this.setState({
        input: event.target.value
    }); 
}

onRouteChange = (route) => {

  if(route==='home'){
      this.setState({
          isSignedIn: true
      });
  }else{
      this.setState(initialState); //if one logged out then all states are set to initial state
  }

  this.setState({
      route:route
  });

}

onLoadUser = (user) => {
  this.setState({
    user:{
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined  
    }

  })
}


onButtonSubmit = () => {

    this.setState({
      imageUrl: this.state.input

    }); 

    fetch('https://quiet-cove-86364.herokuapp.com/imageApiRequest',{ //we dont have to add the git related heroku link,
      //bcoz it is the location of the our app on github,that will not work
      //we have to use this link that heroku open command will give us(without the git part)
       //for our localhost use 'http://localhost:3000/'
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              imageURL: this.state.input //here we have to use this.state.input not imgUrl(state), 
              //bcoz of how setState works in react
              //imageURL is name of property that we are sending to server
              //imageUrl is state of this front end 
            })
      })
     .then(response => response.json()) //here response is from server side,
     //that we are passing to the displayBox to show the image detection
     .then(response =>{
        this.displayBox(this.faceDetectionBox(response));

           fetch('https://quiet-cove-86364.herokuapp.com/image',{   //we dont have to add the git related heroku link,
      //bcoz it is the location of the our app on github,that will not work
      //we have to use this link that heroku open command will give us(without the git part)
       //for our localhost use 'http://localhost:3000/'
            method: 'put',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
           })
           .then(response => response.json()) //this .then should be of fetch function not the app.models.predict
           .then(count =>{
              this.setState(Object.assign(this.state.user,{entries: count})); //this we have to do it,
              //otherwise it will throw an error of UNDEFINED OBJECT in browser,
              //the reason is in udemy video
            })
            .catch(error=> console.log(error,"Error from fetch function side"));  
     })
     .catch(err => console.log(err));

}

  render(){

    const { isSignedIn, imageUrl, box,route} =this.state;

    return (
        <div className="App">
            <Particles className='particles' params={particles} />
            <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} /> 

            { route==='home' ? //this is javascript statement that is why we enclosed in a {} bracket
                <div> 
                  <Logo />
                  <Rank name={this.state.user.name} entries={this.state.user.entries} />
                  <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onButtonSubmit}/>
                  <FaceRecognition box={box} imgUrl={imageUrl} />
                </div> : //this is another ternery expression that is why we have to write it in a () angular brcket
                        (route==='signin' ? <SignIn onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange} />
                            : <Register onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange}/> ) 
                        //this is another ternery expression that is why we have to write it in a () angular brcket
            //this is javascript statement that is why we enclosed in a {} bracket
            }
                  
                
            
          
        </div>
  );
}

}

//for state variable, we use this.state.variableName
//for our own mode, function we use this.functionName
export default App;
