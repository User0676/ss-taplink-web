import React from 'react'
import styles from './Loading.module.scss'

const Loading = ({ size = 'default', height = 300 }) => {
    return (
        <div className={styles['loading-container']} style={{ height }}>
            <div className={styles[`spinner-${size}`]} />
        </div>
    )
}

export default Loading
