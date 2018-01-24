import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Profile from './components/Profile.js';


export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      searchVal:'',
      username:'',
      userAvatar:'',
      repos:'',
      loading:true
    }
    this.getUser = this.getUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <KeyboardAvoidingView behaviour="padding" style={styles.container}>
      <View >
        <Text>Type in a Github Username below to get their profile.</Text>
        <TextInput value={this.state.searchVal} onChangeText={searchVal => this.setState({searchVal})} style={{borderColor: 'gray', margin: 15,
      height: 40, borderWidth: 1}} ></TextInput>
        <TouchableOpacity onPress={this.handleSubmit} style={styles.submitButton}>
          <Text>Submit</Text>
        </TouchableOpacity>
      <Text>You want: {this.state.searchVal}</Text>
        {!this.state.loading && <Profile userAvatar={this.state.userAvatar} username={this.state.username} repos={this.state.repos}/>}
        {this.state.loading && <View><Text>Loading!</Text></View>}
      </View>
      </KeyboardAvoidingView>
    );
  }

  handleSubmit () {
    this.getUser(this.state.searchVal);
  }

  getUser (input) {
    return fetch(`https://api.github.com/users/${input}`)
    .then(resBuffer=>{
      return resBuffer.json();
    })
    .then((res)=>{
      this.setState({
        username:res.name,
        userAvatar:res.avatar_url,
        repos:res.public_repos,
        loading:false,
        searchVal:''
      })
    })
  }


}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    borderColor:'blue',
    borderWidth:0.5
  }
});
