import { expect } from 'chai';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';
import reducer, { sampleAction, resetAction } from './Samples';

describe('reducers/Samples', () => {
  const initialState = {};
  // mock up a simple store:
  const store = {
    dispatch: sinon.stub(),
    getState: sinon.stub(),
  };
  store.dispatch.returnsArg(0);
  before(() => {
    fetchMock.get('*', { hello: 'world' });
  });
  after(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  it('should return initialState', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });
  it('should handle a sampleAction', async () => {
    const action = await sampleAction()(store.dispatch, store.getState);
    const result = reducer(initialState, action);
    expect(result).to.be.an('object');
    expect(Object.keys(result).length).to.equal(1);
    expect(Object.keys(result)[0]).to.be.a('string');
    expect(result[Object.keys(result)[0]]).to.be.a('string');
  });
  it('should handle a resetAction', async () => {
    const sampleActionResult = await sampleAction()(store.dispatch, store.getState);
    const result = reducer(
      reducer(initialState, sampleActionResult)
      , resetAction(),
    );
    expect(result).to.deep.equal(initialState);
  });
});
