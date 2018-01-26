import React from 'react'
import Sample from './Sample'
import { expect } from 'chai'
import { shallow } from 'enzyme'

const NUMBER_OF_BUTTONS = 2

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
})