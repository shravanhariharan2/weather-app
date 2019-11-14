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
    let tempDisplay = "";
    if (this.state.hasSearched) {
      tempDisplay = "Temperature";
    } else {
      tempDisplay = "";
    }

    return (
      <Container className="container">
        <h1>Weather Tracker</h1>
        <Form className="location-bar" onSubmit={this.onSubmit}>
          <FormGroup>
            <Label>Location</Label>
            <Input value={this.state.location} name="location" onChange={this.onChangeLocation} placeholder="Ex. London, Los Angeles, Seattle"></Input>
          </FormGroup>
          <Button type="submit" color="success">Find</Button>
        </Form>
        <h2>{tempDisplay}</h2>
        <h2>{this.state.temp}</h2>
      </Container>
    );
  }
}

export default LocationBar;
