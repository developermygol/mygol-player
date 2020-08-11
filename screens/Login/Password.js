import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Keyboard,
  Animated,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  ImageBackground,
} from 'react-native';
import Button from '../../components/common/Button';
import { StackActions, NavigationActions } from 'react-navigation';
import GlobalStyles, { gColors, LoginFormStyleSheet } from '../../GlobalStyles';
import { Localize } from '../../components/locale/Loc';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react/native';
import { toast } from '../../components/Utils';
import t from 'tcomb-form-native';
import SpinnerButton from '../../components/common/SpinnerButton';
import Background from '../../assets/backgrounds/1.jpg';

var { Form } = t.form;

@inject('ui')
@observer
class Password extends Component {
  static navigationOptions = {
    //title: Localize('Password'),
    header: null,
  };

  @observable loading = false;
  @observable data = null;

  componentDidMount = () => {
    const input = this.form.getComponent('password').refs.input;
    input.focus();
  };

  LoginForm = t.struct({
    password: t.String,
  });

  FormOptions = {
    fields: {
      password: {
        label: ' ', // Localize('LoginPassword'),
        error: Localize('LoginPassword.Validation'),
        keyboardType: 'default',
        secureTextEntry: true,
        stylesheet: LoginFormStyleSheet,
      },
    },
  };

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
      const sendData = { email: email, password: data.password, deviceToken };
      const result = await this.props.ui.auth.login(sendData);

      const nav = this.props.navigation;
      //const reset = StackActions.reset({ index: 0, key: null, actions: [ NavigationActions.navigate({routeName: 'Home', params: { idUser: result.id }}) ] })
      nav.navigate('PlayerTeamChooser', { idUser: result.id });
    } catch (e) {
      toast.error(Localize('Login incorrect'));
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <ImageBackground source={Background} style={[GlobalStyles.ScreenImageBackground, style.View]}>
          <Text style={style.IntroTitle}>{Localize('PasswordTitle')}</Text>
          <Text style={style.IntroText}>{Localize('PasswordIntro')}</Text>

          <Form
            ref={c => (this.form = c)}
            type={this.LoginForm}
            options={this.FormOptions}
            //value={{password: '123456789'}}       // TODO: remove
            value={this.data}
            onChange={raw => {
              this.data = raw;
            }}
          />
          <SpinnerButton
            title="Next"
            onPress={this.handleSubmit}
            style={style.Button}
            loading={this.props.ui.auth.loading}
          />
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const style = StyleSheet.create({
  View: {
    //backgroundColor: gColors.background,
    //alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 70,
  },
  IntroTitle: {
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: gColors.loginText,
  },
  IntroText: {
    margin: 10,
    textAlign: 'center',
    color: gColors.loginText,
  },
  Button: {
    flex: 1,
    marginBottom: 30,
    justifyContent: 'center',
  },
});

export default Password;
