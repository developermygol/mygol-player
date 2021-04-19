import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

import { Localize } from '../../components/locale/Loc';
import { gColors, gMetrics } from '../../GlobalStyles';

const OrgListItem = ({ item }) => {
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};

const PalyerOrgChooser = ({ navigation }) => {
  const handlePress = item => {
    /* 🚧🚧🚧 */
  };

  const organizations = navigation.getParam('organizations');
  console.log(organizations);

  return (
    <View style={styles.View}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.Title}>{Localize('Organizations')}</Text>
      <Text style={styles.IntroText}>{Localize('Organizations.Hint')}</Text>
      <FlatList
        data={organizations}
        renderItem={({ item }) => <OrgListItem item={item} onPressItem={() => handlePress(item)} />}
        keyExtractor={(item, i) => uuid.v4()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    backgroundColor: gColors.background,
    padding: gMetrics.screenPadding,
    flex: 1,
  },
  Title: {},
  IntroText: {
    marginTop: 30,

    marginBottom: 10,
  },
});

export default PalyerOrgChooser;
