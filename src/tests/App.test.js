import App from '../components/App';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Cookies from 'universal-cookie';
import conf from '../conf.json';

configure({ adapter: new Adapter() });

function setRoomIDURL(roomID) {
  delete window.location;
  window.location = new URL(conf.SELF_URL + '/' + roomID);
}

describe('App Ops', () => {
  /* Simulate cookies */
  Object.defineProperty(document, 'cookie', {
    writable: true,
    value: '',
  });
  
  /* Declare basic constants */
  const sampleCookieRoomID = '1234567890';
  const sampleURLRoomID = 'abcdef1234';
  const sampleMessage = 'Hello world!';
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();
  const cookies = new Cookies();

  /* Tests */
  it('should initialize correctly [constructor]', () => {
    expect(instance.state.message).toBe('');
    expect(instance.state.roomID).toBe('');
  });

  it('should return \'\' if roomID is not set in cookies and URL [getRoomID]', () => {
    /* Set roomID */
    setRoomIDURL('');
    cookies.remove('roomID');

    expect(instance.getRoomID()).toBe('');
  });

  it('should return the room ID from cookies if URL is empty [getRoomID]', () => {
    /* Set roomID */
    setRoomIDURL('');
    cookies.set('roomID', sampleCookieRoomID);
    
    expect(instance.getRoomID()).toBe(sampleCookieRoomID);
  });

  it('should return the room ID from the URL if the cookie is empty [getRoomID]', () => {
    /* Set roomID */
    setRoomIDURL(sampleURLRoomID);
    cookies.remove('roomID');
    
    expect(instance.getRoomID()).toBe(sampleURLRoomID);
  });

  it('should return roomID from the URL over cookies [getRoomID]', () => {
    setRoomIDURL(sampleURLRoomID);
    cookies.set('roomID', sampleCookieRoomID);

    expect(instance.getRoomID()).toBe(sampleURLRoomID);
  });

  it('should store the room ID in cookies [setRoomID]', () => {
    instance.setRoomID(sampleCookieRoomID);
    expect(cookies.get('roomID')).toBe(sampleCookieRoomID);
  });

  it('should set a message in it\'s state [setMessage]', () => {
    instance.setMessage(sampleMessage);
    expect(instance.state.message).toBe(sampleMessage);
  });
});