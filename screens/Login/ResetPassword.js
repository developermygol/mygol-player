import React, { Component } from 'react';
import { ImageBackground, KeyboardAvoidingView, Text, View, StyleSheet, Alert } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import t from 'tcomb-form-native';

import SpinnerButton from '../../components/common/SpinnerButton';

import GlobalStyles, { gColors, LoginFormStyleSheet } from '../../GlobalStyles';
import { Localize } from '../../components/locale/Loc';
import Background from '../../assets/backgrounds/1.jpg';

const { Form } = t.form;

const ResetForm = t.struct({
  email: t.String,
});

const FormOptions = {
  fields: {
    email: {
      label: ' ', // Localize('LoginPassword'),
      //   error: Localize('LoginPassword.Validation'),
      keyboardType: 'email-address',
      stylesheet: LoginFormStyleSheet,
      placeholderTextColor: '#BBB',
      autoCapitalize: 'none',
    },
  },
};

@inject('ui')
@observer
class ResetPassword extends Component {
  state = {
    value: {},
    loading: false,
  };

  componentDidMount = () => {
    if (this.props.navigation.getParam('email')) {
      this.setState({ value: { email: this.props.navigation.getParam('email') } });
    }
  };

  handleSubmit = async () => {
    // TODO: users/resetpassword ...
    const { email } = this.refs.form.getValue();
    this.setState({ loading: true });
    await this.props.ui.auth.resetUserPassword(email);
    this.setState({ loading: false });
    Alert.alert(
      '',
      Localize('PasswordForgotSuccess'),
      [{ text: 'OK', onPress: () => this.props.navigation.navigate('Login') }],
      { cancelable: false }
    );
  };

  handleGoBack = () => {
    this.props.navigation.navigate('Login');
  };

  onChange(value) {
    this.setState({ value: { email: value } });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <ImageBackground source={Background} style={[GlobalStyles.ScreenImageBackground, styles.View]}>
          <Text style={styles.IntroTitle}>{Localize('PasswordForgotTitle')}</Text>
          <Text style={styles.IntroText}>{Localize('PasswordForgotIntro')}</Text>

          <Form
            ref="form"
            type={ResetForm}
            options={FormOptions}
            value={this.state.value}
            onChange={e => this.onChange(e)}
          />

          <SpinnerButton
            title="Next"
            onPress={this.handleSubmit}
            options={FormOptions}
            style={styles.Button}
            loading={this.state.loading}
          />
          <Text style={styles.BackText} onPress={this.handleGoBack}>
            {Localize('PasswordForgotBack')}
          </Text>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
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
  BackText: {
    margin: 10,
    textAlign: 'center',
    color: gColors.loginText,
    textDecorationLine: 'underline',
  },
  Button: {
    flex: 1,
    marginBottom: 30,
    justifyContent: 'center',
  },
});

export default ResetPassword;
