import React from "react";
import  Card from "react-bootstrap/Card";

class Content extends React.Component{

render(){
    return(

        <Card>
                <Card.Body>
                    <Card.Img src={this.props.pic} alt={this.props.display_name} className="map">
                    </Card.Img>

                    <Card.Text className="lat">
                        Lat: {this.props.lat}
                    </Card.Text>

                    <Card.Text className="lon">
                        Lon: {this.props.lon}
                    </Card.Text>

                    {this.props.weather.length > 0 && <Card.Text className="lat"> The low for today is: {this.props.weather[0].low_temp}</Card.Text>}

                    {this.props.weather.length > 0 && <Card.Text className="lat"> The high for today is: {this.props.weather[0].high_temp}</Card.Text>}

                    {this.props.weather.length > 0 && <Card.Text className="lat">    with {this.props.weather[0].description}</Card.Text>}
                </Card.Body>
        </Card>
        );
    }
}
export default Content;