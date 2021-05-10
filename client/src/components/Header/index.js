import React, { useState, setState } from "react";
import { Route } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import SearchBox from "../SearchBox";

const Header = props => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <header>
      <Navbar bg="primary" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Trash to Treasure</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route
              render={
                props.loggedIn
                  ? ({ history }) => <SearchBox history={history} />
                  : ""
              }
            />
            <Nav className="ml-auto">
              <Nav.Link href="/cart">
                <i className="fas fa-shopping-cart"></i>
                Cart
              </Nav.Link>
              <Nav.Link onClick={() => props.onLogout()}>
                <i className="fas fa-user"></i>
                {props.loggedIn ? "Log Out" : "Log In"}
              </Nav.Link>
              <Nav.Link href="/create">
                <i className="fas fa-clipboard"></i> New Listing
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
