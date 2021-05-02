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
import 'semantic-ui-css/semantic.min.css';

const App = () => {
  const [user, setUser] = useState({loggedIn:false})
  useEffect(() => {
    axios({
      method: "get",
      url: "/user",
    }).then((res) => {
      setUser({...res.data, loggedIn:true})
    })}, [Route])
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path={['/', "/home"]} component={() => user.loggedIn ? <HomeScreen /> : <Authenticate setUser={setUser}/> } exact />
          <Route path={['/profile']} component={() => user.loggedIn ? <Profile /> : <Authenticate setUser={setUser}/> } exact />
          <Route path={['/product/:id']} component={props => user.loggedIn ? <ProductScreen {...props}/> : <Authenticate setUser={setUser}/> } />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App