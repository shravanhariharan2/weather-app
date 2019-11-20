import React, { Component } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "../css/LocationBar.css"

class LocationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      temp: "",
      hasSearched: false
    };
  }

  onChangeLocation = (e) => {

    e.preventDefault();

    this.setState({
      location: e.target.value,
      temp: this.state.temp,
      hasSearched: this.state.hasSearched
    });
  }

  onSubmit = (e) => {

    e.preventDefault();
    console.log("hey");

    const cityReq = {
      city: this.state.location
    }

    axios.post("http://localhost:5000/weather/", cityReq)
      .then(res => this.setState({
        location: this.state.location,
        temp: res.data,
        hasSearched: true
      }))
      .catch(err => console.log(err));

  }


  render() {

    let currTempC = Math.round(parseFloat(this.state.temp) - 273.15);
    let currTempF = Math.round(((9.0 / 5) * currTempC) + 32);

    let tempDisplay = "";
    let cDisp = "";
    let fDisp = "";
    if (this.state.hasSearched) {
      tempDisplay = "Current Temperature";
      cDisp = currTempC + "\u00b0C";
      fDisp = currTempF + "\u00b0F";
    } else {
    }

    return (
      <Container className="container">
        <h1>Weather Tracker</h1>
        <Form className="location-bar" onSubmit={this.onSubmit}>
          <FormGroup>
            <Label>City</Label>
            <Input value={this.state.location} name="location" onChange={this.onChangeLocation} placeholder="Ex. London, Los Angeles, Seattle"></Input>
          </FormGroup>
          <Button type="submit" className="submit-btn">Find</Button>
        </Form>
        <h2>{tempDisplay}</h2>
        <h4>{cDisp}</h4>
        <h4>{fDisp}</h4>
      </Container>
    );
  }
}

export default LocationBar;
