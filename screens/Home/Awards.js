import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionHead from '../../components/common/SectionHead';
import { Localize } from '../../components/locale/Loc';
import AwardSmall from './AwardSmall';
import { GS } from '../../GlobalStyles';

class Awards extends Component {
  render() {
    const p = this.props;
    const { awards } = p.data;
    const { currentIdTeam, currentIdTournament } = this.props;

    const hasAwards = awards && awards.length > 0;
    const relevantAwards = awards.filter(
      award =>
        award.idTeam === parseInt(currentIdTeam) && award.idTournament === parseInt(currentIdTournament)
    );

    // const awards = [
    //     { id: 19, name: 'Goleador TOP 5', date: new Date(), day: { id: 10, name: 'Jornada 3' }, type: 2 },
    //     { id: 20, name: 'MVP', date: new Date(), day: { id: 16, name: 'Jornada 6' }, type: 1 },
    // ];

    if (hasAwards && relevantAwards.length === 0) return null;

    return (
      <View style={{ alignSelf: 'stretch' }}>
        <SectionHead title={Localize('Awards')} />
        <View style={GS.box.card}>
          <View style={style.Awards}>
            {relevantAwards.map(award => {
              return <AwardSmall key={award.id} award={award} player={p.data} />;
            })}
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  Awards: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
  },
});

export default Awards;
