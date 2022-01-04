import React from 'react';
import "../css/App.css";
import Cookies from 'universal-cookie';
import { io } from 'socket.io-client';
import Toolbar from './Toolbar';
import QRBox from './QRBox';
import TextBox from './TextBox';
import banner from '../img/banner.svg';
import conf from '../conf.json';


class App extends React.Component {
  constructor() {
  super();
    this.cookies = new Cookies();
    this.state = {
      message: '',
      roomID: this.getRoomID(),
    };
    this.socket = null;
  }

  setRoomID(roomID) {
    this.setState({roomID: roomID});
    window.history.pushState({}, document.title, '/' + roomID);

    // Set cookies
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    this.cookies.set('roomID', roomID, {
      sameSite: 'none',
      secure: true,
      maxAge: date.getTime(),
    });
  }
  getRoomID() {
    /* Get roomID */
    let roomIDURL = window.location.pathname.substring(1);
    let roomIDCookie = this.cookies.get('roomID');

    /* Return with precedence */
    if(roomIDURL !== '') {
      return roomIDURL;
    } else if (typeof(roomIDCookie) != 'undefined') {
      return roomIDCookie;
    } else {
      return '';
    }
  }
  getURLRoomID() { return window.location.pathname.substring(1); }

  setMessage(message) { this.setState({ message: message }); }
  
  connect(url, roomID) {
    const socket = io(url, {
      query: { 'roomID': roomID }
    });

    socket.on('connected', (data) => {
      this.setRoomID(data.roomID);
      this.setMessage(data.message);
    });

    return socket;
  }

  render() {
    return (
      <div className="App">
      <Toolbar />
      <main>
        <QRBox message={this.state.roomID}/>
        <article>
        <img className="Banner" src={banner} width={600} alt="" />
        <TextBox />
        </article>
      </main>
      </div>
    );
  }

  componentDidMount() {
  this.socket = this.connect(conf.SERVER_URL, this.getRoomID());
  setTimeout(() => { console.log(this.socket); }, 3000);
  }
}

export default App;
