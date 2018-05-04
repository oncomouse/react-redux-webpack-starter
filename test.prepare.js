const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
require('jsdom-global')()

chai.use(chaiAsPromised);

// Configure Enzyme for React 16:
Enzyme.configure({ adapter: new Adapter() });