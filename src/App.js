import React from 'react';
import ImageBtn from './imageButton.js';
import axios from 'axios';
import './App.css';

class App extends React.Component {

  state = {
    imageName : "",
    selectedFile : null,
    data : null,
    displayImage : null,
    displayImageName : null
  }

  getAllimages = () => {
    axios.get('http://localhost:5000/getAllImages')
      .then(res => {
        console.log(res)
        this.setState({
          data : res.data
        })
      })
  }

  componentDidMount(){
    this.getAllimages();
  }

  inputNewName = (e) => {
    this.setState({
      imageName: e.target.value
    })
    console.log(this.state.imageName, this.state.selectedFile)
  }

  chooseImageButton = (imageName,baseString) => {
    console.log(this.state.displayImageName);

      this.setState({
        displayImage : baseString,
        displayImageName : imageName
      })

  }

  selectFileHandler = (e) => {
      this.setState({
        selectedFile : e.target.files[0]
      });
  }

  uploadFileHandler = (e) => {
    // e.preventDefault();
    console.log("hello");
    const fd = new FormData();
    fd.append('image',this.state.selectedFile)
    fd.append('name',this.state.imageName)
    axios.post('http://localhost:5000/uploadingImage',fd)
      .then(res  => {
        console.log(res);
        this.getAllimages();
      })

  }



  render(){
    return (
      <div className="container m-2 mb-5 p-2">
        <div className="row  justify-content-center">
            <div className="row form-inline">
            <h2 className="card-title mr-xl-5 ml-xl-5 text-white">Img-base64</h2>
               <input type="text" className="form-control mb-2 ml-xl-5 mr-sm-2" id="imageName" placeholder="Enter Name of File" onChange={this.inputNewName}/>
               <input type="file" className="form-control mb-2 ml-xl-2 mr-sm-2" id="imagefile" onChange={this.selectFileHandler} />
               <button type="button"
                className="btn btn-outline-light mb-2 ml-xl-2 mr-sm-2"
                onClick={this.uploadFileHandler}>Upload</button>
            </div>
          </div>
          <div className="row m-5 justify-content-center h-100">
            <div className="col col-xl-4">
              {this.state.data !== null && this.state.data.map( item =>
                <ImageBtn  key={item._id} chooseImageButton={this.chooseImageButton} imageName={item.name} baseString={item.imagebase64}/>
              )}
            </div>
            <div className="col col-xl-8">
              <div className="card w-100 h-100 p-3">
                {this.state.displayImage !== null && <div>
                  <img width={600} height={350} mode='fit' className="card-img-top" src={`data:image/jpeg;base64,${this.state.displayImage}`} alt="Image Holder"/>
                  <h5 className="card-title">{this.state.displayImageName}</h5>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

    )
  }

}

export default App;
