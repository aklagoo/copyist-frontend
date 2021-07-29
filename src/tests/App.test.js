import App from '../components/App';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Cookies from 'universal-cookie';

configure({ adapter: new Adapter() });

describe('App', () => {
    /* Declare basic constants */
    const sampleUUID = '1234567890';
    const sampleUUIDMatch = /0000000000/;
    const sampleMessage = 'Hello world!';
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const cookies = new Cookies();
    
    /* Simulate cookies */
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'uuid=0000000000',
    });

    /* Tests */
    it('should initialize an empty message', () => {
        expect(instance.state.message).toBe("");
    });

    it('should store the UUID in cookies', () => {
        instance.setUUID(sampleUUID);
        expect(cookies.get('uuid')).toBe(sampleUUID);
    });

    it('should read UUID from cookies', () => {
        cookies.set('uuid', sampleUUID);
        const uuid = instance.getUUID(sampleUUID);
        expect(uuid).toBe(sampleUUID);
    });

    it('should set a message in it\'s state', () => {
        instance.setMessage(sampleMessage);
        expect(instance.state.message).toBe(sampleMessage);
    });
});
