import { expect } from 'chai';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';
import reducer, { sampleAction, resetAction } from './Samples';

describe('ducks/Samples', () => {
  const initialState = {};
  // mock up a simple store:
  let store;
  before(() => {
    fetchMock.get('*', { hello: 'world' });
  });
  beforeEach(() => {
    store = {
      dispatch: sinon.stub(),
      getState: sinon.stub(),
    };
    store.dispatch.returnsArg(0);
  });
  after(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  it('should return initialState', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });
  it('should handle a sampleAction', (done) => {
    sampleAction()(store.dispatch, store.getState).then((action) => {
      const result = reducer(initialState, action);
      expect(result).to.be.an('object');
      expect(Object.keys(result).length).to.equal(1);
      expect(Object.keys(result)[0]).to.be.a('string');
      expect(result[Object.keys(result)[0]]).to.be.a('string');
      expect(store.dispatch).to.be.calledOnce;
      done();
    });
  });
  it('should handle a resetAction', (done) => {
    sampleAction()(store.dispatch, store.getState).then((sampleActionResult) => {
      const result = reducer(
        reducer(initialState, sampleActionResult)
        , resetAction(),
      );
      expect(result).to.deep.equal(initialState);
      expect(store.dispatch).to.be.calledOnce;
      done();
    });
  });
});
