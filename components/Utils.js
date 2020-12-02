import { Localize, LocalizeOrDefault } from './locale/Loc';
import { flow } from 'mobx';
import { Alert, Share } from 'react-native';
import config from '../Config';
import { Platform } from 'react-native';
// import { takeSnapshotAsync } from 'expo'; // Change for SDK version
// https://docs.expo.io/versions/v35.0.0/sdk/take-snapshot-async/
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot';
import dateFormat from 'dateformat';

// Replace later with the real implementation
export class toast {
  static success(msg) {
    //console.log('TOAST: Success ' + msg);
  }

  static error(msg) {
    Alert.alert(Localize('Error'), msg, [{ text: 'Ok', onPress: () => {} }]);
  }

  static confirm(title, msg) {
    return new Promise((resolve, reject) => {
      Alert.alert(title, msg, [
        {
          text: Localize('No'),
          onPress: () => {
            resolve('No');
          },
          style: 'cancel',
        },
        {
          text: Localize('Yes'),
          onPress: () => {
            resolve('Yes');
          },
        },
      ]);
    });
  }
}

export const getAge = dateString => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age > 125) return null;

  return age;
};

// __ API requests ____________________________________________________________

export const getOpErrorText = error => {
  let msg = null;

  if (error.response) {
    // The request was made and the server returned an error
    const { status } = error.response;

    if (status >= 200 && status <= 400) msg = LocalizeOrDefault(error.response.data);
    else if (status > 400 && status < 500) msg = Localize('Error.404');
    else msg = Localize('Error.Generic');
  } else if (error.request) {
    // Request is made but there is no response
    msg = Localize('Error.NoResponse');
  } else {
    // This is an error setting up the request
    msg = error.message;
  }

  return msg;
};

export const requestAsync = function (state, operation, okMessage, ...args) {
  return new Promise((resolve, reject) => {
    if (state) {
      state.loading = true;
      state.error = null;
    }

    //console.log(args[0]);
    // check connection here. If no connection, show a "no connection" warning in the headerBar and try
    // to get the content from the cache. If not there, return an error.

    operation(...args).then(
      res => {
        if (state) state.loading = false;
        if (okMessage) toast.success(Localize(okMessage));
        // Cache the content here.
        resolve(res.data);
      },
      err => {
        if (state) state.loading = false;
        const errorMsg = getOpErrorText(err);
        if (state) {
          state.error = errorMsg;
        }

        toast.error(errorMsg);

        //reject(errorMsg);
        resolve(null);
      }
    );
  });
};

export const silentRequestAsync = function (state, operation, okMessage, ...args) {
  return new Promise((resolve, reject) => {
    if (state) {
      state.loading = true;
      state.error = null;
    }

    // check connection here. If no connection, show a "no connection" warning in the headerBar and try
    // to get the content from the cache. If not there, return an error.

    operation(...args).then(
      res => {
        if (state) state.loading = false;
        if (okMessage) toast.success(Localize(okMessage));
        // Cache the content here.
        resolve(res.data);
      },
      err => {
        if (state) state.loading = false;
        const errorMsg = getOpErrorText(err);
        if (state) state.error = errorMsg;

        resolve(null);
      }
    );
  });
};

// __ Image urls ______________________________________________________________

const defIcons = {
  team: 10,
  tournament: 3,
  user: 8,
  org: 1,
};

export const getUploadsIcon = (imgSrc, idObject, type = 'team') => {
  if (imgSrc && imgSrc !== 'undefined') return getUploadUrl(imgSrc);

  if (typeof idObject === 'undefined') idObject = 0;
  const i = (idObject % defIcons[type]) + 1;
  return getStaticRoot() + '/' + type + '/default' + i + '.png';
};

export const getUploadUrl = repoPath => {
  if (repoPath.startsWith('http')) return repoPath;
  return getUploadRoot() + '/' + repoPath;
};

export const getStaticRoot = () => {
  return config.reactAppStaticUrl;
};

export const getUploadRoot = () => {
  return config.reactAppStaticUploadsUrl;
};

// __ Platform ________________________________________________________________

export const getIconPrefix = () => {
  if (Platform.OS === 'ios') return 'ios-';
  if (Platform.OS === 'android') return 'md-';

  return null;
};

export const getOutlineSuffix = focused => {
  if (Platform.OS === 'ios' && !focused) return '-outline';
  return '';
};

export const getClipEllipsis = () => {
  if (Platform.OS === 'ios') return 'clip';

  return 'tail';
};

// __ Date format _____________________________________________________________

function twoDigits(val) {
  if (val < 10) return '0' + val;

  return val;
}

export const getShortMatchDate = d => {
  if (!d) return '--';

  d = new Date(d);

  if (d.getFullYear() === 1) return null;

  // We use the UTC versions because the runtime VM in prodcution needs this.
  // In debug, the VM used is Chrome's, so this behaves different. See DYQ-204.
  // https://github.com/expo/expo/issues/782
  const day = d.getUTCDate();
  const month = d.getUTCMonth() + 1;
  const year = d.getUTCFullYear();

  const hours = d.getUTCHours();
  const minutes = d.getUTCMinutes();

  return twoDigits(day) + '.' + twoDigits(month) + ' ' + twoDigits(hours) + ':' + twoDigits(minutes);
};

// __ Awards __________________________________________________________________

const typeImages = {
  1: 'mvp.png',
  2: 'maxscorer.png',
  3: 'dreamteam.png',
};

export const getAwardUri = awardType => {
  return config.reactAppStaticUrl + '/awards/' + typeImages[awardType];
};

// __ Share & snapshots _______________________________________________________

export const getViewSnapshotAsBase64Async = async snapshotRef => {
  if (!snapshotRef) return null;

  const result = await takeSnapshotAsync(snapshotRef, {
    result: 'data-uri',
    quality: 1,
    format: 'png',
  });

  return result;
};

export const shareUriDialog = (uri, title, dialogTitle) => {
  if (!uri) return;

  Share.share(
    {
      type: 'image/png',
      url: uri,
      title: Localize(title),
    },
    {
      dialogTitle: Localize(dialogTitle),
    }
  );
};

// __ Date & Time _____________________________________________________________

export const getFormattedDate = date => {
  return dateFormat(date, Localize('shortDateFormat'));
};

export const getFormattedDateTime = dateTime => {
  return dateFormat(dateTime, Localize('dateTimeFormat'));
};

export const getFormattedTime = time => {
  return dateFormat(time, Localize('timeFormat'));
};

export const interpolateString = (str, ...args) => {
  let result = str;
  debugger;
  for (let i = 0; i < args.length; ++i) result = result.replace('{' + i + '}', args[i]);

  return result;
};

export const interpolateStringMultiple = (str, ...args) => {
  let result = str;
  for (let i = 0; i < args.length; ++i) result = result.replaceAll('{' + i + '}', args[i]);

  return result;
};
