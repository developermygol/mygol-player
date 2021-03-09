import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { inject, observer } from '../../node_modules/mobx-react/native';
import { Localize } from '../../components/locale/Loc';
import SpinnerButton from '../../components/common/SpinnerButton';
import GlobalStyles, { gColors } from '../../GlobalStyles';
import { getPaymentGetawayType } from '../../store-redux/actions/paypal';

class PaidOptionSummaryItem extends Component {
  render() {
    const p = this.props;
    const { step } = p;
    const option = step.selectedOption;

    return (
      <View style={style.Option}>
        <Text style={style.StepTitle}>{step.title}</Text>
        <Text style={style.OptionTitle}>
          {option.title}:{' '}
          <Text style={style.Price}>
            {option.price.toFixed(2)} {Localize('CurrencySymbol')}
          </Text>
        </Text>
      </View>
    );
  }
}

@inject('store')
@observer
class PaidOptionsSummary extends Component {
  static navigationOptions = {
    title: Localize('PaymentSummary'),
  };

  componentDidMount = () => {};

  handleNext = async () => {
    const pls = this.props.store.players;
    const n = this.props.navigation;

    const stepData = {
      id: 20,
    };

    const res = await pls.saveEnrollmentStep20(stepData);
    if (!res) return;

    // If the for result is 0, skip payment form. Post directly step 21
    const amountBeforeFees = pls.getSelectedOptionsTotal();
    if (amountBeforeFees === 0.0) {
      const result = await pls.saveEnrollmentStep21();
      if (result) this.props.navigation.navigate('Congrats');
      else toast.error(st.error);
      return;
    }

    // 🔎 Check org => paymentGetawayType
    const { paymentGetawayType } = await getPaymentGetawayType();
    if (paymentGetawayType === 'paypal') n.navigate('PaypalScreen', { amount: pls.getGrandTotal() });
    else {
      // Otherwise, navigate to payment form.
      n.navigate('PaymentForm');
    }
  };

  render() {
    const p = this.props;
    const pls = p.store.players;
    const selOpts = pls.selectedPaymentOptions;

    const optionsTotal = pls.getSelectedOptionsTotal();
    const fees = pls.getFees(optionsTotal);

    return (
      <View style={GlobalStyles.MainView}>
        <Text style={style.Desc}>{Localize('PaymentOptionsSummaryDesc')}</Text>
        <View style={style.OptionsWrapper}>
          {selOpts.map(step => (
            <PaidOptionSummaryItem key={step.id} step={step} />
          ))}
          {fees ? (
            <PaidOptionSummaryItem
              step={{
                title: Localize('Fees.Title'),
                selectedOption: { title: Localize('Fees.Description'), price: fees },
              }}
            />
          ) : null}
        </View>

        <View style={style.Horizontal}>
          <Text style={style.TotalText}>{Localize('Total')}</Text>
          <Text style={style.Total}>
            {(optionsTotal + fees).toFixed(2)} {Localize('CurrencySymbol')}
          </Text>
        </View>
        <SpinnerButton
          loading={this.props.store.players.loading}
          onPress={this.handleNext}
          style={style.Button}
          title={'Next'}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  View: {},
  Desc: {
    marginVertical: 20,
    marginHorizontal: 10,
    textAlign: 'center',
    color: gColors.text1,
  },
  OptionsWrapper: {
    marginVertical: 20,
  },
  Option: {
    marginVertical: 14,
  },
  StepTitle: {
    color: gColors.text2,
  },
  OptionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: gColors.text1,
  },
  TotalText: {
    color: gColors.text1,
  },
  Total: {
    color: gColors.text1,
    fontSize: 40,
  },
  Button: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  Horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PaidOptionsSummary;
