import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className="py-3">
          <Container>
            <h1>Hello World!</h1>
            <p>Welcome to Trash to Treasure!</p>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
