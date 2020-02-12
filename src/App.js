import React from 'react';

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';


import Layout from './Layout/Layout';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />     
          </Switch>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
