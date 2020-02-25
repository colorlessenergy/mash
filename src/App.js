import React from 'react';

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';


import Layout from './Layout/Layout';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import ViewSinglePost from './Components/Post/ViewSinglePost/ViewSinglePost';

function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
            <Route path='/post/:id' exact component={ViewSinglePost} />
          </Switch>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
