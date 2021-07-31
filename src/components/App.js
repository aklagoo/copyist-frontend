import React from 'react';
import "../css/App.css";
import Cookies from 'universal-cookie';
import Toolbar from './Toolbar';
import QRBox from './QRBox';
import TextBox from './TextBox';
import banner from '../img/banner.svg';

/**
 * @classdesc Top-level component managing socket communication and storage.
 * @extends React.Component
 */
class App extends React.Component {
  /**
   * Initializes state, cookie manager and socket connection.
   */
  constructor() {
    super();
    /**
     * @property {Object} state The internal state of the app.
     * @property {string} state.message='' The latest message received from the server.
     * @property {string} state.roomID='' The roomID for the active room.
     * @property {boolean} state.gotConnectionError A flag indicating a connection error.
     */
    this.state = {
        message: '',
        roomID: '',
        gotConnectionError: false
    };

    /**
     * @property {Object} cookies A cookie manager object of {@link 'https://www.npmjs.com/package/universal-cookie' 'universal-cookie'}.
     */
    this.cookies = new Cookies();

    /**
     * @property {Object} io=null A socket.io client object.
     */
    this.io = null;
  }

  /**
   * Setter for cookie 'roomID'.
   * @param {string} roomID The ID of connected socket room.
   */
  setRoomID(roomID) { this.cookies.set('roomID', roomID); }

  /**
   * Getter for cookie 'roomID'.
   * @returns {string}
   */
  getRoomID() { return this.cookies.get('roomID'); }

  /**
   * Setter for ```this.state.message```.
   * @param {string} message A message received from the server.
   */
  setMessage(message) {
    this.setState({ message: message });
  }
  
  connect(url=process.env.SERVER_URL) {
    return;
  }

  render() {
    return (
      <div className="App">
        <Toolbar />
        <main>
          <article>
            <img className="Banner" src={banner} width={600} alt="" />
            <TextBox />
          </article>
          <QRBox />
        </main>
      </div>
    );
  }
}

export default App;
