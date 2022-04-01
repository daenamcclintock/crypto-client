import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllCryptos = () => {
    return axios(`${apiUrl}/cryptos`)
}

// show function
export const getOneCrypto = (cryptoId) => {
    return axios(`${apiUrl}/cryptos/${cryptoId}`)
}

// POST -> create function
export const createCrypto = (user, newCrypto) => {
    console.log('user', user)
    console.log('this is newCrypto', newCrypto)
    return axios({
        url: `${apiUrl}/cryptos`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { crypto: newCrypto }
    })
}

// PATCH -> update function
export const updateCrypto = (user, updatedCrypto) => {
    console.log('user', user)
    console.log('this is newCrypto', updatedCrypto)
    return axios({
        url: `${apiUrl}/cryptos/${updatedCrypto.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { crypto: updatedCrypto }
    })
}

// DELETE -> remove function
export const removeCrypto = (user, cryptoId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/cryptos/${cryptoId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}