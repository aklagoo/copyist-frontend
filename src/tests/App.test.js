import App from '../components/App';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Cookies from 'universal-cookie';
import { Server } from 'socket.io';
import { createServer } from 'http';

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

describe('App Communication', () => {
    /* Testing flags */
    let hasConnected = false;
    let hasSentMessage = false;
    let isCorrectConnectQuery = false;
    let isCorrectMessage = false;
    const cookies = new Cookies();

    /* Simulate cookies */
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'roomID=0000000000',
    });

    /* Create server */
    const httpServer = createServer();
    const sampleRoomID = '1111111111';
    const sampleMessage = 'Hello world!';
    const io = new Server(httpServer);

    /* Server methods */
    httpServer.listen('4000', () => {
        /* Upon connecting, check if roomID matches sample roomID */
        io.on('connect', (socket) => {
            hasConnected = true;

            const query = socket.handshake.query;
            if ('roomID' in query) {
                if (typeof query['roomID'] === 'string' || query['roomID'] instanceof String) {
                    isCorrectConnectQuery = true;
                }
            }
            
            socket.emit('roomID', sampleRoomID);

            socket.emit('message', sampleMessage);

            socket.on('message', (message) => {
                hasSentMessage = true;
                if (typeof message === 'string' || message instanceof String) {
                    isCorrectMessage = true;
                }
            });
        });
    });

    const wrapper = shallow(<App />);
    const instance = wrapper.instance();

    /* Run tests */
    it('should connect to the server', () => {
        instance.connect('http://localhost:4000');
        expect(hasConnected).toBe(true);
    });

    it('should detect a connection error', () => {
        instance.connect('http://localhost:8000');
        expect(instance.state.gotConnectionError).toBe(true);
    });

    it('should send a connection query with a string roomID', () => {
        expect(isCorrectConnectQuery).toBe(true);
    });

    it('should update state.roomID correctly', () => {
        expect(instance.state.roomID).toBe(sampleRoomID);
    });

    it('should update the roomID in cookies correctly', () => {
        expect(cookies.get('roomID')).toBe(sampleRoomID);
    });

    it('should update state.message correctly', () => {
        expect(instance.state.message).toBe(sampleMessage);
    });

    it('should send messages', () => {
        expect(hasSentMessage).toBe(true);
    });
    
    it('should send a string message', () => {
        expect(isCorrectMessage).toBe(true);
    });

    /* Close server */
    io.close();
    httpServer.close();
});