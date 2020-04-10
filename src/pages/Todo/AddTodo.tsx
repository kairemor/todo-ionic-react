import React, { useState, useContext } from 'react';
import axios from 'axios';
import { baseSite } from '../../config';
import { Plugins } from '@capacitor/core';
import { IonContent, IonItem, IonLabel, IonInput, IonButton, IonDatetime, IonToast } from '@ionic/react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';

const AddTodo: React.FunctionComponent = ({ history }: any) => {
  const { state }: any = useContext(AppContext);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [todoAt, setTodoAt] = useState('')
  const { LocalNotifications } = Plugins;

  let min: any = new Date()
  min = min.toISOString()
  const onTitle = (e: any) => {
    setTitle(e.target.value)
  }
  const onDesc = (e: any) => {
    setDesc(e.target.value)
  }

  const onDate = (e: any) => {
    setTodoAt(e.target.value);
  }

  const addTodo = (e: any) => {
    e.preventDefault();
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${state.token}`
    }
    axios.post(`${baseSite}/todo`, {
      title,
      desc,
      todoAt,
      isCompleted: false
    })
      .then((todo: any) => {
        setCreateSuccess(true);
        setTimeout(() => {
          history.push('/dashboard')
        }, 1500);
        const toNotify = new Date(Date.parse(todoAt) - 1000 * 5 * 60);
        LocalNotifications.schedule({
          notifications: [
            {
              title: todo.data.data.title,
              body: todo.data.data.desc,
              id: todo.data.data._id,
              schedule: { at: toNotify },
              sound: undefined,
              attachments: undefined,
              actionTypeId: "",
              extra: null
            }
          ]
        });
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <IonContent>
        <IonToast
          isOpen={createSuccess}
          onDidDismiss={() => setCreateSuccess(false)}
          message="Todo cree avec succes."
          position="top"
          color="success"
          duration={1000}
        />
        <form onSubmit={addTodo}>
          <IonItem>
            <IonLabel position="floating">Titre </IonLabel>
            <IonInput name="title" onIonChange={onTitle}> </IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonInput name="desc" onIonChange={onDesc}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Date a faire</IonLabel>
            <IonDatetime displayFormat="D MMM YYYY H:mm" min={min} onIonChange={onDate}></IonDatetime>
          </IonItem>

          <div className="buttons">
            <IonButton color="success" type="submit"  >Envoyer</IonButton>
            <Link to="/dashboard"><IonButton color="warning" >Annuler</IonButton></Link>
          </div>
        </form>
      </IonContent>

    </>
  )
}

export default AddTodo