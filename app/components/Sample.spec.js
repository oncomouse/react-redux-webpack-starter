import React from 'react'
import Sample from './Sample'
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'
import Enzyme from 'enzyme'
import sinon from 'sinon'

Enzyme.configure({ adapter: new Adapter() })

describe('<Sample/>', () => {
	it('renders without crashing', () => {
	    const wrapper = Enzyme.shallow(<Sample />)
	})
	it('should render 2 buttons', () => {
		const wrapper = Enzyme.shallow(<Sample />)
		expect(wrapper.find('button')).to.have.length(2);
	})
})