import { render, screen } from '@testing-library/react';
import App from '../components/App';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {useCookies} from 'react-cookie';

configure({ adapter: new Adapter() });

describe('App', () => {
    const sampleUUID = '1234567890';
    const sampleUUIDMatch = /0000000000/;
    const sampleMessage = 'Hello world!';
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    
    /* Simulate cookies */
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'uuid=0000000000',
    });

    it('should initialize an empty message', () => {
        expect(instance.state.message).toBe("");
    });

    it('should store the UUID in cookies', () => {
        instance.setUUID(sampleUUID);
        expect(document.cookie).toContain(sampleUUIDMatch);
    });

    it('should read UUID from cookies', () => {
        document.cookie = 'uuid='+sampleUUIDMatch;
        const uuid = instance.getUUID(sampleUUID);
        expect(uuid).toBe(sampleUUID);
    });

    it('should set a message in it\'s state', () => {
        instance.setMessage(sampleMessage);
        expect(app.state.message).toBe(sampleMessage);
    });
});
