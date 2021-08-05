import App from '../components/App';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Cookies from 'universal-cookie';

configure({ adapter: new Adapter() });

describe('App Ops', () => {
  /* Declare basic constants */
  const sampleCookieRoomID = '1234567890';
  const sampleURLRoomID = 'abcdef1234';
  const sampleMessage = 'Hello world!';
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();
  const cookies = new Cookies();

  /* Simulate cookies */
  Object.defineProperty(document, 'cookie', {
    writable: true,
    value: 'roomID=',
  });

  /* Simulate window.location */
  delete window.location;
  window.location = new URL('http://localhost:3000/abcdef1234');

  /* Tests */
  it('should initialize correctly [constructor]', () => {
    expect(instance.state.message).toBe('');
    expect(instance.state.roomID).toBe('');
  });

  it('should return \'\' if roomID is not set in cookies [getRoomID]', () => {
    cookies.remove('roomID');
    expect(instance.getRoomID()).toBe('');
  });

  it('should read the room ID from cookies [getRoomID]', () => {
    cookies.set('roomID', sampleCookieRoomID);
    const roomID = instance.getRoomID(sampleCookieRoomID);
    expect(roomID).toBe(sampleCookieRoomID);
  });

  it('should load roomID from the URL [getRoomID]', () => {
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