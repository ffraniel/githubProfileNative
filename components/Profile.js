import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Text>{this.props.username}</Text>
                <Text>Public repos: {this.props.repos}</Text>
                <Image style={{width: 264, height: 232}} source={{uri:this.props.userAvatar}}/>
            </View>
        )
    }
}

