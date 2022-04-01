import React, { useState, useEffect } from 'react'
import { getAllCryptos } from '../../api/cryptos'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {indexCryptosSuccess, indexCryptosFailure} from '../shared/AutoDismissAlert/messages'

// I'm going to declare a style object
// this will be used to corral my cards
// we can use basic CSS, but we have to use JS syntax
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexCryptos = (props) => {
    const [cryptos, setCryptos] = useState(null)

    const {user, msgAlert} = props

    useEffect(() => {
        getAllCryptos()
            .then(res => {
                setCryptos(res.data.cryptos)
            })
            .then(() => {
                msgAlert({
                    heading: 'Found some cryptos!',
                    message: indexCryptosSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'No Cryptos?!!',
                    message: indexCryptosFailure,
                    variant: 'danger',
                })
            })
    }, [])

    if (!cryptos) {
        return <p>loading...</p>
    } else if (cryptos.length === 0) {
        return <p>no cryptos yet, go add some</p>
    }

    let cryptoCards

    if (cryptos.length > 0) {
        // cryptosJsx = cryptos.map(crypto => (
        //     <li key={crypto.id}>
        //         {crypto.fullTitle}
        //     </li>
        // ))
        cryptoCards = cryptos.map(crypto => (
            // one method of styling, usually reserved for a single style
            // we can use inline, just like in html
            <Card key={crypto.id} style={{ width: '30%' }} className="m-2">
                <Card.Header>{crypto.fullTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/cryptos/${crypto.id}`}>View {crypto.name}</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <h3>All the Cryptos</h3>
            <div style={cardContainerLayout}>
                {cryptoCards}
            </div>
        </>
    )
}

export default IndexCryptos