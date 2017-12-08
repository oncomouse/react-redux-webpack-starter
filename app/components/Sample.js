import React from 'react'
// You can use CSS Modules if you prefer:
//import styles from '../stylesheets/components/Sample.scss'
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
			samples.valueSeq().map((sample,id) => (<li key={id}>{sample}</li>)).toArray()
		}</ul>
		<Button onClick={sampleAction}>Click Me!</Button>
		<Button onClick={resetAction}>Reset List</Button>
	</div>
)