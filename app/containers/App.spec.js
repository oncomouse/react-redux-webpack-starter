import React from 'react'
import App from './App'
import { expect } from 'chai'
//import sinon from 'sinon'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()
const NUMBER_OF_BUTTONS = 2

describe('<App/>', () => {
    it('renders without crashing', () => {
        const store = mockStore({})
        const wrapper = shallow(<App store={store} />)// eslint-disable-line no-unused-vars
    })
    it(`should render ${NUMBER_OF_BUTTONS} buttons`, () => {
        const store = mockStore({})
        const wrapper = mount(<App store={store} />)
        expect(wrapper.find('button')).to.have.length(NUMBER_OF_BUTTONS)
    })
})