import React, { Component } from 'react';
import { ActivityIndicator, Text, TextInput, View, Button, StyleSheet } from 'react-native';
import * as firebase from 'firebase';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };
    
    _login() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => { this.setState({ error: '', loading: false }); })
        .catch(() => {
            //Login was not successful, let's create a new account
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => { this.setState({ error: '', loading: false }); })
            .catch(() => {
                this.setState({ error: 'Authentication failed.', loading: false });
            });
        });
    }

    renderButtonOrSpinner() {
        if (this.state.loading) {
            return <ActivityIndicator size='small' />;    
        }
        return <Button onPress={this._login.bind(this)} title="Log in" />;
    }
    render() {
        return (
            <View>
                    <TitledInput 
                        label='Email Address'
                        placeholder='you@domain.com'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TitledInput 
                        label='Password'
                        autoCorrect={false}
                        placeholder='*******'
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                    <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                    {this.renderButtonOrSpinner()}
            </View>
        );
    }
}
const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label.toUpperCase()}</Text>
            <TextInput
            autoCorrect={false}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            style={inputStyle}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: '#262626',
        fontSize: 18,
        fontWeight: '200',
        flex: 1,
        height: 40
    },
    labelStyle: {
        fontSize: 12,
        color: '#7F7D7D',
        fontWeight: '200',
        flex: 1
    },
    containerStyle: {
        height: 60,
        flexDirection: 'column',
        width: '100%',
        borderColor: '#D4D4D4',
        borderBottomWidth: 1,
    },
    errorTextStyle: {
        color: '#E64A19',
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }
});
module.exports = LoginForm;