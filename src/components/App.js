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
      hiddenClass: ' Hidden',
    };
    this.socket = null;
    this.emitMessage = this.emitMessage.bind(this);
    this.toggleHiddenClass = this.toggleHiddenClass.bind(this);
  }

  toggleHiddenClass() {
    if(this.state.hiddenClass === ' Hidden') 
      this.setState({hiddenClass: ''});
    else
      this.setState({hiddenClass: ' Hidden'});
  }

  setRoomID(roomID) {
    this.setState({roomID: roomID});
    window.history.pushState({}, document.title, conf.SELF_URL + '/#/' + roomID);

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
    /* Get roomID from URL*/
    const roomIDParts = window.location.toString().split('/#/');
    let roomIDURL = "";
    if (roomIDParts.length === 2){
      roomIDURL = roomIDParts[1];
    }
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

  setMessage(message) { this.setState({ message: message }); }
  
  connect(url, roomID) {
    const socket = io(url, {
      query: { 'roomID': roomID }
    });

    socket.on('connected', (data) => {
      this.setRoomID(data.roomID);
      this.setMessage(data.message);
    });

    socket.on('update', (data) => {
      this.setMessage(data);
    });

    return socket;
  }

  emitMessage(event) {
    this.setState({message: event.target.value});
    this.socket.emit('update', event.target.value);
  }

  render() {
    return (
      <div className="App">
      <Toolbar hiddenClass={this.state.hiddenClass} toggleHiddenClass={this.toggleHiddenClass}/>
      <main>
        <QRBox message={this.state.roomID} url={window.location.href} hiddenClass={this.state.hiddenClass}/>
        <article>
        <img className="Banner" src={banner} width={600} alt="" />
        <TextBox emitMessage={this.emitMessage} message={this.state.message}/>
        </article>
      </main>
      </div>
    );
  }

  componentDidMount() {
  this.socket = this.connect(conf.SERVER_URL, this.getRoomID());
  }
}

export default App;
