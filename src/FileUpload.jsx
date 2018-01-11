import React, { Component } from 'react';
import axios from 'axios';

class FileUpload extends Component {
  constructor(props){
    super(props);
    this.readFile = this.readFile.bind(this);
    this.uploadSuccees=false;
    this.csvFileContent='';
    this.Content='';
    this.printFile = this.printFile.bind(this);
    this.geocoding=this.geocoding.bind(this);
    // this.convertCsv=this.convertCsv.bind(this);
  }

  geocoding(data){
    var updateLocation = this.props.updateLocation;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+data+'&key=AIzaSyAkPSWlS5iF-vfE6duxwSSB6hK1UZ1pJXw')
      .then(function (response) {
        console.log(response);
        // location
        let location = response.data.results[0].geometry.location;
        // this.props.mymap(location.lat,location.lng);
        console.log(location);
        updateLocation(location);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  readFile (evt,thisComponent) {
     // var csvFileContent='';
     var files = evt.target.files;
     var file = files[0];
     var reader = new FileReader();
     reader.onload = function(event) {
       console.log(event.target.result);

      }
      reader.readAsText(file);
      reader.onloadend = function(event){
        thisComponent.uploadSuccees=true;
        thisComponent.Content=event.target.result
        thisComponent.csvFileContent=thisComponent.Content.split('\n');
        console.log(typeof thisComponent.csvFileContent," dkd ",thisComponent.csvFileContent);
        // thisComponent.printFile();
        thisComponent.geocoding(thisComponent.csvFileContent[0]);

      };
  }

  printFile()
  {
    if(this.uploadSuccees){
      console.log("sdkd"+this.csvFileContent);
    }
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
          <tr>
              <td>
              <h4>Upload File</h4>
              </td>
              <td>
              <input type='file' accept='file/csv' name="file"  onChange={ (event)=>{this.readFile(event,this);} }/>
              {/* <input type='button' value="ok" onClick={()=>{this.convertCsv(this.csvFileContent);}}/> */}
              </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default FileUpload;
