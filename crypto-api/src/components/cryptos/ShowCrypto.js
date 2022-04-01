import React, {useState, useEffect} from 'react'
import { getOneCrypto, updateCrypto, removeCrypto } from '../../api/cryptos'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import {showCryptoSuccess, showCryptoFailure} from '../shared/AutoDismissAlert/messages'
import EditCryptoModal from './EditCryptoModal'
import ShowToy from '../toys/ShowToy'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowCrypto = (props) => {

    const [crypto, setCrypto] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const {user, msgAlert} = props
    const { id } = useParams()
    const navigate = useNavigate()
    console.log('id in showCrypto', id)
    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOneCrypto(id)
            .then(res => setCrypto(res.data.crypto))
            .then(() => {
                msgAlert({
                    heading: 'Here is the crypto!',
                    message: showCryptoSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'No crypto found',
                    message: showCryptoFailure,
                    variant: 'danger',
                })
            })
    }, [updated])

    const removeTheCrypto = () => {
        removeCrypto(user, crypto.id)
            .then(() => {
                msgAlert({
                    heading: 'crypto politely removed!',
                    message: 'theyre gone',
                    variant: 'success',
                })
            })
            .then(() => {navigate(`/`)})
            .catch(() => {
                msgAlert({
                    heading: 'something went wrong',
                    message: 'that aint it',
                    variant: 'danger',
                })
            })
    }

    let toyCards
    if (crypto) {
        if (crypto.toys.length > 0) {
            toyCards = crypto.toys.map(toy => (
                <ShowToy key={toy.id} toy={toy}/>
            ))
        }
    }

    if (!crypto) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{crypto.fullTitle}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Age: {crypto.age}</small><br/>
                            <small>Type: {crypto.type}</small><br/>
                            <small>
                                Adoptable: {crypto.adoptable ? 'yes' : 'no'}
                            </small>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Crypto
                        </Button>
                        <Button onClick={() => removeTheCrypto()}className="m-2" variant="danger">
                            Delete Crypto
                        </Button>

                    </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
                {toyCards}
            </Container>
            <EditCryptoModal 
                crypto={crypto}
                show={modalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateCrypto={updateCrypto}
                handleClose={() => setModalOpen(false)}
            />
        </>
    )
}

export default ShowCrypto