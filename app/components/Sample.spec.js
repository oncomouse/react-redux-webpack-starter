import React from 'react'
import Sample from './Sample'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { times } from 'ramda'

const NUMBER_OF_BUTTONS = 2
const SAMPLE_LENGTH = 36
const STRING_LENGTH = 8
const randomString = () => Math.random()
    .toString(SAMPLE_LENGTH)
    .replace(/[^a-z]+/g, '')
    .substr(0, STRING_LENGTH - 1)
const randomInteger = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
describe('<Sample/>', () => {
    var wrapper
    beforeEach(() => {
        wrapper = shallow(<Sample />)
    })
    it('should render without crashing', () => {
        expect(wrapper.is('div')).to.equal(true)
    })
    it('should render a ul as the first child', () => {
        expect(wrapper.childAt(0).type()).to.equal('ul')
    })
    it(`should render ${NUMBER_OF_BUTTONS} buttons`, () => {
        expect(wrapper.find('button')).to.have.length(NUMBER_OF_BUTTONS)
    })
    it('should render an object of strings as <li>', () => {
        const samples = {}
        times(() => {
            const r = randomString()
            samples[r] = r
        }, randomInteger(8, 24)) // eslint-disable-line no-magic-numbers
        wrapper = shallow(<Sample samples={samples} />)
        expect(wrapper.find('li')).to.have.length(Object.keys(samples).length)
    })
})