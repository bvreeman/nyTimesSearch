import React, { Component } from 'react';
import './App.css';
import Nav from "./components/Nav";
import { BrowserRouter as Router } from "react-router-dom";
import Search from "./components/Search";
import Results from "./components/Results";
import Saved from "./components/Saved";


class App extends Component {
  state = {
    articles: [],
    queryTerm: "",
    savedArticles: [],
    startDate: '',
    endDate: ''
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Search />
          <Results />
          <Saved />
        </div>
      </Router>
    );
  }
}

export default App;
