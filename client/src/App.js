import React, { Component } from 'react';
import logo from './onepunchman.jpg'
import './App.css';

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      source : "http://localhost:8080/videos/1"
    }
    this.posters = []
    for(let i=0;i < 12; i++) {
      this.posters.push( <img key={i} src={logo} className="img-thumbnail col-md-4" onClick={(e) => this.handleClick(e, i+1)}/>)
    }
  }

  handleClick(e, i) {
    console.log(i)
    this.setState({
      source : "http://localhost:8080/videos/"+i
    })
  }
 
  render() {
    console.log(this.state.source)
    return (
      <div>
        <div className="jumbotron">
          <h1>Playing season 1 episode: {this.state.source[this.state.source.length-1]}</h1>
        </div>
        <div className="jumbotron">
          <video src={this.state.source} controls autoPlay autoFocus>
          </video>
        </div>
        <div className="wells">
          <h3 style={{textAlign:"center"}}>choose episode</h3>
        </div>
        <div className="container">
          {this.posters}
        </div>
      </div>
    );
  }
}

export default App;
