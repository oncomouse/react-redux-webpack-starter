import React from 'react';
import { compose, mapObjIndexed, values } from 'ramda';
import PropTypes from 'prop-types';
// You can use CSS Modules if you prefer:
// import styles from '../stylesheets/components/Sample.scss'

const BUTTON_STYLE = ' f6 link dim br3 ba ph3 pv2 mh1 mb2 dib  green b--green';
const Sample = ({ samples, sampleAction, resetAction }) => (
  <div>
    <ul>
      {
        compose(
          values
          , mapObjIndexed((sample, id) => (
            <li key={id}>{sample}</li>
          )),
        )(samples)
      }
    </ul>
    <button
      className={BUTTON_STYLE}
      onClick={sampleAction}
    >
          Click Me!
    </button>
    <button
      className={BUTTON_STYLE}
      onClick={resetAction}
    >
          Reset List
    </button>
  </div>
);
Sample.displayName = 'Sample'; // Useful for testing with enzyme
Sample.propTypes = {
  samples: PropTypes.objectOf(PropTypes.string).isRequired,
  sampleAction: PropTypes.func.isRequired,
  resetAction: PropTypes.func.isRequired,
};

export default Sample;
