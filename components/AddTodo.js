import React, {Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput, 
  TouchableOpacity, 
  Picker 
} from 'react-native';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("todoy.db");

//2. Create
export default class App extends React.Component{

  state ={
    text : '',
    done : 'OnProgress',
    todo : [] //menampung hasil input
  }
  static navigationOptions = {
    title: 'Add Todo'
}; 
tambahTodo = () => {
  //alert(this.state.done);
  //alert(this.state.text);
  db.transaction(
    tx => { 
      tx.executeSql("insert into todos (done, value) values (?,?)", [this.state.done,this.state.text]);
    },
    error => {
      alert(error);  
    },
    () => {  
      this.setState({text:'',done:'OnProgress'})    
      //push load new screen
      this.props.navigation.push('ListScreen')     
    }
  );
  
  
}

  render(){
  return (
    <View style={styles.container}>
      <View style={styles.innerStyle}>
        <Text style={styles.textStyle} onPress={(this.halo)}>TodoApp</Text>
        <TextInput 
          value={this.state.text}
          onChangeText={(text) => this.setState({text})}
          style={styles.inputStyle}/>
        <Picker
          selectedValue={this.state.done}
          style={styles.inputStyle}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({done: itemValue})}>

          <Picker.Item label="onProgress" value="onProgress" />
          <Picker.Item label="Done" value="Done" />
        </Picker>
        <Button 
          onPress={this.tambahTodo}
          title='Simpan Todo'/>
      </View>

    </View>
  );}
}
//3.export

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  innerStyle :{
    margin : 40
  },
  textStyle : {
    fontSize:20
  },
  inputStyle : {
    height:40,
    borderColor:'blue',
    borderWidth:1,    
    marginBottom:20
  }
});
