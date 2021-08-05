import React from 'react';
import "../css/App.css";
import Cookies from 'universal-cookie';
import { io } from 'socket.io-client';
import Toolbar from './Toolbar';
import QRBox from './QRBox';
import TextBox from './TextBox';
import banner from '../img/banner.svg';
import conf from '../conf.json'


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

  setRoomID(roomID) { this.cookies.set('roomID', roomID);}
  getRoomID() { return this.cookies.get('roomID'); }

  setMessage(message) { this.setState({ message: message }); }
  
  connect(url, roomID) {
  const socket = io(url, {
    query: { 'roomID': roomID }
  });

  socket.on('roomID', (roomID) => {
    this.setRoomID(roomID);
    this.setState({roomID: roomID});
  });

  return socket;
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

  componentDidMount() {
  this.socket = this.connect(conf.SERVER_URL, this.getRoomID());
  setTimeout(() => { console.log(this.socket); }, 3000);
  }
}

export default App;
