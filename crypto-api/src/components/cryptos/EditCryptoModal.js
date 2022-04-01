import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CryptoForm from '../shared/CryptoForm'

const EditCryptoModal = (props) => {
    const { user, show, handleClose, updateCrypto, msgAlert, triggerRefresh } = props
    const [crypto, setCrypto] = useState(props.crypto)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setCrypto(prevCrypto => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)
            if(name === "adoptable" && e.target.checked){
                value = true
            } else if (name === "adoptable" && !e.target.checked){
                value = false
            }

            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevCrypto', prevCrypto)
            console.log('updatedValue', updatedValue)

            return {...prevCrypto, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        console.log('the crypto to submit', crypto)
        updateCrypto(user, crypto)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Crypto Updated! Success!',
                    message: 'u did it',
                    variant: 'success',
                }))
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'that aint it',
                    variant: 'danger',
                }))
        console.log('this is the crypto', crypto)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <CryptoForm 
                    crypto={crypto}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit crypto!"
                />
            </Modal.Body>
        </Modal>
    )
}
    
export default EditCryptoModal