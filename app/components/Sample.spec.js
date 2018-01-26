import React from 'react'
import Sample from './Sample'
import { expect } from 'chai'
import sinon from 'sinon'
import { shallow } from 'enzyme'

describe('<Sample/>', () => {
	it('renders without crashing', () => {
	    const wrapper = shallow(<Sample />)
	})
	it('should render 2 buttons', () => {
		const wrapper = shallow(<Sample />)
		expect(wrapper.find('button')).to.have.length(2);
	})
})