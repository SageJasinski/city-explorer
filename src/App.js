import React from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      location: {},
      search: '',
    }
  }

  async searchLocation(){
    //API http we want to grab based on input
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_Location_IQ}&q=${this.state.search}&format=json`;

    //use the GET command with axios inorder to grab the HTTP link. also sets this to que rather than to stack
    let que = await axios.get(API);

    this.setState({location:que.data[0]});

    console.log(que.data[0])
  }

  render() {
    return(
      //use a bootstrap form

      <>
        <Form>
          <Form.Group>

            <Form.Label>Type in a city</Form.Label>
            <Form.Control type="Search" onChange={ (event) => this.setState({search:event.target.value})}>
            </Form.Control>

            <button onClick={ event =>{
              event.preventDefault();
              return this.searchLocation();
            }
              }>Explore</button>

          </Form.Group>
        </Form>

        <h2>{this.state.location.display_name}</h2>
        <p>Lat: {this.state.location.lat}</p>
        <p>Long: {this.state.location.lon}</p>
      </>


    );
  }
}
export default App;
