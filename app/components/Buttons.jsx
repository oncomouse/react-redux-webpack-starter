import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const AddButton = ({ action }) => (
    <Button action={action}>
        Click Me!
    </Button>
)
AddButton.propTypes = {
    action: PropTypes.func.isRequired
}
export const ResetButton = ({ action }) => (
    <Button action={action}>
        Reset List
    </Button>
)
ResetButton.propTypes = {
    action: PropTypes.func.isRequired
}

const Element = styled.button`
  background: #fff;
  border: 1px solid ${props => props.color};
  color: ${props => props.color};
  padding: 10px 30px;
  margin: 0 10px;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    color: #fff;
    background-color: ${props => props.color};
  }
`
const Button = ({ action, children, color }) => (
    <Element onClick={action} color={color}>
        {children}
    </Element>
)
Button.displayName = 'Button'
Button.propTypes = {
    action: PropTypes.func.isRequired
    , children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node)
        , PropTypes.node
    ]).isRequired
    , color: PropTypes.string
}
Button.defaultProps = {
    color: '#673AB7'
}