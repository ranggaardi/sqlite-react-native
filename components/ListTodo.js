import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView,FlatList,TouchableOpacity } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("todoy.db");


export default class App extends React.Component {
    state = {
        todo : [] 
    }  

    static navigationOptions = {
        title: 'List Todo'
    }; 
    constructor(){
        super();
      db.transaction(tx => {
          tx.executeSql(
            'select * from todos',
            null,
            (_, { rows: { _array } }) => this.setState({ todo: _array })
          );
        });
    }


    render(){
        return (
            <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
            <SafeAreaView style={styles.container}>
            <FlatList
                 data={this.state.todo}
                 renderItem={({item}) =>{
                   return (
                     <TouchableOpacity key={item.id} style={{height:40}}>
                       <Text 
                       onPress={() => this.props.navigation.navigate('EditScreen',
                       {
                           id:item.id,
                           text : item.value,
                           done : item.done
                        }
                       )
                    }
                       style={{fontSize:20}}>{item.done} {item.value}</Text>
                     </TouchableOpacity>
                   );
                 }} 
                 keyExtractor={item => item.done}/>
     
        </SafeAreaView>
     
        <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => this.props.navigation.navigate('AddScreen')}
        />
      </View>
    
        );
    };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
