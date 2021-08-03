import App from '../components/App';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import axios from 'axios';
import http from 'http';

jest.setTimeout(30000);
configure({ adapter: new Adapter() });

describe('App Communication', () => {
	const wrapper = shallow(<App />);
});