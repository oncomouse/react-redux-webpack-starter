import React from 'react'
import R from 'ramda'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as SampleActions from 'actions/sampleActions'
import Sample from 'components/Sample'

const mapStateToProps = (state, ownProps) => ({
	samples: state.Samples
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	actions: R.mergeAll([
		bindActionCreators(SampleActions, dispatch)
	])
})

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		samples: {}
	}
	static propTypes = {
		samples: PropTypes.object.isRequired,
		actions: PropTypes.objectOf(PropTypes.func).isRequired
	}
	render() {
		return(
			<Sample samples={this.props.samples} sampleAction={this.props.actions.sampleAction} resetAction={this.props.actions.resetAction}/>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);