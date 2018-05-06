import React from 'react'
import {
    compose
    , values
    , mapObjIndexed
} from 'ramda'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AddButton, ResetButton } from './Buttons'

const List = styled.ul`
    list-style: none;
`
const ListItem = styled.li`
    
`

const Sample = ({ samples, sampleAction, resetAction }) => (
    <div>
        <List>
            {
                compose(
                    values
                    , mapObjIndexed((sample, id) => (
                        <ListItem key={id}>
                            {sample}
                        </ListItem>
                    ))
                )(samples)
            }
        </List>
        <AddButton action={sampleAction} />
        <ResetButton action={resetAction} />
    </div>
)
Sample.propTypes = {
    samples: PropTypes.objectOf(PropTypes.string).isRequired
    , sampleAction: PropTypes.func.isRequired
    , resetAction: PropTypes.func.isRequired
}
Sample.displayName = 'Sample' // Useful for testing with enzyme

export default Sample