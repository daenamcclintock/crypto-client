import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

// create crypto renders a form and calls createCrypto function
// maybe redirect(navigate) to the new crypto show page
// props we'll need are user, msgAlert
const CryptoForm = (props) => {
    const {handleChange, crypto ,handleSubmit} = props
 


    return (
        <Container className="justify-content-center">
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    placeholder="what is your crypto's name?"
                    value={crypto.name}
                    name='name'
                    onChange={handleChange}
                />
                <Form.Label>Type</Form.Label>
                <Form.Control 
                    placeholder="what type of animal is your crypto?"
                    value={crypto.type}
                    name='type'
                    onChange={handleChange}
                />
                <Form.Label>Age</Form.Label>
                <Form.Control 
                    placeholder="what is your crypto's age?"
                    value={crypto.age}
                    type="number"
                    name='age'
                    onChange={handleChange}
                />
                <Form.Check 
                    label='is this crypto adoptable?'
                    name='adoptable'
                    defaultChecked={crypto.adoptable}
                    onChange={handleChange}
                />
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default CryptoForm