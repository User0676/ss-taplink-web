import React from 'react'
import styles from './LoadingText.module.scss'

const LoadingText = ({ size = 'default', text = 'Loading...',  }) => {
    return (
        <div className={styles['loading-container']}>
            <div className={styles[`spinner-${size}`]} />
            <div className={styles['loading-text']}>{text}</div>
        </div>
    )
}

export default LoadingText

