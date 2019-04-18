import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import home from "./pages/home/home.js";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={home} />
    </Router>
  );
};

export default App;