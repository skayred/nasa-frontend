import React from "react";

import { Layout } from "antd";
import { ApolloProvider } from "@apollo/client";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import { TopMenu } from "./components/layout/TopMenu";
import { AsteroidsListContainer } from "./containers/asteroids/AsteroidsListContainer";
import { DefaultLanding } from "./components/DefaultLanding";

import "./App.css";

import { createApolloClient } from "./client";

const history = createBrowserHistory();

function App() {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Router history={history}>
        <Layout className="layout">
          <TopMenu />
          <Layout className="main-content">
            <Switch>
              <Route path="/asteroids">
                <AsteroidsListContainer />
              </Route>
              <Route path="*">
                <DefaultLanding />
              </Route>
            </Switch>
          </Layout>
        </Layout>
      </Router>
    </ApolloProvider>
  );
}

export default App;
