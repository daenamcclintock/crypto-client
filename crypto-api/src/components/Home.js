import IndexCryptos from "./cryptos/IndexCryptos"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h2>Home Page</h2>
			<IndexCryptos user={user} msgAlter={msgAlert}/>
		</>
	)
}

export default Home