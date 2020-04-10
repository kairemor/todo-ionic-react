import React, { useState, useContext } from 'react';

import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon
} from '@ionic/react';
import * as actions from '../../store/actions/actions';
import { AppContext } from '../../App';
import axios from 'axios';
import { baseSite } from '../../config';
import { Link } from 'react-router-dom';
import { mail, lock, personAdd, person } from 'ionicons/icons';
import './Login.scss'

const RegisterForm = () => {
  const [email, setEmail]: any = useState();
  const [fname, setFname]: any = useState();
  const [lname, setLname]: any = useState();
  const [password, setPassword]: any = useState();
  const [formErrors, setFormErrors]: any = useState();
  const { dispatch }: any = useContext(AppContext)

  const onEmail = (email: string) => {
    setEmail(email)
  }
  const onPassword = (password: string) => {
    setPassword(password)
  }
  const onFname = (password: string) => {
    setFname(password)
  }
  const onLname = (password: string) => {
    setLname(password)
  }



  const submit = () => {
    authRegister(email, password);
  }

  const authRegister = (email: any, password: any) => {
    dispatch(actions.authStart());
    axios
      .post(`${baseSite}/users/signup`, {
        username: email,
        password, fname, lname
      })
      .then(res => {
        if (res.data.error) {
          dispatch(actions.authFail(res.data.error))
        } else {
          const user = {
            username: res.data.user.username,
            fname: res.data.user.fname,
            lname: res.data.user.lname,
            token: res.data.token,
            // expirationDate: new Date(new Date().getTime() + 3600 * 1000),
          }
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(actions.authSuccess(user));
          dispatch(actions.checkAuthTimeout(3600));
        }
      })
      .catch(err => {
        dispatch(actions.authFail("Nom utilisateur ou email deja pris"));
        setFormErrors("Nom utilisateur ou email deja pris");
        console.log(err)
      });
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          Register <IonIcon icon={personAdd} />
          <IonTitle >
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="main-content">
          <form className="login-form" onSubmit={(e) => { e.preventDefault(); submit(); }}>
            <div>
              {formErrors ? (
                formErrors
              ) : null}
            </div>
            <IonList>
              <IonItem>
                <IonLabel><IonIcon icon={mail} /></IonLabel>
                <IonInput name="email" placeholder="kaire@gmail.fr" type="email" value={email} onBlur={(e: any) => onEmail(e.target.value)} onChange={(e: any) => onEmail(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonLabel><IonIcon icon={lock} /></IonLabel>
                <IonInput name="password" placeholder="Password" type="password" value={password} onBlur={(e: any) => onPassword(e.target.value)} onChange={(e: any) => onPassword(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonLabel><IonIcon icon={person} /></IonLabel>
                <IonInput name="fname" placeholder="Prenom " type="text" value={fname} onBlur={(e: any) => onFname(e.target.value)} onChange={(e: any) => onPassword(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonLabel><IonIcon icon={person} /></IonLabel>
                <IonInput name="lname" placeholder="Nom" type="text" value={lname} onBlur={(e: any) => onLname(e.target.value)} onChange={(e: any) => onPassword(e.target.value)} />
              </IonItem>
            </IonList>
            <IonButton expand="full" type="submit" onSubmit={submit}>Register</IonButton>
            <p className="text text-center">Vous avez deja un compte ? Log in <Link to='login'>Ici</Link></p>
          </form>
        </div>
      </IonContent>
    </>
  )
}

export default RegisterForm;