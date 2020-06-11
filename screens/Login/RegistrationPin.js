import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text, StyleSheet, AsyncStorage, StatusBar, ImageBackground } from 'react-native';
import GlobalStyles, { gColors, LoginFormStyleSheet } from '../../GlobalStyles';
import { Localize } from '../../components/locale/Loc';
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react/native';
import { toast } from '../../components/Utils';
import t from 'tcomb-form-native';
import SpinnerButton from '../../components/common/SpinnerButton';
import Background from '../../assets/backgrounds/1.jpg';

var { Form } = t.form;

@inject('ui') @observer
class RegistrationPin extends Component {
    
    static navigationOptions = {
        header: null
    }

    @observable loading = false;
    @observable data = null;

    componentDidMount = () => {
        const input = this.form.getComponent('pin').refs.input;
        input.focus();
    }


    LoginForm = t.struct({
        pin: t.String
    });

    FormOptions = {
        fields: {
            pin: {
                label: ' ', // Localize('LoginPassword'), 
                error: Localize('LoginPin.Validation'),
                keyboardType: 'numeric', 
                secureTextEntry: true,
                stylesheet: LoginFormStyleSheet
            }
        }
    }


    handleSubmit = async () => {
        const data = this.form.getValue();
        if (!data) {
            toast.error(Localize('Error.ValidationFailed'));
            return;
        } 

        try {
            //await AsyncStorage.setItem('auth.email', data.email);
            const email = await AsyncStorage.getItem('auth.email');
            if (!email) {
                toast.error(Localize('Error.EmailNotSet'));
                return;
            }

            const deviceToken = await AsyncStorage.getItem('push.token');
            const sendData = { email: email, enrollPin: data.pin, deviceToken };
            const result = await this.props.ui.auth.loginPin(sendData);

            const nav = this.props.navigation;
            //const reset = StackActions.reset({ index: 0, key: null, actions: [ NavigationActions.navigate({routeName: 'Home', params: { idUser: result.id }}) ] })
            nav.navigate('PlayerTeamChooser', { idUser: result.id });
        }
        catch (e) {
            toast.error(Localize("Login incorrect"));
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' >
                <StatusBar barStyle='light-content' />
                <ImageBackground source={Background} style={[GlobalStyles.ScreenImageBackground, style.View]}>
                    <Text style={style.IntroTitle}>{Localize('PinTitle')}</Text>
                    <Text style={style.IntroText}>{Localize('PinIntro')}</Text>
                    <Form
                        ref={c => this.form = c}
                        type={this.LoginForm}
                        options={this.FormOptions}
                        value={this.data}
                        onChange={raw => { this.data = raw; }}
                    />
                    {/* {error ? <ErrorMsg msg={error} /> : null} */}
                    <SpinnerButton title='Next' onPress={this.handleSubmit} style={style.Button} loading={this.props.ui.auth.loading} />
                </ImageBackground>
            </KeyboardAvoidingView>
        )
    }
}

const style = StyleSheet.create({
    View: {
        //flex: 1, 
        //backgroundColor: gColors.background,
        //alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: 20,
    },
    IntroTitle: {
        margin: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: gColors.loginText
    },
    IntroText: {
        margin: 10,
        textAlign: 'center',
        color: gColors.loginText
    },
    Button: {
        flex: 1,
        marginBottom: 30,
        justifyContent: 'center'
    }

});

export default RegistrationPin;