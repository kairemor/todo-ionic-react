import React, { useState, useContext } from 'react';

import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonNote,
  IonGrid,
  IonIcon,
  IonFabButton,
  IonMenuButton,
  IonButtons
} from '@ionic/react';
import * as actions from '../../store/actions/actions';
import { AppContext } from '../../App';
import axios from 'axios';
import { baseSite } from '../../config';
import { mail, lock, logIn, logoFacebook, logoTwitter, logoGithub, logoGoogleplus } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import './Login.scss'

const LoginForm = () => {
  const [email, setEmail]: any = useState();
  const [password, setPassword]: any = useState();
  const { state, dispatch }: any = useContext(AppContext)

  const onEmail = (email: string) => {
    setEmail(email)
  }
  const onPassword = (password: string) => {
    setPassword(password)
  }

  const [formErrors, setFormErrors]: any = useState('');

  const submit = () => {
    authLogin(email, password);
  }


  const authLogin = (username: string, password: string) => {
    dispatch(actions.authStart());
    axios
      .post(`${baseSite}/users/login`, {
        username, password
      })
      .then(res => {
        console.log(res);
        const user = {
          username: res.data.user.username,
          token: res.data.token,
          //   expirationDate: new Date(new Date().getTime() + 3600 * 1000),
        }
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(actions.authSuccess(user));
        // dispatch(actions.checkAuthTimeout(3600))
        console.dir(state);
      })
      .catch(err => {
        dispatch(actions.authFail("Le nom utilisateur ou mot de passe pas valide"));
        setFormErrors("Le nom utilisateur ou mot de passe pas valide");
        console.log(err)
      });
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" >
            <IonMenuButton />
          </IonButtons>
          <IonIcon slot="start" icon={logIn} size="large" />
          <IonTitle >
            Login Form {" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="main-content">
          <form className="login-form" onSubmit={(e) => { e.preventDefault(); submit(); }}>
            <IonGrid >
              <IonNote className="text-danger text-center">
                {formErrors ? (
                  formErrors
                ) : ''}
              </IonNote>
              <IonItem className="plvr form-control">
                <IonLabel> <IonIcon icon={mail}></IonIcon></IonLabel>
                <IonInput className="form-control" name="email" type="email" value={email} onBlur={(e: any) => onEmail(e.target.value)} onChange={(e: any) => onEmail(e.target.value)} />
              </IonItem>
              <IonItem className="plvr form-control">
                <IonLabel><IonIcon icon={lock}></IonIcon></IonLabel>
                <IonInput className="form-control" name="password" type="password" value={password} onBlur={(e: any) => onPassword(e.target.value)} onChange={(e: any) => onPassword(e.target.value)} />
              </IonItem>
              <IonButton expand="full" className="btn-login" type="submit" onSubmit={submit}>Log in</IonButton>
            </IonGrid>

            <div className="logo">
              <IonFabButton color="primary">
                <IonIcon icon={logoFacebook} />
              </IonFabButton>
              <IonFabButton color="primary">
                <IonIcon icon={logoTwitter} />
              </IonFabButton>
              <IonFabButton color="primary">
                <IonIcon icon={logoGithub} />
              </IonFabButton>
              <IonFabButton color="primary">
                <IonIcon icon={logoGoogleplus} />
              </IonFabButton>
            </div>
            <p className="text text-center">Vous n'avez de compte ? Ouvrir un compte <Link to='register'>Ici</Link></p>
          </form>
        </div>
      </IonContent>
    </>
  )
}

export default LoginForm;