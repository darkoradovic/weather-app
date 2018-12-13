import React, { Component } from "react";

import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "baa188ec83f89bf8f7c82e429dbef294";

class App extends Component {
  state = {
    temperature: null,
    city: null,
    country: null,
    humidity: null,
    description: null,
    error: undefined,
    cod: undefined,
    message: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log(data);

    if (city && country && data.cod !== '404' && data.message !== 'city not found') {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
        cod: "",
        message: ""
      });
    } else {
      this.setState({
        temperature: null,
        city: null,
        country: null,
        humidity: null,
        description: null,
        error: "Please enter valid values.",
        cod: '404',
        message: 'City not found'
      });
    } 

    


  }


  render() {
  
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="title-container">
              <Title />
            </div>
            <div className="form-container">
              <Form getWeather={this.getWeather} />
              <Weather
                temperature={this.state.temperature}
                humidity={this.state.humidity}
                city={this.state.city}
                country={this.state.country}
                description={this.state.description}
                error={this.state.error}
                cod={this.state.cod}
                message={this.state.message}
              />
              
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
