import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { identity, times } from 'ramda'
import Sample from './Sample'

const NUMBER_OF_BUTTONS = 2
const SAMPLE_LENGTH = 36
const STRING_LENGTH = 8
const randomString = () => Math.random()
    .toString(SAMPLE_LENGTH)
    .replace(/[^a-z]+/g, '')
    .substr(0, STRING_LENGTH - 1)
const randomInteger = (min, max) =>
    Math.floor(Math.random() * (max - (min + 1))) + min
describe('<Sample/>', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(<Sample
            samples={{}}
            sampleAction={identity}
            resetAction={identity}
        />)
    })
    it('should render without crashing', () => {
        expect(wrapper.is('Sample')).to.equal(true)
    })
    it('should render a div as the first child', () => {
        expect(wrapper.childAt(0).type()).to.equal('div')
    })
    it('should render a ul as the first child of the first child div', () => {
        expect(wrapper.childAt(0).childAt(0).type()).to.equal('ul')
    })
    it(`should render ${NUMBER_OF_BUTTONS} buttons`, () => {
        expect(wrapper.find('Button')).to.have.length(NUMBER_OF_BUTTONS)
    })
    it('should render an object of random strings as <li>', () => {
        const samples = {}
        times(() => {
            const r = randomString()
            samples[r] = r
        }, randomInteger(8, 24)) // eslint-disable-line no-magic-numbers
        wrapper.setProps({ samples })
        expect(wrapper.find('li')).to.have.length(Object.keys(samples).length)
    })
})