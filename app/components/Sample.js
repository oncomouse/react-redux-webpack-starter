import React from 'react';
import {connect} from 'react-redux';
import { Map } from 'immutable';
import FilterButton from 'components/FilterButton';
import { sampleRequest } from 'actions/sampleActions';

const mapStateToProps = (state, ownProps) => {
	return {
		drinks: state.drinks,
		books: state.books
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		load: () => {
			dispatch(sampleRequest());
		}
	}
}

class Sample extends React.Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		samples: Map()
	}
	componentDidMount() {
		this.props.load();
	}
	render() {
		return(<div/>);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Sample);