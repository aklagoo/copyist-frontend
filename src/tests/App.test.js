import App from '../components/App';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Cookies from 'universal-cookie';

configure({ adapter: new Adapter() });

describe('App Ops', () => {
    /* Declare basic constants */
    const sampleRoomID = '1234567890';
    const sampleMessage = 'Hello world!';
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const cookies = new Cookies();
    
    /* Simulate cookies */
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'roomID=',
    });

    /* Tests */
    it('should initialize correctly', () => {
        expect(instance.state.message).toBe('');
        expect(instance.state.roomID).toBe('');
        expect(instance.state.gotConnectionError).toBe(false);
    });

    it('should return \'\' if roomID is not set in cookies', () => {
        cookies.remove('roomID');
        expect(instance.getRoomID()).toBe('');
    });

    it('should store the room ID in cookies', () => {
        instance.setRoomID(sampleRoomID);
        expect(cookies.get('roomID')).toBe(sampleRoomID);
    });

    it('should read the room ID from cookies', () => {
        cookies.set('roomID', sampleRoomID);
        const roomID = instance.getRoomID(sampleRoomID);
        expect(roomID).toBe(sampleRoomID);
    });

    it('should set a message in it\'s state', () => {
        instance.setMessage(sampleMessage);
        expect(instance.state.message).toBe(sampleMessage);
    });
});