import React from 'react'
import App from './App'
import { expect } from 'chai'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()

describe('<App/>', () => {
	it('renders without crashing', () => {
		const store = mockStore({})
	    const wrapper = shallow(<App store={store} />)
	})
})