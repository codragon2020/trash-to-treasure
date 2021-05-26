import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Authenticate from "./screens/Authenticate";
import Profile from "./screens/Profile"; // For future development
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CreateProduct from "./screens/CreateProduct";
import AddToCart from "./screens/AddToCart";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState({ loggedIn: false });
  useEffect(() => {
    axios({
      method: "get",
      url: "/auth/user",
    }).then((res) => {
      setUser({ ...res.data, loggedIn: true });
    });
  }, [Route]);

  const handleLogout = () => {
    axios({
      method: "post",
      url: "/auth/logout",
    }).then((res) => {
      setUser({ loggedIn: false });
    });
  };

  return (
    <Router>
      <Header loggedIn={user.loggedIn} onLogout={handleLogout} />
      <main className="py-3">
        <Container>
          <Route
            path={["/", "/home"]}
            component={() =>
              user.loggedIn ? (
                <HomeScreen />
              ) : (
                <Authenticate setUser={setUser} />
              )
            }
            exact
          />
          <Route
            path={["/profile"]}
            component={() =>
              user.loggedIn ? <Profile /> : <Authenticate setUser={setUser} />
            }
            exact
          />
          <Route
            path={["/product/:id"]}
            component={(props) =>
              user.loggedIn ? (
                <ProductScreen {...props} />
              ) : (
                <Authenticate setUser={setUser} />
              )
            }
          />
          <Route
            path={["/create"]}
            component={(props) =>
              user.loggedIn ? (
                <CreateProduct {...props} />
              ) : (
                <Authenticate setUser={setUser} />
              )
            }
            exact
          />
          <Route
            path={["/cart"]}
            component={(props) =>
              user.loggedIn ? (
                <AddToCart {...props} />
              ) : (
                <Authenticate setUser={setUser} />
              )
            }
            exact
          />
          <Route path="/search/:keyword" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
