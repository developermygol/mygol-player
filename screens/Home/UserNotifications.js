import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';

import { gColors } from '../../GlobalStyles';
import { getFormattedDateTime } from '../../components/Utils';

const NotificationItem = ({ data, onPress }) => {
  const { id, timeStamp, text2: title, text3: about, status } = data;
  const READSTATUS = 5;
  const isNotificationReaded = READSTATUS === status;

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(id, status)}>
      <Text style={styles.date}>{getFormattedDateTime(timeStamp)}</Text>
      {about && <Text style={isNotificationReaded ? styles.readTitle : styles.nonReadTitle}>{about}</Text>}
      <Text style={isNotificationReaded ? styles.readTitle : styles.nonReadTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

@inject('store')
@observer
class UserNotifications extends Component {
  constructor(props) {
    super(props);
  }

  handleOnPressItem = async (id, status) => {
    const isNonReadNotification = status === 4;

    if (isNonReadNotification) {
      const updatedNotifications = await this.props.store.notifications.setNotificationRead(id);
    }

    this.props.navigation.navigate('NotificationDetials', { notificationId: id });
  };

  render() {
    const DELETEDSTATUS = 6;
    const userNotifications = this.props.store.notifications.userNotifications.filter(
      n => n.status !== DELETEDSTATUS
    );
    const renderNotifications = ({ item }) => (
      <NotificationItem data={item} navigation={this.props.navigation} onPress={this.handleOnPressItem} />
    );

    return (
      <FlatList
        data={userNotifications}
        renderItem={renderNotifications}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

UserNotifications.navigationOptions = {
  headerTitle: 'Notifications', // Traduction*
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: gColors.text2,
  },
  date: {
    fontSize: 14,
  },
  readTitle: {
    color: gColors.text2,
  },
  nonReadTitle: {
    color: gColors.text1,
  },
});

export default UserNotifications;
