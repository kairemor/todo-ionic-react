import React, { useContext } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonIcon } from '@ionic/react';
import { AppContext } from '../../App';
import * as actions from '../../store/actions/actions';
import { Link } from 'react-router-dom';
import { person, logIn, logOut, personAdd, home, add, list } from 'ionicons/icons';

export const Menu: React.FC = () => {
  const { state, dispatch }: any = useContext(AppContext)

  const logout = () => {
    dispatch(actions.authLogout())
  }

  return (
    <>
      <IonMenu side="start" contentId="main">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Boul Fate</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {
              state.token ? (
                <>
                  <IonItem> <IonIcon icon={home} /><Link to='/dashboard'>Home </Link></IonItem>
                  <IonItem> <IonIcon icon={add} /><Link to='/dashboard/add'>Add Todo</Link></IonItem>
                  <IonItem> <IonIcon icon={list} /><Link to='/dashboard/todos'>Todos</Link></IonItem>
                  <IonItem> <IonIcon icon={person} /><Link to='/dashboard/profile'>Profile</Link></IonItem>
                  <IonItem> <IonIcon icon={logOut} /><Link onClick={logout} to='/login'>Logout</Link></IonItem>
                </>
              ) : (
                  <>
                    <IonItem> <IonIcon icon={home} /><Link to='/home'>Home </Link></IonItem>
                    <IonItem>  <IonIcon icon={logIn} /> <Link to='/login'>Login  </Link></IonItem>
                    <IonItem> <IonIcon icon={personAdd} />   <Link to='/register'>Register </Link></IonItem>
                  </>
                )
            }
          </IonList>
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="main" ></IonRouterOutlet>
    </>
  )
};

export default Menu;