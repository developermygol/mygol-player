import React from 'react';
import { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import t from 'tcomb-form-native';
import { cloneDeep } from 'lodash/lang';

export const gColors = {
  background: '#edeef2',
  text1: '#394d68',
  text2: '#99a3af',

  intense: '#010913',
  minorError: '#C00',
  severeError: '#F00',

  white: '#FFFFFF',
  red: 'red',
  green: 'green',

  headText1: '#FFFFFF',
  headText2: '#e1e4e9',

  gamesPlayed: '#555',
  gamesWon: '#4DAEA1',
  gamesDraw: '#F9CC14',
  gamesLost: '#DF6D52',
  cardsType1: '#F9CC14',
  cardsType2: '#DF6D52',

  headerBack: '#0e1f3d',
  headerTint: '#FFFFFF',

  touchableText: '#00183a',
  highLight: '#f01c35',
  logoBorder: '#999',
  logoBackground: '#FFF',

  infoboxBackground: '#e4e5ec',
  infoboxBorder: '#caccda',
  infoboxText: '#394d68',

  listSectionBackground: '#eee',
  listTitleBackground: '#ddd',

  buttonBackground: '#f01c35',
  buttonBorder: '#f01c35',
  buttonText: 'white',

  iconButtonBackground: '#e4e5ec',
  iconButtonBorder: '#caccda',
  iconButtonText: '#394d68',

  tabBarActive: '#394d68',
  tabBarInactive: '#888',

  loginBackground: '#303b32',
  loginText: 'white',
  loginError: '#B05CC5',

  tableHeaderBack: '#e4e5ec',
};

export const gMetrics = {
  screenPadding: 15,
};

export const GS = {
  font: {
    title1: {
      fontSize: 30,
      fontWeight: '900',
    },
    title2: {
      fontSize: 25,
      fontWeight: '600',
    },
    title3: {
      fontSize: 20,
      fontWeight: '400',
    },
    normal: {
      fontSize: 18,
      fontWeight: '400',
    },
    small: {
      fontSize: 16,
      color: gColors.text1,
    },
    smaller: {
      fontSize: 12,
    },

    headTitle1: {
      fontSize: 30,
      fontWeight: '800',
      color: gColors.headText1,
    },
    headNormal: {
      fontSize: 12,
      color: gColors.headText1,
    },
    touchable: {
      color: gColors.touchableText,
      fontWeight: '600',
    },
  },

  box: {
    card: {
      alignSelf: 'stretch',
      margin: 15,
      padding: 10,
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#e7eaef',
    },
  },

  tabBar: {
    tabBarText: {
      color: gColors.text1,
    },
    tabBar: {
      height: 10,
    },
    tabBarTab: {
      height: 10,
    },
    tabBarUnderline: {
      //backgroundColor: gColors.highLight
      height: 0,
    },
  },
};

export default gStyles = {
  MainViewCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: gColors.background,
  },

  MainView: {
    flex: 1,
    backgroundColor: gColors.background,
    padding: gMetrics.screenPadding,
  },

  ScreenImageBackground: {
    backgroundColor: gColors.loginBackground,
    height: '100%',
    width: '100%',
  },

  vcenter1: {
    flex: 1,
    justifyContent: 'center',
    //borderColor: 'red',
    //borderWidth: 1
  },
  vcenter2: {
    flex: 2,
    justifyContent: 'center',
    //borderColor: 'blue',
    //borderWidth: 1
  },
  NextButton: {
    flex: 1,
    marginBottom: 30,
    justifyContent: 'center',
  },

  ApparelNumberWrapper: {
    borderRadius: 15,
    width: 30,
    height: 30,
    backgroundColor: gColors.text2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ApparelNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
};

export const ScrollableTabViewProps = {
  tabBarActiveTextColor: gColors.touchableText,
  tabBarInactiveTextColor: gColors.text1,
  tabBarBackgroundColor: 'white',
  tabBarUnderlineStyle: GS.tabBar.tabBarUnderline,
  style: GS.tabBar.tabBar,
  renderTabBar: () => <ScrollableTabBar />,
};

export const LoginFormStyleSheet = cloneDeep(t.form.Form.stylesheet);

const loginTextboxNormal = {
  color: gColors.loginText,
  borderRadius: 40,
  height: 48,
  fontSize: 18,
  textAlign: 'center',
};

const loginTextboxError = {
  borderRadius: 40,
  borderWidth: 2,
  borderColor: gColors.loginText,
  height: 48,
  fontSize: 18,
  textAlign: 'center',
};

LoginFormStyleSheet.textbox.normal = {
  ...LoginFormStyleSheet.textbox.normal,
  ...loginTextboxNormal,
};
LoginFormStyleSheet.textbox.error = {
  ...LoginFormStyleSheet.textbox.error,
  ...loginTextboxError,
};
LoginFormStyleSheet.errorBlock.color = gColors.loginText;
LoginFormStyleSheet.errorBlock.textAlign = 'center';
