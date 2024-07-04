import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import IconSvg from '../../../assets/icons/Icon'

export type SearchInputProps = {
    value: string
    onChange: (value: string) => void
    onInputClose?: () => void
}
export const Search = ({ value, onChange, onInputClose }: SearchInputProps) => {
    // const [isInputVisible, setIsInputVisible] = useState(false)
    // const [isButtonVisible, setIsButtonVisible] = useState(true)
    // const [inputValue, setInputValue] = useState(value)
    // const [isFirstRender, setIsFirstRender] = useState(true)
    // const [isShowSearchInputIcon, setIsShowSearchInputIcon] = useState(false)
    // const inputRef = useRef(null)
    const [isInputVisible, setIsInputVisible] = useState(false)
    const [, setIsButtonVisible] = useState(true)
    const [inputValue, setInputValue] = useState(value)
    const [, setIsShowSearchInputIcon] = useState(false)
    const [isClearButtonShow, setIsClearButtonShow] = useState(false)
    const inputRef = useRef(null)

    const onBlur = () => {
        if (!inputValue.trim()) {
            return setIsInputVisible(false)
        }
    }

    const cleatInput = () => {
        setInputValue('')
        onChange("")
    }

    useEffect(() => {
        if (isInputVisible) {
            setIsButtonVisible(false)
        } else {
            onInputClose && onInputClose()
        }

        setTimeout(() => {
            if (isInputVisible && inputRef?.current) {
                const current = inputRef.current as HTMLInputElement
                current.focus()
            }
        }, 500)

        setTimeout(() => {
            if (!isInputVisible) {
                setIsShowSearchInputIcon(false)
            }
        }, 350)

        if (!isInputVisible) {
            setTimeout(() => {
                setIsButtonVisible(true)
            }, 500)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInputVisible])

    useEffect(() => {
        setInputValue(value)
        setIsClearButtonShow(!!value)
    }, [value])

    return (
        // <div className={styles['search-input']}>
        //     {!isFirstRender && (
        //         <div
        //             className={styles['input-container'] + ` ${isInputVisible ? styles.visible : styles.hidden}`}
        //             style={{
        //                 paddingLeft: 8,
        //                 paddingRight: 8,
        //             }}
        //         >
        //             {isShowSearchInputIcon && <IconSvg name="search" />}{' '}
        //             <input
        //                 className={styles.input}
        //                 ref={inputRef}
        //                 value={inputValue}
        //                 onChange={(v) => {
        //                     setInputValue(v.target.value)
        //                     onChange(v.target.value)
        //                 }}
        //                 onBlur={onBlur}
        //             />
        //         </div>
        //     )}

        // {isButtonVisible && (
        //     <Button
        //         className={`${styles['search-button']} step-5-updates`}
        //         style={{ padding: 6 }}
        //         type="outline"
        //         icon={ <IconSvg name="search" />}
        //         onClick={() => {
        //             setIsInputVisible(true)
        //             setIsShowSearchInputIcon(true)
        //             setIsFirstRender(false)
        //         }}
        //         isMenu
        //     />
        // )}
        //
        // </div>

        <div className={styles['search-input']}>
            <div
                className={styles['input-container'] + ` ${styles.visible}`}
                style={{
                    paddingLeft: 8,
                    paddingRight: 8,
                }}
            >
                <IconSvg name="search" />
                <input
                    className={styles.input }
                    ref={inputRef}
                    value={inputValue}
                    onChange={(v) => {
                        setInputValue(v.target.value)
                        onChange(v.target.value)
                    }}
                    onBlur={onBlur}
                    placeholder='Поиск'
                />
                <div style={{
                    cursor: 'pointer',
                    display: isClearButtonShow ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onClick={cleatInput}>
                    <IconSvg name="clear-input"/>
                </div>


            </div>
        </div>
    )
}
