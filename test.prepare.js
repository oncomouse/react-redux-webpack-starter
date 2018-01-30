const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
require('jsdom-global')()

// Configure Enzyme for React 16:
Enzyme.configure({ adapter: new Adapter() });