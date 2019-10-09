import React from 'react'
import styles from './noMatch.module.css'

function noMatch() {
  return (
    <div className={styles.container}>
      <h1>Upps! This route doesn't exist</h1>
    </div>
  );
}

export default noMatch
