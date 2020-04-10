import React, { useReducer, createContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';
import LoginForm from './pages/Authentication/Login';
import './App.scss';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import * as actions from './store/actions/actions';

import reducer, { initialState } from './store/reducers/auth';
import RegisterForm from './pages/Authentication/Register';
import PrivateRoute from './utils/PrivateRoute';
import Layout from './pages/Layout/Layout';
import Menu from './pages/Menu/Menu';

export const AppContext: any = createContext('');
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };

  useEffect(() => {
    authCheckState()
  }, [])

  const authCheckState = () => {
    const storage: any = localStorage.getItem("user");
    const user = JSON.parse(storage);
    if (user) {
      if (user.token === undefined) {
        dispatch(actions.authLogout());
      } else {
        const expirationDate = user.expirationDate;
        if (expirationDate <= new Date()) {
          dispatch(actions.authLogout());
        } else {
          dispatch(actions.authSuccess(user));
        }
      }

    };
  };


  return (
    <>
      <IonApp>
        <AppContext.Provider value={value}>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu />
              <IonPage id="main">
                <IonRouterOutlet>
                  {
                    state.token ?
                      <Redirect to="/dashboard" />
                      : ''
                  }
                  <PrivateRoute path="/dashboard" component={Layout} />
                  <Route path="/home" component={Home} exact={true} />
                  <Route path="/login" component={LoginForm} exact={true} />
                  <Route path="/register" component={RegisterForm} exact={true} />
                  <Route exact path="/" render={() => <Redirect to="/home" />} />
                </IonRouterOutlet>
              </IonPage>
            </IonSplitPane>
          </IonReactRouter>
        </AppContext.Provider>
      </IonApp>

    </>
  )
};

export default App;
