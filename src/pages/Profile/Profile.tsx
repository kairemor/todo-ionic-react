import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AppContext } from '../../App';
import axios from 'axios';
import { baseSite } from '../../config';
import moment from 'moment';
import { IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonThumbnail, IonImg } from '@ionic/react';


const Profile: React.FunctionComponent = () => {
  const [me, setMe]: any = useState([]);
  const { state }: any = useContext(AppContext);
  // const [stateChangeSuccess, setStateChangeSuccess] = useState(false);

  const getMe = useCallback(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${state.token}`
    }
    axios.get(`${baseSite}/users/me`)
      .then(me => {
        setMe(me.data);
        console.log(me);
      })
      .catch(err => console.log(err))
  }, [state])

  useEffect(() => {
    getMe();
  }, [getMe])



  return (
    <IonContent>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>{me.fname} Profile</IonCardSubtitle>
          <IonCardTitle>Title</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonThumbnail>
            <IonImg src={me.image} />
          </IonThumbnail>
          <IonGrid>
            <IonRow>
              <IonCol>{me.fname}</IonCol>
              <IonCol>{me.lname}</IonCol>
              <IonCol>{me.username}</IonCol>
              <IonCol>{moment(me.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>

    </IonContent>
  )
}


export default Profile; 