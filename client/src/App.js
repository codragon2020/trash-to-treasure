import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Authenticate from './screens/Authenticate'
import Profile from './screens/Profile' // For future development
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import axios from "axios"

const App = () => {
  const [user, setUser] = useState({loggedIn:false})
  useEffect(() => {
    axios({
      method: "get",
      url: "/user",
    }).then((res) => {
      setUser({...res.data, loggedIn:true})
    })}, [])
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path={['/', "/home"]} component={() => user.loggedIn ? <HomeScreen /> : <Authenticate setUser={setUser}/> } />
          <Route path='/profile' component={Profile} exact />
          {/* <Route path='/home' component={user.loggedIn ? HomeScreen : Authenticate } exact /> */}
          <Route path='/product/:id' component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App