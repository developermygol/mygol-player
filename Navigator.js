import React from 'react';
import { Platform } from 'react-native';
import {
  createDrawerNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { gColors } from './GlobalStyles';
import { Localize, setDeviceLangAsync, initLangAndWait } from './components/locale/Loc';

import News from './screens/Home/News';
import TournamentsList from './screens/Tournament/TournamentsList';

import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import Password from './screens/Login/Password';
import Welcome from './screens/Enrollment/Welcome';
import Terms from './screens/Enrollment/Terms';
import PersonalData from './screens/Enrollment/PersonalData';
import MainPhoto from './screens/Enrollment/MainPhoto';
import IdScan from './screens/Enrollment/IdScan';
import Congrats from './screens/Enrollment/Congrats';
import Classification from './screens/Tournament/Classification';

import First from './screens/First';
import Ficha from './screens/Player/Ficha';
import TermsAndConditions from './screens/Drawer/TermsAndConditions';
import Drawer from './components/Drawer';
import NewsDetails from './screens/Home/NewsDetails';
import Rankings from './screens/Tournament/Rankings';
import TeamDetails from './screens/Team/TeamDetails';
import MatchDetails from './screens/Match/MatchDetails';
import FieldDetails from './screens/Field/FieldDetails';
import AwardDetails from './screens/Awards/AwardDetails';
import PlayerDetails from './screens/Home/PlayerDetails';
import PlayerCalendar from './screens/Calendar/PlayerCalendar';
import TournamentCalendar from './screens/Calendar/TournamentCalendar';
import DrawerFicha from './screens/Player/DrawerFicha';
import Configuration from './screens/Drawer/Configuration';
import PlayerTeamChooser from './screens/Home/PlayerTeamChooser';
import PaidOptionStep from './screens/Enrollment/PaidOptionStep';
import SocialData from './screens/Enrollment/SocialData';
import PaidOptionsSummary from './screens/Enrollment/PaidOptionsSummary';
import PaymentForm from './screens/Enrollment/PaymentForm';
import RegistrationPin from './screens/Login/RegistrationPin';
import ResetPassword from './screens/Login/ResetPassword';
import SanctionDetails from './screens/Sanctions/SanctionDetails';
import UserNotifications from './screens/Home/UserNotifications';
import NotificationDetials from './screens/Home/NotificationDetails';
import DreamTeam from './screens/Tournament/DreamTeam/DreamTeam';

setDeviceLangAsync();

const stackNavigatorOptions = ({ navigation }) => ({
  headerStyle: { backgroundColor: gColors.headerBack, borderBottomWidth: 0 },
  headerTintColor: gColors.headerTint,
  title: navigation.getParam('title', ''),
  gesturesEnabled: false,
  headerBackTitle: Localize('Back'),
});

const bottomTabCreator = createBottomTabNavigator;

const TournamentDetailsTabNavigator = bottomTabCreator(
  {
    Classification: Classification,
    TournamentCalendar: TournamentCalendar,
    Rankings: Rankings,
    DreamTeam: DreamTeam,
  },
  {
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: gColors.tabBarActive,
        inactiveTinitColor: gColors.tabBarInactive,
        style: { paddingTop: 7, paddingBottom: 7, height: 60 },
        labelStyle: { fontWeight: '600' },
      },
    },
  }
);

const TournamentsNavigator = createStackNavigator(
  {
    Home,
    TournamentsList,
    UserNotifications,
    NotificationDetials,
    PlayerDetails,
    TournamentDetails: TournamentDetailsTabNavigator,
    TeamDetails,
    MatchDetails,
    FieldDetails,
    AwardDetails,
    PlayerCalendar,
    PlayerClassification: Classification,
    Ficha,
    SanctionDetails,
    Rankings,
  },
  {
    navigationOptions: stackNavigatorOptions,
  }
);

const NewsNavigator = createStackNavigator(
  {
    News,
    NewsDetails,
  },
  {
    navigationOptions: stackNavigatorOptions,
  }
);

const TermsNavigator = createStackNavigator(
  {
    TermsAndConditions,
  },
  {
    navigationOptions: stackNavigatorOptions,
  }
);

const FichaNavigator = createStackNavigator(
  {
    FichaRoot: DrawerFicha,
  },
  {
    navigationOptions: stackNavigatorOptions,
  }
);

const ConfigurationNavigator = createStackNavigator(
  {
    Configuration: Configuration,
    Welcome: Welcome,
    TermsWithAccept: Terms,
    PersonalData: PersonalData,
    MainPhoto: MainPhoto,
    IdScan: IdScan,
    Congrats: Congrats,
    PaidOptionStep: PaidOptionStep,
    PaidOptionsSummary: PaidOptionsSummary,
    PaymentForm: PaymentForm,
    SocialData: SocialData,
  },
  {
    navigationOptions: stackNavigatorOptions,
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    DrawerHome: TournamentsNavigator,
    Tournaments: TournamentsNavigator,
    News: NewsNavigator,
    Ficha: FichaNavigator,
    Terms: TermsNavigator,
    Configuration: ConfigurationNavigator,
  },
  {
    contentComponent: Drawer,
  }
);

const LoginNavigator = createStackNavigator(
  {
    Login: Login,
    Password: Password,
    ResetPassword: ResetPassword,
    RegistrationPin: RegistrationPin,
    PlayerTeamChooser: PlayerTeamChooser,
  },
  {
    headerMode: 'none',
  }
);

const RootNavigator = createSwitchNavigator(
  {
    First: First,
    Auth: LoginNavigator,
    App: DrawerNavigator,
  },
  {
    initialRouteName: 'First',
  }
);

export default RootNavigator;
