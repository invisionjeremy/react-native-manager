import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text)
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text)
    }

    onButtonPress() {
        const { email, password } = this.props

        this.props.loginUser({ email, password })
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                    Login
            </Button>
        );
    }

    render() {
        const { email, error, password } = this.props
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={email}
                        keyboardType="email"
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={password}
                        keyboardType="password"
                    />
                </CardSection>

                {error ? <Text style={styles.errorTextStyle}>{error}</Text> : null}
        
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
    };
};

export default connect(mapStateToProps, {
     emailChanged, passwordChanged, loginUser 
    }) (LoginForm);