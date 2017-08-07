import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {Map} from 'immutable'
import * as SampleActions from 'actions/sampleActions'
import Sample from 'components/Sample'

const mapStateToProps = (state, ownProps) => ({
	samples: state.samples
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	actions: bindActionCreators(SampleActions, dispatch)
})

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		samples: Map()
	}
	static propTypes = {
		samples: PropTypes.instanceOf(Map).isRequired,
		actions: PropTypes.objectOf(PropTypes.func).isRequired
	}
	render() {
		return(<Sample sampleRequest={this.props.actions.sampleRequest}/>);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);