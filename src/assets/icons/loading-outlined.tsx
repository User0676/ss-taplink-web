import { CSSProperties } from 'react'
import styles from './styles.module.scss'

export const LoadingOutlined = ({ style }: { style?: CSSProperties }) => {
    return (
        <svg
            width="24px"
            height="24px"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            style={style}
            className={styles['loading-icon']}
        >
            <circle
                cx="25"
                cy="25"
                r="20"
                stroke={style?.color || 'url(#grad1)'}
                stroke-width="5"
                fill="none"
                stroke-dasharray="80, 200"
            />
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop
                        offset="0%"
                        style={{
                            stopColor: 'rgb(192,192,192)',
                            stopOpacity: 1,
                        }}
                        // style="stop-color:rgb(192,192,192);stop-opacity:1"
                    />
                    <stop
                        offset="100%"
                        style={{
                            stopColor: 'rgb(192,192,192)',
                            stopOpacity: 0,
                        }}
                        // style="stop-color:rgb(192,192,192);stop-opacity:0"
                    />
                </linearGradient>
            </defs>
        </svg>
    )
}
