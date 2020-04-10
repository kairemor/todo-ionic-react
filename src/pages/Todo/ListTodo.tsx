import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AppContext } from '../../App';
import axios from 'axios';
import { baseSite } from '../../config';
import moment from 'moment';
import { IonList, IonItem, IonCheckbox, IonLabel, IonNote, IonBadge } from '@ionic/react';

const TodoList: React.FunctionComponent = () => {
  const [todos, setTodos]: any = useState([]);
  const { state }: any = useContext(AppContext);

  // const [stateChangeSuccess, setStateChangeSuccess] = useState(false);

  const getTodos = useCallback(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${state.token}`
    }
    axios.get(`${baseSite}/todo`)
      .then(todo => {
        setTodos(todo.data.data);
      })
      .catch(err => console.log(err))
  }, [state])

  const completeStyle: any = (todo: any) =>
    todo.isCompleted ? { textDecoration: "line-through" } : { textDecoration: "none" }
    ;

  const onCompleteChange: any = (e: any, todo: any) => {
    axios.put(`${baseSite}/todo/complete/${todo._id}`)
      .then(todo => {
        // setStateChangeSuccess(true)
        getTodos()
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getTodos();
  }, [getTodos])

  const renderTodos = todos.map((todo: any) => {
    return (
      <IonItem style={completeStyle(todo)} key={todo._id} >
        <IonCheckbox checked={todo.isCompleted} onIonChange={(e: any) => onCompleteChange(e, todo)} slot="start" />
        <IonLabel>
          <h4>{todo.title}</h4>
          <IonNote>{todo.desc}</IonNote>
        </IonLabel>
        <IonBadge color="success" slot="end">
          {moment(todo.todoAt).format('dddd')} At {moment(todo.todoAt).format('h:mm:ss a')}
        </IonBadge>
      </IonItem>
    )
  })

  return (
    <>
      <IonList >
        {renderTodos}
      </IonList>
    </>
  )
}


export default TodoList; 