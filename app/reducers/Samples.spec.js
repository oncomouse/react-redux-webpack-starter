import { expect } from 'chai';
import reducer from './Samples';
import { sampleAction, resetAction } from '../actions/sampleActions';

describe('reducers/Samples', () => {
  const initialState = {};
  it('should return initialState', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });
  it('should handle a sampleAction', () => {
    const result = reducer(initialState, sampleAction());
    expect(result).to.be.an('object');
    expect(Object.keys(result).length).to.equal(1);
    expect(Object.keys(result)[0]).to.be.a('string');
    expect(result[Object.keys(result)[0]]).to.be.a('string');
  });
  it('should handle a resetAction', () => {
    const result = reducer(
      reducer(initialState, sampleAction())
      , resetAction(),
    );
    expect(result).to.deep.equal(initialState);
  });
});
