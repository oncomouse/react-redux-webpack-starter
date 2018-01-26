var prepare = require('mocha-prepare');
var Enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

prepare(function (done) {
    // called before loading of test cases
    Enzyme.configure({ adapter: new Adapter() });
	console.log('Prepared')
	done();
}, function (done) {
    // called after all test completes (regardless of errors)

});