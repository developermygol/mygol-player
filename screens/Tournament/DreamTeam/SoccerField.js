import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { getUploadsIcon } from '../../../components/Utils';
import { gColors } from '../../../GlobalStyles';

const SoccerField = ({ image, positions, players, layout }) => {
  const rescaledPositions = pos => {
    // 🚧💥 Needs better imp.
    const originalHeight = 658;
    const originalWidth = 455;

    const scaleX = (layout.width * 100) / originalWidth;
    const scaleY = (layout.height * 100) / originalHeight;
    const trimX = originalWidth - layout.width;
    const trimY = originalWidth - layout.height;
    return {
      trimX,
      trimY,
      posX: pos.x * scaleY + trimY,
      posY: pos.y * scaleX + trimX * 1.5,
    };
  };

  const getPoints = () => {
    if (!positions) return null;

    return positions.map((pos, i) => {
      const player = players.find(p => p.idTacticPosition === i);
      const { trimX, trimY, posX, posY } = rescaledPositions(pos);

      const { x, y } = pos;
      return (
        <View
          key={i}
          style={{
            ...styles.TacticPlayer,
            position: 'absolute',
            bottom: posX / 11 + '%',
            left: posY / 12 + '%',
          }}
        >
          <View style={styles.ImageWrapper}>
            {player && (
              <Image
                source={{ uri: getUploadsIcon(player.avatarImgUrl, player.idPlayer, 'user') }}
                style={styles.Avatar}
              />
            )}
          </View>
        </View>
      );
    });
  };

  if (!layout) return null;

  return (
    <ImageBackground source={image} resizeMode="contain" style={styles.Image}>
      {getPoints()}
    </ImageBackground>
  );
};

const styles = {
  Image: {
    height: 250,
  },
  TacticPlayer: {
    width: 50,
    height: 50,
    backgroundColor: '#fa002c',
    borderRadius: 50,
    transform: [{ rotateX: '-45deg' }, { scaleY: 1.179 }],
    boxShadow: '0px 40px 60px rgba(0, 0, 0, 0.2)',
  },
  ImageWrapper: {
    alignSelf: 'center',
    borderRadius: 50,
    borderColor: gColors.red,
    backgroundColor: gColors.white,
    overflow: 'hidden',
    marginBottom: 5,
    borderWidth: 2,
  },
  Avatar: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
};

export default SoccerField;
