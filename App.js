import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import ListTodo from './components/ListTodo';

import * as SQLite from 'expo-sqlite';


//2. Buat Navigator
const AppNavigator = createStackNavigator(
  {
  AddScreen: {
    screen: AddTodo,
  },
  EditScreen: {
    screen: EditTodo,
  },
  ListScreen: {
   screen: ListTodo,
 }
 },{
  initialRouteName : 'ListScreen',
  defaultNavigationOptions: {
     headerStyle: {
       backgroundColor: '#f4511e',
     },
     headerTintColor: '#fff',
     headerTitleStyle: {
       fontWeight: 'bold',
     },
   }
  
 }); 

//3. Create App Container
const AppContainer = createAppContainer(AppNavigator);
const db = SQLite.openDatabase("todoy.db"); 

export default class App extends React.Component {
  constructor() {
    super()
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists todos (id integer primary key not null, done text, value text);"
      );
    });
  }

  render(){
    return (
      <AppContainer />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
