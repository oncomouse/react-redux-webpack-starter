import React from 'react'
import styles from 'stylesheets/components/Sample.scss'

export default ({samples, sampleAction, resetAction}) => (
	<div>
		<ul>{
			samples.valueSeq().map((sample,id) => (<li key={id}>{sample}</li>)).toSeq()
		}</ul>
		<button className={styles.test + ' btn btn-primary'} onClick={sampleAction}>Click Me!</button>
		<button className={styles.test + ' btn btn-primary'} onClick={resetAction}>Reset List</button>
	</div>
)