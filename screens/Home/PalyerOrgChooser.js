import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import { observer, inject } from 'mobx-react/native';

import FontAwesome from '../../node_modules/@expo/vector-icons/FontAwesome';
import { gColors, gMetrics, GS } from '../../GlobalStyles';
import { Localize } from '../../components/locale/Loc';

const LoginPasswordRequired = 1;
const LoginNoPasswordSet = 10;

const OrgListItem = ({ item, onPressItem, data }) => {
  return (
    <View style={styles.OrgItem}>
      <TouchableOpacity onPress={() => onPressItem(item, data)}>
        <View style={styles.Item}>
          <View style={styles.Column}>
            <Text style={styles.OrgName}>{item.name}</Text>
            <Text style={styles.OrgMotto}>{item.motto}</Text>
          </View>
          <View>
            <FontAwesome name="arrow-right" size={22} style={styles.ItemIcon} color={gColors.text1} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

@inject('ui')
@observer
class PalyerOrgChooser extends Component {
  handlePress = async (item, data) => {
    const { baseUrl } = item;
    const nav = this.props.navigation;
    const result = await this.props.ui.auth.basicLogin(data, baseUrl);

    if (!result) return;

    switch (result.action) {
      case LoginPasswordRequired:
        return nav.navigate('Password');
      case LoginNoPasswordSet:
        return nav.navigate('RegistrationPin');
    }
  };

  render() {
    const navigation = this.props.navigation;
    const organizations = navigation.getParam('organizations');
    const data = navigation.getParam('data');

    return (
      <View style={styles.View}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.Title}>{Localize('Organizations')}</Text>
        <Text style={styles.IntroText}>{Localize('Organizations.Hint')}</Text>
        <FlatList
          data={organizations}
          renderItem={({ item }) => (
            <OrgListItem item={item} data={data} onPressItem={() => this.handlePress(item, data)} />
          )}
          keyExtractor={(item, i) => uuid.v4()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    backgroundColor: gColors.background,
    padding: gMetrics.screenPadding,
    flex: 1,
  },
  Title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  IntroText: {
    fontSize: 13,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  Item: {
    flexDirection: 'row',
  },
  OrgItem: {
    marginVertical: 5,
    borderBottomWidth: 3,
    color: gColors.text1,
  },
  ItemIcon: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    marginTop: 5,
    textAlign: 'right',
  },
  OrgName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: gColors.text1,
  },
  OrgMotto: {
    color: gColors.text2,
    fontSize: 15,
    marginBottom: 3,
  },
  Column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 75,
  },
});

export default PalyerOrgChooser;
