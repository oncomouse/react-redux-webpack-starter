import React from 'react';
import styles from 'stylesheets/components/Sample.scss';

export default ({sampleRequest}) => (
	<button className={styles.test + ' btn btn-primary'} onClick={sampleRequest}>Click Me!</button>
)