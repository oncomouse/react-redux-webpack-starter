import React from 'react';
import {
  compose
  , values
  , mapObjIndexed,
} from 'ramda';
import PropTypes from 'prop-types';
import { AddButton, ResetButton } from './Buttons';
import style from '../stylesheets/components/Sample.scss';

const Sample = ({ samples, sampleAction, resetAction }) => (
  <div>
    <ul className={style.list}>
      {
        compose(
                    values
          , mapObjIndexed((sample, id) => (<li className={style.element} key={id}>{sample}</li>)),
        )(samples)
      }
    </ul>
    <AddButton action={sampleAction} />
    <ResetButton action={resetAction} />
  </div>
);
Sample.propTypes = {
  samples: PropTypes.objectOf(PropTypes.string).isRequired,
  sampleAction: PropTypes.func.isRequired,
  resetAction: PropTypes.func.isRequired,
};
Sample.displayName = 'Sample'; // Useful for testing with enzyme

export default Sample;
