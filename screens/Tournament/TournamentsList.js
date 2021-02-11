import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Localize } from '../../components/locale/Loc';
import FontAwesome from '../../node_modules/@expo/vector-icons/FontAwesome';
import { inject } from '../../node_modules/mobx-react';
import { observer } from '../../node_modules/mobx-react/native';
import Spinner from '../../components/common/Spinner';
import SectionHead from '../../components/common/SectionHead';
import { getUploadsIcon, getIconPrefix } from '../../components/Utils';
import Ionicons from '../../node_modules/@expo/vector-icons/Ionicons';
import { headerNavigationOptions } from '../Home/Home';
import GlobalStyles, { gColors } from '../../GlobalStyles';

class TournamentListItem extends Component {
  render() {
    const { item, onPressItem } = this.props;
    return (
      <TouchableOpacity onPress={() => onPressItem(item.id)}>
        <View style={style.Item}>
          <Image
            source={{ uri: getUploadsIcon(item.logoImgUrl, item.id, 'tournament') }}
            style={style.ItemIcon}
          />
          <Text style={style.ItemText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

@inject('store')
@observer
class TournamentsList extends Component {
  //static navigationOptions = headerNavigationOptions;

  static navigationOptions = p => {
    const headerOpts = headerNavigationOptions(p);
    return {
      ...headerOpts,
      title: Localize('Tournaments'),
    };
  };

  componentDidMount = () => {
    this.updateList();
  };

  updateList = () => {
    this.props.store.tournaments.actions.getAll();
  };

  handlePress = (idTournament, name) => {
    this.props.navigation.navigate('TournamentDetails', { idTournament, name });
  };

  render() {
    const p = this.props;
    const store = this.props.store.tournaments;
    const data = store.all;

    // TODO: Filter tournaments of the current season

    return (
      <Spinner data={data}>
        <View style={GlobalStyles.MainView}>
          {/* <SectionHead title={Localize('Tournaments')} /> */}
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TournamentListItem item={item} onPressItem={() => this.handlePress(item.id, item.name)} />
            )}
            keyExtractor={(item, i) => item.id.toString()}
          />
        </View>
      </Spinner>
    );
  }
}

const style = StyleSheet.create({
  View: {
    flex: 1,
  },
  Item: {
    marginHorizontal: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  ItemIcon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    marginRight: 20,
  },
  ItemText: {
    color: gColors.text1,
    fontWeight: '600',
  },
});

export default TournamentsList;
