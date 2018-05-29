import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';

describe('<App/>', () => {
    let store;
    let wrapper;
    let mockStore;
    before(() => {
        mockStore = configureStore([thunk]);
    });
    beforeEach(() => {
        store = mockStore({
            Samples: {}
        });
        sinon.spy(App.prototype, 'componentDidMount');
        wrapper = mount(
            <Provider store={store}><App /></Provider>
        );
    });
    afterEach(() => {
        App.prototype.componentDidMount.restore();
    })
    it('should render without crashing', () => {
        expect(App.prototype.componentDidMount).to.be.calledOnce;
    });
});