import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import HTML from 'react-native-render-html';
import { inject, observer } from 'mobx-react';

import Ionicons from '../../node_modules/@expo/vector-icons/Ionicons';
import { gColors } from '../../GlobalStyles';
import { getIconPrefix } from '../../components/Utils';
import { getFormattedDateTime } from '../../components/Utils';
import Button from '../../components/common/Button';

@inject('store')
@observer
class NotificationDetail extends Component {
  constructor(props) {
    super(props);
    const currentNotificationId = this.props.navigation.getParam('notificationId');

    this.state = {
      isLoading: false,
      notification: this.props.store.notifications.userNotifications.find(
        n => n.id === currentNotificationId
      ),
    };
  }

  componentDidUpdate = () => {
    // debugger;
  };

  handleSpinner = () =>
    this.setState((state, props) => ({
      isLoading: !state.isLoading,
    }));

  handleDeleteNotification = async () => {
    const currentNotificationId = this.state.notification.id;
    this.handleSpinner();
    const updatedNotifications = await this.props.store.notifications.setNotificationDeleted(
      currentNotificationId
    );
    if (updatedNotifications) {
      this.props.navigation.goBack();
    }
    this.handleSpinner();
  }; // Change status to 6 Deleted

  handleOnPressMail = async () => {
    const currentNotificationId = this.state.notification.id;
    const currentNotificationStatus = this.state.notification.status;
    const isReadNotification = currentNotificationStatus === 5;
    const isNonReadNotification = currentNotificationStatus === 4;
    let updatedNotifications = null;
    if (isReadNotification) {
      updatedNotifications = await this.props.store.notifications.setNotificationUnRead(
        currentNotificationId
      );
    }
    if (isNonReadNotification) {
      updatedNotifications = await this.props.store.notifications.setNotificationRead(currentNotificationId);
    }
  }; // Toggle status 4/5 Unread/Read

  render() {
    const { status, timeStamp, text, text2: title, text3: about } = this.state.notification;
    const isReadNotification = status === 5;

    return (
      <ScrollView style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon} onPress={this.handleOnPressMail}>
            <Ionicons
              name={`${getIconPrefix()}${isReadNotification ? 'mail-open' : 'mail'}`}
              size={30}
              color={gColors.text2}
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
          <View style={styles.headerContext}>
            <Text style={styles.date}>{getFormattedDateTime(timeStamp)}</Text>
            {about && <Text style={styles.title}>{about}</Text>}
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <HTML html={text} imagesMaxWidth={Dimensions.get('window').width} />
          {this.state.isLoading ? (
            <ActivityIndicator style={styles.spinner} size="large" />
          ) : (
            <Button title={'Notifications.Delete'} onPress={this.handleDeleteNotification} />
          )}
        </View>
      </ScrollView>
    );
  }
}

export default NotificationDetail;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: gColors.text2,
  },
  headerIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerContext: {
    flex: 4,
    marginLeft: 10,
  },
  date: {
    color: gColors.text2,
  },
  title: {
    color: gColors.text1,
  },
  body: {
    padding: 15,
  },
  button: {
    marginTop: 15,
    width: '100%',
  },
  spinner: {
    alignSelf: 'center',
  },
});
