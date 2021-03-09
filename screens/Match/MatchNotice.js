import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Loc from '../../components/locale/Loc';
import { gColors } from '../../GlobalStyles';

const MatchNotice = ({ match, idPlayer, navigation }) => {
  const getRelevantMatchPlayerNotices = () =>
    match.playersNotices.filter(pNotice => {
      if (
        pNotice.notice.enabled &&
        pNotice.idPlayer === idPlayer &&
        pNotice.idMatch === match.id &&
        pNotice.idDay === match.idDay &&
        pNotice.accepted === false
      ) {
        return true;
      }
      return false;
    });

  const handlePress = notice => {
    // Redirect to Notice view
    navigation.navigate('Notice', { notice });
  };

  const relevantMatchPlayerNotices = getRelevantMatchPlayerNotices();

  if (relevantMatchPlayerNotices.length === 0) return null;

  // 🔎 Player will have to accept one by one
  const currentPlayerNotice = relevantMatchPlayerNotices[0];
  //   console.log(currentPlayerNotice);

  return (
    <View style={styles.WarnView}>
      <TouchableOpacity onPress={() => handlePress(currentPlayerNotice)} activeOpacity={0.5}>
        <Text style={styles.WarnText}>
          <Loc>Notices.Warning</Loc>
        </Text>
        <Text style={styles.WarnText}>{currentPlayerNotice.notice.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  WarnView: {
    backgroundColor: gColors.red,
    padding: 15,
  },
  WarnText: {
    color: gColors.white,
    textAlign: 'center',
  },
});

export default MatchNotice;
