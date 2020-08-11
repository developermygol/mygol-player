import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration, Alert } from 'react-native';
import { Notifications } from 'expo';
import { inject, observer } from 'mobx-react';

import Ionicons from '../../node_modules/@expo/vector-icons/Ionicons';
import { gColors } from '../../GlobalStyles';
import { getIconPrefix } from '../../components/Utils';
import PlayerDetails from './PlayerDetails';
import { Localize } from '../../components/locale/Loc';
import { observable } from 'mobx';

const NoneReadedMailsIcon = ({ number }) => {
  return (
    <View style={styles.numberContainer}>
      <Text style={styles.number}>{number}</Text>
    </View>
  );
};

export const headerNavigationOptions = ({ navigation, navigationOptions, screenProps }) => {
  const UNREADSTATUS = 4;
  const isHomeScreen = navigation.state.routeName === 'Home';
  const userNotifications = navigation.getParam('userNotifications');
  const userNotificationsNumber = userNotifications
    ? userNotifications.filter(n => n.status === UNREADSTATUS).length
    : null;

  return {
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons
          name={getIconPrefix() + 'menu'}
          size={25}
          color={gColors.headerTint}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <>
        {isHomeScreen && (
          <TouchableOpacity onPress={() => navigation.navigate('UserNotifications')}>
            <Ionicons
              name={getIconPrefix() + 'mail'}
              size={25}
              color={gColors.headerTint}
              style={{ marginRight: 10 }}
            />
            {userNotificationsNumber > 0 ? <NoneReadedMailsIcon number={userNotificationsNumber} /> : null}
          </TouchableOpacity>
        )}
      </>
    ),
  };
};

@inject('store')
@observer
class Home extends Component {
  static navigationOptions = headerNavigationOptions;

  // @observable notifications = null;

  constructor(props) {
    super(props);
    // this.loadData();
  }

  // loadData = async () => {
  //   const p = this.props;
  //   const userNotifications = await p.store.notifications.getUserNotifications();
  //   this.props.navigation.setParams({ userNotifications });
  // };

  async componentDidMount() {
    const { navigation, store } = this.props;
    let currentUserNotifications = store.notifications.userNotifications;

    // First render*
    if (!currentUserNotifications) {
      currentUserNotifications = await store.notifications.getUserNotifications();
      this.props.navigation.setParams({ userNotifications: currentUserNotifications });
    }

    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.navigation.setParams({ userNotifications: store.notifications.userNotifications });
    });

    Notifications.addListener(this._handleNotification);
  }

  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
  }

  _handleNotification = async notification => {
    const currentUserNotifications = await this.props.store.notifications.getUserNotifications();
    this.props.navigation.setParams({ userNotifications: currentUserNotifications });
    Vibration.vibrate();
    Alert.alert(Localize('Notifications.AlertTitle'), Localize('Notifications.AlertText'));
  };

  render() {
    return <PlayerDetails navigation={this.props.navigation} />;
  }
}

const styles = StyleSheet.create({
  numberContainer: {
    padding: 0,
    marginTop: -25,
    marginLeft: 10,
    width: '50%',
    maxWidth: '75%',
    backgroundColor: gColors.red,
    borderRadius: 100,
  },
  number: {
    color: '#FFF',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 10,
  },
});

export default Home;
