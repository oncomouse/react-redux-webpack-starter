import React from 'react'
import R from 'ramda'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {Map} from 'immutable'
import * as SampleActions from 'actions/sampleActions'
import Sample from 'components/Sample'
import DevTools from 'containers/DevTools'

const mapStateToProps = (state, ownProps) => ({
	samples: state.get('Samples')
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
		samples: Map()
	}
	static propTypes = {
		samples: PropTypes.instanceOf(Map).isRequired,
		actions: PropTypes.objectOf(PropTypes.func).isRequired
	}
	render() {
		return(
			<div>
				{process.env.NODE_ENV === 'production' ? null : <DevTools/>}
				<Sample sampleRequest={this.props.actions.sampleRequest}/>
				</div>);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);