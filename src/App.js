import React from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import './App.css'

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      location: {},
      search: '',
      pic: ''
    }
  }

  async searchLocation(){
    //API http we want to grab based on input
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_Location_IQ}&q=${this.state.search}&format=json`;

    let que = await axios.get(API);
    this.setState({location:que.data[0]});

    const IMG = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_Location_IQ}&center=${que.data[0].lat},${que.data[0].lon}&zoom=13`;
    //use the GET command with axios inorder to grab the HTTP link. also sets this to que rather than to stack
    
    let pic = await axios.get(IMG);
    this.setState({pic: IMG});
    // console.log(que.data[0])
  }

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
            <img src={this.state.pic} alt={this.state.location.display_name} className="map">
            </img>
            <Card.Text>
            <p className="lat">Lat: {this.state.location.lat}</p>
            <p className="lon">Lon: {this.state.location.lon}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </>


    );
  }
}
export default App;
