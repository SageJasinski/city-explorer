import React from "react";
import axios from "axios";

class Forecast extends React.Component{

    async wether() {

        const seatWether = await axios.get('https://localhost:3001/seattle');
        this.props.Seattle = seatWether.data;

    }
};

export default Forecast;