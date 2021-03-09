import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { Provider } from 'mobx-react/native';
import Store from './store/Store';
import UiStore from './store/UiStore';
import RootNavigator from './Navigator';
// import { ScreenOrientation } from 'expo'; // SDK 34
import * as ScreenOrientation from 'expo-screen-orientation';

import { setDeviceLangAsync } from './components/locale/Loc';
import { setupPushNotifications } from './components/PushNotifications';
import PaypalScreen from './screens/Paypal/PaypalScreen';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  loadAsync = async () => {
    try {
      // Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT); // SDK 34
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      //await setDeviceLangAsync();
      await setupPushNotifications();
      await UiStore.auth.hydrate();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (!this.state.isReady)
      return (
        <AppLoading
          startAsync={this.loadAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );

    return (
      <Provider store={Store} ui={UiStore}>
        <RootNavigator />
      </Provider>
    );
  }
}
