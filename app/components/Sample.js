import React from 'react'
import styles from 'stylesheets/components/Sample.scss'

export default ({samples, sampleRequest, resetRequest}) => (
	<div>
		<ul>{
			samples.map((sample,id) => (<li id={id}>{sample}</li>)).toSeq()
		}</ul>
		<button className={styles.test + ' btn btn-primary'} onClick={sampleRequest}>Click Me!</button>
		<button className={styles.test + ' btn btn-primary'} onClick={resetRequest}>Reset List</button>
	</div>
)