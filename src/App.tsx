import React from 'react';
import PageNavigator from "./PageNavigator";
import {BrowserRouter} from "react-router-dom";
import PageHeader from "./Common/PageHeader";

function App() {
  return (
    <BrowserRouter>
      <PageHeader/>
      <PageNavigator/>
    </BrowserRouter>
  );
}

export default App;
