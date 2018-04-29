import React from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SampleActions from '../actions/sampleActions';
import Sample from '../components/Sample';

const mapStateToProps = (state, ownProps) => ({ // eslint-disable-line no-unused-vars
  samples: state.Samples,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ // eslint-disable-line no-unused-vars
  actions: R.mergeAll([
    bindActionCreators(SampleActions, dispatch),
  ]),
});

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    samples: PropTypes.objectOf(PropTypes.string).isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
  }
  render() {
    return (
      <Sample
        samples={this.props.samples}
        sampleAction={this.props.actions.sampleAction}
        resetAction={this.props.actions.resetAction}
      />
    );
  }
}

export default connect(
  mapStateToProps
  , mapDispatchToProps,
)(App);
