import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Linking } from 'react-native';
import { Localize, LocalizeIMultyple } from '../../components/locale/Loc';
import { headerNavigationOptions } from '../Home/Home';
import { termsText } from '../Enrollment/Terms';
import GlobalStyles from '../../GlobalStyles';
import { inject, observer } from '../../node_modules/mobx-react/native';
import config from '../../Config';

@inject('store')
@observer
class TermsAndConditions extends Component {
  static navigationOptions = p => {
    const headerOpts = headerNavigationOptions(p);
    return {
      ...headerOpts,
      title: Localize('TermsScreenTitle'),
    };
  };

  componentDidMount = () => {
    this.loadData();
  };

  loadData = () => {
    // Set org name
    const p = this.props;
    const org = p.store.organization.current;
    if (org) p.navigation.setParams({ title: org.name });
  };

  render() {
    const { dpCompanyName, dpCompanyId, dpCompanyAddress } = this.props.store.organization.current;
    const hasOrgTerms = dpCompanyName && dpCompanyId && dpCompanyAddress;

    if (!hasOrgTerms)
      return (
        <View style={style.Center}>
          <Text style={style.terms}>{termsText}</Text>
        </View>
      ); // 🔎💥

    return (
      <ScrollView style={GlobalStyles.MainView}>
        <StatusBar barStyle="light-content" />
        <View style={[style.View]}>
          <Text style={style.terms}>
            {LocalizeIMultyple('TermsText1', dpCompanyName, dpCompanyId, dpCompanyAddress)}
          </Text>
        </View>
        <Text
          style={style.Link}
          onPress={() => Linking.openURL(`${config.reactAppDirectoryPublicWebUrl}/privacy`)}
        >
          {Localize('TermsLinkText')}
        </Text>
        <View style={style.Center}>
          <Text style={style.Version}>v{Expo.Constants.manifest.version}</Text>
        </View>
        {/*Link to TermsLinkText*/}
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  View: {
    paddingBottom: 50,
  },
  Center: {
    margin: 30,
  },
  Version: {
    color: '#AAA',
    fontSize: 10,
    textAlign: 'center',
  },
  Link: {
    textAlign: 'center',
    margin: 30,
  },
});

export default TermsAndConditions;
