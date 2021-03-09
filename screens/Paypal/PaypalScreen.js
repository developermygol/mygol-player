import React, { Component } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import WebView from 'react-native-webview';
import { inject } from '../../node_modules/mobx-react/native';

import config from '../../Config';
import { toast } from '../../components/Utils';

@inject('store')
class PaypalScreen extends Component {
  handlePayment = async data => {
    if (data.url.includes('success')) {
      const paymentId = data.url.split('success')[1].split('/')[1];
      // 🚧 Adapt information and continue to enrollmentstep
      const st = this.props.store.players;
      const result = await st.saveEnrollmentStep21({ id: paymentId });

      if (result) this.props.navigation.navigate('Congrats');
      else toast.error(st.error);
    }
    // console.log(data);
  };

  render() {
    const amount = this.props.navigation.getParam('amount').toFixed(2);

    return (
      <View style={styles.View}>
        <WebView
          source={{ uri: `${config.reactAppDirectoryPublicWebUrl}/paypal/${amount}` }}
          onNavigationStateChange={data => this.handlePayment(data)}
          javaScriptCanOpenWindowsAutomatically={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    flex: 1,
  },
});

export default PaypalScreen;
