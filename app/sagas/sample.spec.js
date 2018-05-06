import { expect } from 'chai'
import { put } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import saga from './sample'
import { sampleAction } from '../actions/sampleActions'

describe('*sampleSaga()', () => {
    let gen
    let clone
    before(() => {
        // Run saga up until takeEvery:
        [, gen] = saga().next().value.FORK.args
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
