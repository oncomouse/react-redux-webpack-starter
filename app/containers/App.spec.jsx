import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './App';
import { sampleAction, resetAction } from '../ducks/Samples';

describe('<App/>', () => {
    let store
        , wrapper
        , mockStore;
    before(() => {
        mockStore = configureStore([thunk]);
        sinon.spy(App.prototype, 'componentDidMount');
        fetchMock.get('*', { hello: 'world' });
    });
    beforeEach(() => {
        store = mockStore({
            Samples: {}
        });
        wrapper = mount(
            <App
                store={store}
                actions={{ resetAction, sampleAction }}
            />
        );
    });
    after(() => {
        App.prototype.componentDidMount.restore();
        fetchMock.reset();
        fetchMock.restore();
    });
    it('should render without crashing', () => {
        expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
    });
    it('should trigger a sampleAction when first button clicked', async () => {
        const expectedPayload = await sampleAction()(store.dispatch, store.getState);
        wrapper.find('button').first().simulate('click');
        expect(store.getActions()).to.deep.equal([expectedPayload]);
    });
    it('should trigger a resetAction when last button clicked', () => {
        const expectedPayload = resetAction();
        wrapper.find('button').last().simulate('click');
        expect(store.getActions()).to.deep.equal([expectedPayload]);
    });
});