import React from 'react';
import { Route, Link } from 'react-router-dom';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonIcon, IonRouterOutlet, IonContent, IonFab, IonFabButton } from '@ionic/react';
import TodoList from '../Todo/ListTodo';
import AddTodo from '../Todo/AddTodo';
import { add } from 'ionicons/icons';
import Profile from '../Profile/Profile';


const Layout = () => {

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" >
            <IonMenuButton />
          </IonButtons>
          <IonTitle >
            Dashboard
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonFab vertical="bottom" horizontal="end">
          <Link to="/dashboard/add">
            <IonFabButton className="buttonAdd">
              <IonIcon icon={add} />
            </IonFabButton>
          </Link>
        </IonFab>
        <IonRouterOutlet>
          <Route path="/dashboard/add" component={AddTodo} exact={true} />
          <Route path="/dashboard" component={TodoList} exact={true} />
          <Route path="/dashboard/todos" component={TodoList} exact={true} />
          <Route path="/dashboard/profile" component={Profile} exact={true} />
        </IonRouterOutlet>
      </IonContent>
    </>
  )
}

export default Layout;