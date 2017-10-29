import React from 'react'
import R from 'ramda'
// You can use CSS Modules if you prefer:
//import styles from 'stylesheets/components/Sample.scss'
import styled from 'styled-components'

const Button = styled.button`
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border-radius: 3px;
	color: mediumseagreen;
	background: white;
	border: 2px solid mediumseagreen;
`

export default ({samples, sampleAction, resetAction}) => (
	<div>
		<ul>{
			R.compose(
				R.values,
				R.mapObjIndexed((sample,id) => (<li key={id}>{sample}</li>))
			)(samples)
		}</ul>
		<Button onClick={sampleAction}>Click Me!</Button>
		<Button onClick={resetAction}>Reset List</Button>
	</div>
)