import React from 'react'
import PropTypes from 'prop-types'
import RedBox from 'redbox-react'
import { equals } from 'ramda'

class ErrorBoundary extends React.Component {
	state = {
		hasError: false
		, error: null
	}
	static propTypes = {
		children: PropTypes.oneOfType([
	        PropTypes.arrayOf(PropTypes.node)
	        , PropTypes.node
	    ]).isRequired
	}
    componentDidCatch(error, info) {
        this.setState({ hasError: true, error })
    }
	componentWillReceiveProps(nextProps) {
		if(!equals(this.props, nextProps)) {
			this.setState({
				hasError: false
				, error: null
			})
		}
	}
    render() {
        if (this.state.hasError) {
            return <RedBox error={this.state.error} />
        }
        return this.props.children
    }
}
export default ErrorBoundary