import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { ResetButton, AddButton } from './Buttons';

describe('<Button/>', () => {
  let wrapper;
  let action;
  beforeEach(() => {
    action = sinon.spy();
    wrapper = mount(<div><AddButton action={action} /><ResetButton action={action} /></div>);
  });
  it('should render two <Button/>', () => {
    expect(wrapper.find('Button')).to.have.length(2);
  });
  it('should respond to being clicked (first button)', () => {
    wrapper.find('Button').at(0).simulate('click');
    expect(action.calledOnce).to.equal(true);
  });
  it('should respond to being clicked (second button)', () => {
    wrapper.find('Button').at(1).simulate('click');
    expect(action.calledOnce).to.equal(true);
  });
  it('should contain the proper text', () => {
    expect(wrapper.find('Button').at(0).text()).to.equal('Click Me!');
    expect(wrapper.find('Button').at(1).text()).to.equal('Reset List');
  });
});
