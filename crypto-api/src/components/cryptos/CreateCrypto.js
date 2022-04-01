import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { createCrypto } from '../../api/cryptos'
import {createCryptoSuccess, createCryptoFailure} from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'
import CryptoForm from '../shared/CryptoForm'

// create crypto renders a form and calls createCrypto function
// maybe redirect(navigate) to the new crypto show page
// props we'll need are user, msgAlert
const CreateCrypto = (props) => {
    const {user, msgAlert} = props
    console.log('user in create', user)
    const navigate = useNavigate()
    // we'll need two states
    const [crypto, setCrypto] = useState({name: '', type: '', age: '', adoptable: false})
    console.log('crypto in create', crypto)
    //  an empty crypto object
    // and a createdId (used to navigate)
    // we'll need handleChange and handleSubmit funcs
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

        createCrypto(user, crypto)
            // if create is successful, we should navigate to the show page
            .then(res => {navigate(`/cryptos/${res.data.crypto.id}`)})
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Crypto Added! Success!',
                    message: createCryptoSuccess,
                    variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createCryptoFailure,
                    variant: 'danger',
                }))
        // console.log('this is the crypto', crypto)
    }

    return (
        <CryptoForm 
            crypto={crypto}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Add new crypto!"
        />
    )
}

export default CreateCrypto