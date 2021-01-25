import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { gColors } from '../../GlobalStyles';

const getApparelData = apparelConfig => {
  if (apparelConfig && JSON.parse(apparelConfig)) {
    const apparel = JSON.parse(apparelConfig);
    const shirtColor1 = apparel['color1'].value;
    const shirtColor2 = apparel['color15'].value;
    const pantsColor = apparel['color20'].value;
    return { shirtColor1, shirtColor2, pantsColor };
  }
  return null;
};

const ApparealDetail = ({ team }) => {
  const apparealData = getApparelData(team.apparelConfig);

  if (!apparealData) return null;

  return (
    <View style={styles.ApparelContainer}>
      <View style={styles.ApparelBox}>
        <View style={{ flex: 1, backgroundColor: apparealData.shirtColor1 }}>
          <Text></Text>
        </View>
        <View style={{ flex: 1, backgroundColor: apparealData.shirtColor2 }}>
          <Text></Text>
        </View>
        <View style={{ flex: 1, backgroundColor: apparealData.shirtColor1 }}>
          <Text></Text>
        </View>
        <View style={{ flex: 1, backgroundColor: apparealData.shirtColor2 }}>
          <Text></Text>
        </View>
      </View>
      <View style={{ ...styles.ApparelBox, backgroundColor: apparealData.pantsColor }}>
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ApparelContainer: {
    width: '65%',
    marginTop: 10,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: gColors.iconButtonBorder,
  },
  ApparelBox: {
    height: 10,
    flexDirection: 'row',
  },
});

export default ApparealDetail;
