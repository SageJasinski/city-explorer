import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import './App.css';
import Modal from 'react-bootstrap/Modal';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      location: {},
      search: '',
      pic: '',
      anError: false,
      message: '',
      Show: true,
    }
  }

  async searchLocation(){
    try{
    //API http we want to grab based on input
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_Location_IQ}&q=${this.state.search}&format=json`;

    let que = await axios.get(API);
    this.setState({location:que.data[0]});

    const IMG = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_Location_IQ}&center=${que.data[0].lat},${que.data[0].lon}&zoom=13`;
    //use the GET command with axios inorder to grab the HTTP link. also sets this to que rather than to stack
    
    let pic = await axios.get(IMG);
    this.setState({pic: IMG});
    // console.log(que.data[0])
    } catch(error){
      this.setState({error: true});
      this.setState({message: error.message})
    }
  };

  handleShow = () => this.setState({Show: true});
  handleHide = () => this.setState({Show: false});

  render() {
    return(
      //use a bootstrap form

      <>
        <Form>
          <Form.Group className="input">
            <Form.Control type="Search" onChange={ (event) => this.setState({search:event.target.value})} placeholder='Type a City'>
            </Form.Control>

            <button onClick={ event =>{
              event.preventDefault();
              this.searchLocation();
            }
              }>Explore</button>

          </Form.Group>
        </Form>

        <h2 className="mainHead">{this.state.location.display_name}</h2>
        
        <Card>
          <Card.Body>
            <Card.Img src={this.state.pic} alt={this.state.location.display_name} className="map">
            </Card.Img>
            <Card.Text>
            <p className="lat">Lat: {this.state.location.lat}</p>
            <p className="lon">Lon: {this.state.location.lon}</p>
            </Card.Text>
          </Card.Body>
        </Card>

        {this.state.error &&
        <Modal show={this.state.Show}>
          <Modal.Dialog>
            <Modal.Header closeButton onClick={this.handleHide}>
              <Modal.Title>You seem to be lost</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.message}
            </Modal.Body>
        </Modal.Dialog>
        </Modal>
        }
      </>


    );
  }
}
export default App;
