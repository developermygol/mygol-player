import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { gColors } from '../../GlobalStyles';
import { inject, observer } from 'mobx-react';
import Ionicons from '../../node_modules/@expo/vector-icons/Ionicons';
import { getIconPrefix } from '../../components/Utils';
import PlayerDetails from './PlayerDetails';

export const headerNavigationOptions = ({ navigation, navigationOptions, screenProps }) => {
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
  };
};

@inject('store')
@observer
class Home extends Component {
  static navigationOptions = headerNavigationOptions;

  render() {
    return <PlayerDetails navigation={this.props.navigation} />;
  }
}

const style = StyleSheet.create({});

export default Home;
