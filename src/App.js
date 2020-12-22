import React, { useState, useEffect } from 'react'
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'
import Landing from './components/Landing'
import Layout from './components/Profile/Layout'
import Main2 from './components/Profile/Main2'
import axios from 'axios'

import './App.css'
import Sidebar from './components/ProfileItems/Sidebar'

const ComingSoon = ({ user, users }) => {
	return (
		<div className='profile'>
			<div className='col-lg-12 profile_container'>
				<Sidebar user={user} />
				<Main2 />
			</div>
		</div>
	)
}

function App() {
	const [userData, setUserData] = useState([])
	const [clickedUser, setClickedUser] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			const res = await axios.get('https://panorbit.in/api/users.json')
			console.log('made an request')
			setUserData(res.data.users)
			setLoading(false)
		}

		fetchData()
	}, [])

	const login = user => {
		setClickedUser(user)
	}

	if (loading) {
		return <h2>Loading...</h2>
	}
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route
						exact
						path='/'
						component={() => <Landing users={userData} login={login} />}
					/>
					<Route
						exact
						path='/profile/:id'
						component={() => <Layout user={clickedUser} users={userData} />}
					/>
					<Route
						exact
						path='/comingsoon'
						component={() => <ComingSoon user={clickedUser} />}
					/>
					<Redirect to='/' />
				</Switch>
			</div>
		</Router>
	)
}

export default App