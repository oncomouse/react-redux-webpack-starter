import { expect } from 'chai'
import { put } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { saga } from './Samples'
import reducer from './Samples'
import { sampleAction, resetAction } from './Samples'

describe('*sampleSaga()', () => {
    let gen
    let clone
    before(() => {
        // Run saga up until takeEvery:
        [,gen] = saga().next().value.FORK.args
    })
    beforeEach(() => {
        // Clone post watch generator:
        clone = cloneableGenerator(gen)()
    })
    it('should put a NOOP action', () => {
        const noop = put({
            type: 'NOOP'
        })
        expect(clone.next(sampleAction()).value).to.deep.equal(noop)
    })
})
describe('reducers/Samples', () => {
    const initialState = {}
    it('should return initialState', () => {
        expect(reducer(undefined, {})).to.deep.equal(initialState)
    })
    it('should handle a sampleAction', () => {
        const result = reducer(initialState, sampleAction())
        expect(result).to.be.an('object')
        expect(Object.keys(result).length).to.equal(1)
        expect(Object.keys(result)[0]).to.be.a('string')
        expect(result[Object.keys(result)[0]]).to.be.a('string')
    })
    it('should handle a resetAction', () => {
        const result = reducer(
            reducer(initialState, sampleAction())
            , resetAction()
        )
        expect(result).to.deep.equal(initialState)
    })
})
