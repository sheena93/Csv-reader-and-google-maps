import React, { Component } from 'react';
import FileUpload from './FileUpload';
import SimpleMap from './Map.js';
class App extends Component {

  constructor(props){
    super(props);
    this.state={
      'location':{lat: 59.95, lng: 30.33},
    };
    this.updateLocation = this.updateLocation.bind(this);
  }

  updateLocation(location){
    this.setState({
      'location':location
    });
  }

  render() {
    console.log(JSON.stringify(this.state));
    return (
      <div className="App">
      <FileUpload updateLocation={this.updateLocation} appComponent={this}/>
      <div style={{width: '100%', height: '400px'}}>
        <SimpleMap
          center= {this.state.location}
          zoom={11}/>
      </div>,
      </div>
    );
  }
}

export default App;
