import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol, IonIcon, IonNote, IonButtons, IonMenuButton } from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { logIn, personAdd } from 'ionicons/icons';
import './Home.scss';

const Home: React.FunctionComponent = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" >
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Boul Fate </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="main-content">
          <IonCard className="card">
            <IonCardHeader>
              <IonCardTitle >
                This is a todo app
            </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonRow>
                <IonCol size="8">
                  <IonNote className="title">You already have a account</IonNote>
                  <Link  className="link" to="/login">
                    <IonTitle >
                      <IonIcon icon={logIn} /> {" "}
                      Login
                    </IonTitle>
                  </Link>
                </IonCol>
                <IonCol size="8">
                  <IonNote className="title">Open account</IonNote>
                  <Link className="link" to="/login">
                    <IonTitle >
                      <IonIcon icon={personAdd} /> {" "}
                      Register
                  </IonTitle>
                  </Link>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </>
  );
};

export default Home;