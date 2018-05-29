import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './App';
import { sampleAction, resetAction } from '../ducks/Samples';

describe('<App/>', () => {
  let store;
  let mockStore;
  before(() => {
    mockStore = configureStore([thunk]);
  });
  beforeEach(() => {
    store = mockStore({
      Samples: {},
    });
    sinon.spy(App.prototype, 'componentDidMount');
    mount(<App
      store={store}
      actions={{ resetAction, sampleAction }}
    />);
  });
  afterEach(() => {
    App.prototype.componentDidMount.restore();
  });
  it('should render without crashing', () => {
    expect(App.prototype.componentDidMount).to.be.calledOnce;
  });
});
