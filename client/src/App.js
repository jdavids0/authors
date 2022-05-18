import React, {useState} from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import './App.css';

import AllAuthors from './components/AllAuthors';
import AuthorForm from './components/AuthorForm';
import EditAuthor from './components/EditAuthor';
import Error from './components/Error';

function App() {

  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      <div className="App container">
        <h1>Favorite Authors</h1>
        <Switch>
          <Route exact path='/'>
            <AllAuthors />
          </Route>
          <Route exact path='/create'>
            <AuthorForm />
          </Route>
          <Route exact path='/edit/:_id'>
            <EditAuthor />
          </Route>
          <Route exact path='/errormsg'>
            <Error />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
