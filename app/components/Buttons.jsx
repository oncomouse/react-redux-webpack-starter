import React from 'react'
import PropTypes from 'prop-types'

const BUTTON_STYLE = ' f6 link dim br3 ba ph3 pv2 mh1 mb2 dib  green b--green'
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
const Button = ({ action, children }) => (
    <button
        className={BUTTON_STYLE}
        onClick={action}
    >
        {children}
    </button>
)
Button.displayName = 'Button'
Button.propTypes = {
    action: PropTypes.func.isRequired
    , children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node)
        , PropTypes.node
    ]).isRequired
}