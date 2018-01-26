import React from 'react'
import ReactDOM from 'react-dom'
import Sample from './Sample'
import { expect } from 'chai'
//import sinon from 'sinon'
import { shallow } from 'enzyme'

const NUMBER_OF_BUTTONS = 2

describe('<Sample/>', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Sample />, div)
        ReactDOM.unmountComponentAtNode(div)
    })
    it(`should render ${NUMBER_OF_BUTTONS} buttons`, () => {
        const wrapper = shallow(<Sample />)
        expect(wrapper.find('button')).to.have.length(NUMBER_OF_BUTTONS)
    })
})