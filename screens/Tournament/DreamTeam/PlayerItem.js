import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Loc from '../../../components/locale/Loc';
import { getUploadsIcon } from '../../../components/Utils';
import { gColors } from '../../../GlobalStyles';

const PlayerItem = ({ item }) => {
  const { idPlayer, name, surname, teamName, fieldPosition, avatarImgUrl } = item;
  const imgSrc = getUploadsIcon(avatarImgUrl, idPlayer, 'user');
  return (
    <View style={styles.PlayerItem}>
      <View style={styles.ImageContainer}>
        <View style={styles.ImageWrapper}>
          <Image source={{ uri: imgSrc }} style={styles.Avatar} />
        </View>
      </View>
      <View style={styles.Details}>
        <Text>{`${name} ${surname}`} </Text>
        <Text>{teamName} </Text>
        <Text>
          <Loc>{`FieldPosition${fieldPosition}`}</Loc>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PlayerItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImageContainer: {
    width: 85,
  },
  ImageWrapper: {
    alignSelf: 'center',
    borderRadius: 50,
    borderColor: gColors.logoBorder,
    backgroundColor: gColors.logoBackground,
    overflow: 'hidden',
    marginBottom: 5,
    borderWidth: 2,
  },
  Avatar: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
  },
  Details: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default PlayerItem;
