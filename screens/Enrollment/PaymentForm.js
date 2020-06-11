import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import GlobalStyles, { gColors } from '../../GlobalStyles';
import t from 'tcomb-form-native';
import SpinnerButton from '../../components/common/SpinnerButton';
import { toast } from '../../components/Utils';
import Loc, { Localize } from '../../components/locale/Loc';
import { inject, observer } from '../../node_modules/mobx-react/native';
import { observable } from '../../node_modules/mobx';
import CreditCards from '../../assets/creditcards.png';

var { Form } = t.form;

function getMonths() {
  const result = {};
  const months = Localize('months');
  months.map((m, i) => (result[i] = m));

  return result;
}

const Months = t.enums(getMonths());

@inject('store')
@observer
class PaymentForm extends Component {
  @observable data = {
    cardName: null,
    cardNumber: null,
    cardExpiryMonth: null,
    cardExpiryYear: null,
    cardCcv: null,
  };

  static navigationOptions = {
    title: Localize('PaymentFormScreenTitle'),
  };

  componentDidMount = () => {
    const input = this.form.getComponent('cardName').refs.input;
    input.focus();
  };

  handleNextButton = async () => {
    const formData = this.form.getValue();
    if (!formData) {
      toast.error(Localize('Error.ValidationFailed'));
      return;
    }

    const st = this.props.store.players;
    const result = await st.saveEnrollmentStep21(formData);

    if (result) this.props.navigation.navigate('Congrats');
    else toast.error(st.error);
  };

  PaymentForm = t.struct({
    cardName: t.String,
    cardNumber: t.String,
    cardExpiryMonth: t.Integer,
    cardExpiryYear: t.Integer,
    cardCcv: t.String,
    address: t.maybe(t.String),
  });

  FormOptions = {
    fields: {
      cardName: { label: Localize('CardName'), autoCapitalize: 'words' },
      cardNumber: { label: Localize('CardNumber'), keyboardType: 'numeric' },
      cardExpiryMonth: {
        label: Localize('CardMonth'),
        nullOption: { value: '', text: Localize('SelectMonth') },
      },
      cardExpiryYear: { label: Localize('CardYear') },
      cardCcv: { label: Localize('CardCcv'), keyboardType: 'numeric' },
      address: { label: Localize('CardAddress') },
    },
  };

  render() {
    const p = this.props;
    const pls = this.props.store.players;

    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={style.ContainerView}>
          <View style={style.View}>
            <Text style={style.Intro}>
              <Loc>PaymentForm.Intro</Loc>
            </Text>
            <Image source={CreditCards} style={style.CreditCards} />
            <View style={style.Horizontal}>
              <Text style={style.Text}>{Localize('Amount to pay')}</Text>
              <Text style={style.Total}>
                {pls.getGrandTotal().toFixed(2)} {Localize('CurrencySymbol')}
              </Text>
            </View>
            <Form
              ref={c => (this.form = c)}
              type={this.PaymentForm}
              options={this.FormOptions}
              value={this.data}
              onChange={raw => {
                this.data = raw;
              }}
            />
            <SpinnerButton
              title="Next"
              onPress={this.handleNextButton}
              style={gStyles.NextButton}
              loading={pls.loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const style = StyleSheet.create({
  ContainerView: {
    paddingBottom: 60,
  },
  View: {
    padding: 20,
  },
  Intro: {
    marginBottom: 20,
    color: gColors.text1,
  },
  Horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  Text: {
    color: gColors.text1,
  },
  Total: {
    color: gColors.text1,
    fontSize: 40,
  },
  CreditCards: {
    resizeMode: 'contain',
    width: '80%',
    height: 60,
    alignSelf: 'center',
  },
});

export default PaymentForm;
