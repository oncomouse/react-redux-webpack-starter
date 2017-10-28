import React from 'react'
import R from 'ramda'
import styles from 'stylesheets/components/Sample.scss'

export default ({samples, sampleAction, resetAction}) => (
	<div>
		<ul>{
			R.compose(
				R.values,
				R.mapObjIndexed((sample,id) => (<li key={id}>{sample}</li>))
			)(samples)
		}</ul>
		<button className={styles.test + ' btn btn-primary'} onClick={sampleAction}>Click Me!</button>
		<button className={styles.test + ' btn btn-primary'} onClick={resetAction}>Reset List</button>
	</div>
)