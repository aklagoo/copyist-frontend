import React from "react";
import "../css/App.css";
import Cookies from 'universal-cookie';

/**
 * @classdesc This component manages socket communication and data storage.
 * @extends React.Component
 */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
        message: '',
        uuid: ''
    };
    this.cookies = new Cookies();
  }

  setUUID(uuid) { this.cookies.set('uuid', uuid); }
  getUUID() { return this.cookies.get('uuid'); }

  setMessage(message) {
    this.setState({ message: message });
  }

  render() {
    return (
      <div className="App">
        <p>Hello</p>
      </div>
    );
  }
}

export default App;
