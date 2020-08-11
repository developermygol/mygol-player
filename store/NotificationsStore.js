import { observable, flow, action } from 'mobx';
import { requestAsync, toast } from '../components/Utils';
import axios from '../axios';

export default class NotificationsStore {
  @observable userNotifications = null;

  rootStore = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  getUserNotifications = flow(function* () {
    this.userNotifications = null;

    const result = yield requestAsync(this, axios.get, null, '/notifications');
    // console.log('result', result);
    this.userNotifications = result;

    return result;
  });

  setNotificationRead = flow(function* (id) {
    const currentNotifications = this.userNotifications;
    const result = yield requestAsync(this, axios.post, null, `/notifications/markread/${id}`);

    if (result) {
      const updatedNotifications = currentNotifications.map(notification => {
        if (notification.id === id) notification.status = 5;
        return notification;
      });
      this.userNotifications = updatedNotifications;
    }
    return result;
  });

  setNotificationUnRead = flow(function* (id) {
    const currentNotifications = this.userNotifications;
    const result = yield requestAsync(this, axios.post, null, `/notifications/markunread/${id}`);

    if (result) {
      const updatedNotifications = currentNotifications.map(notification => {
        if (notification.id === id) notification.status = 4;
        return notification;
      });
      this.userNotifications = updatedNotifications;
    }
    return result;
  });

  setNotificationDeleted = flow(function* (id) {
    const currentNotifications = this.userNotifications;
    const result = yield requestAsync(this, axios.post, null, `/notifications/markdeleted/${id}`);

    if (result) {
      const updatedNotifications = currentNotifications.map(notification => {
        if (notification.id === id) notification.status = 6;
        return notification;
      });
      this.userNotifications = updatedNotifications;
    }
    return result;
  });
}
