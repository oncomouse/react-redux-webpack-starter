import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import { ResetButton, AddButton } from './Buttons'

const NUMBER_OF_BUTTONS = 2

describe('<Button/>', () => {
    let wrapper
    let action
    beforeEach(() => {
        action = sinon.spy()
        wrapper = mount(
            <div>
                <AddButton action={action} />
                <ResetButton action={action} />
            </div>
        )
    })
    it('should render two <Button/>', () => {
        expect(wrapper.find('Button')).to.have.length(NUMBER_OF_BUTTONS)
    })
    it('should respond to being clicked (first button)', () => {
        wrapper.find('Button').at(0).simulate('click')
        expect(action.calledOnce).to.be.true
    })
    it('should respond to being clicked (second button)', () => {
        wrapper.find('Button').at(1).simulate('click')
        expect(action.calledOnce).to.be.true
    })
    it('should contain the proper text', () => {
        expect(wrapper.find('Button').at(0).text()).to.equal('Click Me!')
        expect(wrapper.find('Button').at(1).text()).to.equal('Reset List')
    })
})