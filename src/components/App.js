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
        roomID: ''
    };
    this.cookies = new Cookies();
  }

  setRoomID(roomID) { this.cookies.set('roomID', roomID); }
  getRoomID() { return this.cookies.get('roomID'); }

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
