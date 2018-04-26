import React from 'react'
import {
    mergeAll
} from 'ramda'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as SampleActions from '../actions/sampleActions'
import Sample from '../components/Sample'

const mapStateToProps = (state, ownProps) => ({ // eslint-disable-line no-unused-vars
    samples: state.Samples
})

const mapDispatchToProps = (dispatch, ownProps) => ({ // eslint-disable-line no-unused-vars
    actions: mergeAll([
        bindActionCreators(SampleActions, dispatch)
    ])
})

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
      samples: {}
  }
  static propTypes = {
      samples: PropTypes.object.isRequired
      , actions: PropTypes.objectOf(PropTypes.func).isRequired
  }
  constructor(props) {
      super(props)
  }
  render() {
      return(
          <Sample samples={this.props.samples}
              sampleAction={this.props.actions.sampleAction}
              resetAction={this.props.actions.resetAction} />
      )
  }
}

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(App)