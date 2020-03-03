import React from 'react';

import {
  Switch,
  Route
} from 'react-router-dom';


import Layout from './Layout/Layout';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import ViewSinglePost from './Components/Post/ViewSinglePost/ViewSinglePost';
import EditSinglePost from './Components/Post/ViewSinglePost/EditSinglePost.js/EditSinglePost';

function App() {
  return (
    <div className="App">
      <Layout>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
            <Route path='/post/:id' exact component={ViewSinglePost} />
            <Route path='/post/edit/:id' exact component={EditSinglePost} />
          </Switch>
      </Layout>
    </div>
  );
}

export default App;
