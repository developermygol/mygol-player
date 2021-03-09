import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Button from '../../components/common/Button';
import Loc, { Localize } from '../../components/locale/Loc';
import { gColors } from '../../GlobalStyles';
import { acceptMatchPlayerNotice } from '../../store-redux/actions/notice';

const MatchNoticeDetail = ({ navigation }) => {
  const matchPlayerNotice = navigation.getParam('notice');
  const { notice, idMatch, idPlayer } = matchPlayerNotice;
  const {
    name,
    text,
    confirmationText1,
    confirmationText2,
    confirmationText3,
    acceptText,
    idTournament,
  } = notice;

  const hasConfirm1 = confirmationText1.length > 0;
  const hasConfirm2 = confirmationText2.length > 0;
  const hasConfirm3 = confirmationText3.length > 0;

  const [confirm1, setConfirm1] = useState(hasConfirm1 ? false : true);
  const [confirm2, setConfirm2] = useState(hasConfirm2 ? false : true);
  const [confirm3, setConfirm3] = useState(hasConfirm3 ? false : true);

  const [valid, setValid] = useState(confirm1 && confirm2 && confirm3);

  const goBack = () => {
    navigation.goBack();
  };

  const handleConfirm = async () => {
    if (validate()) {
      const result = await acceptMatchPlayerNotice(matchPlayerNotice);
      navigation.navigate('PlayerCalendar', { idTournament, idPlayer });
    }
  };

  const onChangeCheck = number => {
    let checks = [confirm1, confirm2, confirm3];
    if (number == 1) {
      setConfirm1(!confirm1);
      checks[0] = !confirm1;
    }
    if (number == 2) {
      setConfirm2(!confirm2);
      checks[1] = !confirm2;
    }
    if (number == 3) {
      setConfirm3(!confirm3);
      checks[2] = !confirm3;
    }
    if (checks[0] && checks[1] && checks[2]) setValid(true);
    else setValid(false);
  };

  const validate = () => {
    if (confirm1 && confirm2 && confirm3) {
      setValid(true);
      return true;
    }
    Alert.alert(Localize('Notices.Alert.Title'), Localize('Notices.Alert.Message'));
    return false;
  };

  return (
    <View style={styles.ScreenView}>
      <Text style={styles.Title}>{name}</Text>
      <Text>{text}</Text>

      {hasConfirm1 && (
        <View style={styles.ConfirmView}>
          <CheckBox
            tintColors={{ true: gColors.buttonBorder, false: gColors.buttonBorder }}
            tintColor={gColors.buttonBorder}
            onFillColor={gColors.buttonBorder}
            onTintColor={gColors.buttonBorder}
            value={confirm1}
            onValueChange={() => onChangeCheck(1)}
            // style={styles.checkbox}
            // disabled={false}
          />
          <Text>{confirmationText1}</Text>
        </View>
      )}
      {hasConfirm2 && (
        <View style={styles.ConfirmView}>
          <CheckBox
            tintColors={{ true: gColors.buttonBorder, false: gColors.buttonBorder }}
            tintColor={gColors.buttonBorder}
            onFillColor={gColors.buttonBorder}
            onTintColor={gColors.buttonBorder}
            value={confirm2}
            onValueChange={() => onChangeCheck(2)}
          />
          <Text>{confirmationText2}</Text>
        </View>
      )}
      {hasConfirm3 && (
        <View style={styles.ConfirmView}>
          <CheckBox
            tintColors={{ true: gColors.buttonBorder, false: gColors.buttonBorder }}
            tintColor={gColors.buttonBorder}
            onFillColor={gColors.buttonBorder}
            onTintColor={gColors.buttonBorder}
            value={confirm3}
            onValueChange={() => onChangeCheck(3)}
          />
          <Text>{confirmationText3}</Text>
        </View>
      )}

      {acceptText.length > 0 ? (
        <Button
          style={styles.ButtonView}
          name={acceptText}
          onPress={handleConfirm}
          bgColor={valid ? gColors.buttonBorder : gColors.logoBorder}
          borderColor={valid ? gColors.buttonBorder : gColors.logoBorder}
          color={gColors.white}
        />
      ) : (
        <Button
          style={styles.ButtonView}
          title={Localize('Notices.Confirm.Button.Default')}
          onPress={handleConfirm}
          bgColor={valid ? gColors.buttonBorder : gColors.logoBorder}
          borderColor={valid ? gColors.buttonBorder : gColors.logoBorder}
          color={gColors.white}
        />
      )}
      <Button
        style={styles.ButtonView}
        title={Localize('Back')}
        onPress={goBack}
        bgColor={gColors.background}
        borderColor={gColors.buttonBorder}
        color={gColors.buttonBackground}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenView: {
    flex: 1,
    backgroundColor: gColors.background,
    padding: 20,
  },
  Title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 40,
    marginBottom: 20,
  },
  ConfirmView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  ButtonView: {
    marginVertical: 10,
  },
});

// 🔎 specific navigation Configuration
MatchNoticeDetail.navigationOptions = navData => ({
  header: null,
});

export default MatchNoticeDetail;
