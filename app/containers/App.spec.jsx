import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import App from './App';
import { sampleAction, resetAction } from '../ducks/Samples';

describe('<App/>', () => {
  let store;
  let wrapper;
  let mockStore;
  after(() => {
    App.prototype.componentDidMount.restore();
  });
  before(() => {
    mockStore = configureStore();
    sinon.spy(App.prototype, 'componentDidMount');
  });
  beforeEach(() => {
    store = mockStore({
      Samples: {},
    });
    wrapper = mount(<App
      store={store}
      actions={{ sampleAction, resetAction }}
    />);
  });
  it('should render without crashing', () => {
    expect(App.prototype.componentDidMount.calledOnce).to.be.true;
  });
  it('should trigger a sampleAction when first button clicked', () => {
    const expectedPayload = sampleAction();
    wrapper.find('button').first().simulate('click');
    expect(store.getActions()).to.deep.equal([expectedPayload]);
  });
  it('should trigger a resetAction when last button clicked', () => {
    const expectedPayload = resetAction();
    wrapper.find('button').last().simulate('click');
    expect(store.getActions()).to.deep.equal([expectedPayload]);
  });
});
