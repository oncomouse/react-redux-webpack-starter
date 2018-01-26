const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const {JSDOM} = require('jsdom');

// Configure Enzyme for React 16:
Enzyme.configure({ adapter: new Adapter() });

// Configure JSDOM:
function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = {
	userAgent: 'node.js'
};
copyProps(window, global);