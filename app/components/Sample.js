import React from 'react'
import R from 'ramda'
// You can use CSS Modules if you prefer:
//import styles from '../stylesheets/components/Sample.scss'

const BUTTON_STYLE = ' f6 link dim br3 ba ph3 pv2 mh1 mb2 dib  green b--green'
const Sample = ({ samples, sampleAction, resetAction }) => (
    <div>
        <ul>
            {
                R.compose(
                    R.values
                    , R.mapObjIndexed((sample, id) => (<li key={id}>
                        {sample}
                    </li>))
                )(samples)
            }
        </ul>
        <button className={BUTTON_STYLE}
            onClick={sampleAction}>
      Click Me!
        </button>
        <button className={BUTTON_STYLE}
            onClick={resetAction}>
      Reset List
        </button>
    </div>
)
Sample.displayName = 'Sample' // Useful for testing with enzyme

export default Sample
