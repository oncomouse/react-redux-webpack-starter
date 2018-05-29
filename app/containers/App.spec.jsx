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
  let store;
  let wrapper;
  let mockStore;
  before(() => {
    mockStore = configureStore([thunk]);
    fetchMock.get('*', { hello: 'world' });
  });
  beforeEach(() => {
    store = mockStore({
      Samples: {},
    });
    sinon.spy(App.prototype, 'componentDidMount');
    wrapper = mount(<App
      store={store}
      actions={{ resetAction, sampleAction }}
    />);
  });
  after(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  afterEach(() => {
    App.prototype.componentDidMount.restore();
  });
  it('should render without crashing', () => {
    expect(App.prototype.componentDidMount).to.be.calledOnce;
  });
  it('should trigger a sampleAction when first button clicked', (done) => {
    sampleAction()(store.dispatch, store.getState).then((expectedPayload) => {
      wrapper.find('button').first().simulate('click');
      expect(store.getActions()).to.deep.equal([expectedPayload]);
      done();
    });
  });
  it('should trigger a resetAction when last button clicked', () => {
    const expectedPayload = resetAction();
    wrapper.find('button').last().simulate('click');
    expect(store.getActions()).to.deep.equal([expectedPayload]);
  });
});
