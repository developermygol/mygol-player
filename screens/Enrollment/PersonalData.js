import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import Loc, { Localize } from '../../components/locale/Loc';
import gStyles, { gColors } from '../../GlobalStyles';
import t from 'tcomb-form-native';
import SpinnerButton from '../../components/common/SpinnerButton';
import { toast, getFormattedDate } from '../../components/Utils';
import GlobalStyles from '../../GlobalStyles';
import { observable } from '../../node_modules/mobx';

var { Form } = t.form;
//Form.stylesheet.textbox.normal.color = gColors.text1;

@inject('store')
@observer
class PersonalData extends Component {
  @observable data = this.adaptStoreToForm();

  static navigationOptions = {
    title: Localize('PersonalDataScreenTitle'),
  };

  componentDidMount = () => {
    if (this.data && this.data.approved) {
      const input = this.form.getComponent('password').refs.input;
      input.focus();
      return;
    }

    const input = this.form.getComponent('name').refs.input;
    input.focus();
  };

  handleNextButton = async () => {
    const updatedPlayer = this.adaptFormToStore();
    const formData = this.form.getValue();
    if (!formData) {
      toast.error(Localize('Error.ValidationFailed'));
      return;
    }

    const st = this.props.store.players;
    const isEditing = this.props.navigation.getParam('edit');
    const result = await st.saveEnrollmentStep2(formData, updatedPlayer, isEditing);

    if (result) {
      if (isEditing) this.props.navigation.goBack();
      else this.props.navigation.navigate('MainPhoto');
    } else {
      toast.error(st.error);
    }
  };

  LoginForm = t.struct({
    name: t.String,
    surname: t.String,
    address1: t.String,
    address2: t.maybe(t.String),
    city: t.String,
    state: t.String,
    cp: t.String,
    country: t.String,
    idCardNumber: t.String,
    birthDate: t.Date,
    fieldPosition: t.enums(
      {
        0: Localize('FieldPosition0'),
        1: Localize('FieldPosition1'),
        2: Localize('FieldPosition2'),
        3: Localize('FieldPosition3'),
        4: Localize('FieldPosition4'),
        5: Localize('FieldPosition5'),
        6: Localize('FieldPosition6'),
        7: Localize('FieldPosition7'),
        10: Localize('FieldPosition10'),
        11: Localize('FieldPosition11'),
        12: Localize('FieldPosition12'),
      },
      'position'
    ),
    fieldSide: t.enums(
      {
        0: Localize('FieldSide0'),
        1: Localize('FieldSide1'),
        2: Localize('FieldSide2'),
        3: Localize('FieldSide3'),
      },
      'fieldSide'
    ),
    password: t.maybe(t.String),
  });

  LoginFormApproved = t.struct({
    password: t.maybe(t.String),
  });

  getForm = () => {
    return this.LoginForm;
  };

  getFormOptions = () => {
    const editable = !this.data.approved;

    return {
      fields: {
        name: {
          label: Localize('EnName'),
          error: Localize('EnName.Validation'),
          placeholder: Localize('EnName.PlaceHolder'),
          editable,
        },
        surname: {
          label: Localize('EnSurname'),
          error: Localize('EnSurname.Validation'),
          placeholder: Localize('EnSurname.PlaceHolder'),
          editable,
        },
        address1: {
          label: Localize('EnAddress1'),
          error: Localize('EnAddress1.Validation'),
          placeholder: Localize('EnAddress1.PlaceHolder'),
          editable,
        },
        address2: {
          label: Localize('EnAddress2'),
          error: Localize('EnAddress2.Validation'),
          placeholder: Localize('EnAddress2.PlaceHolder'),
          editable,
        },
        city: {
          label: Localize('EnCity'),
          error: Localize('EnCity.Validation'),
          placeholder: Localize('EnCity.PlaceHolder'),
          editable,
        },
        state: {
          label: Localize('EnState'),
          error: Localize('EnState.Validation'),
          placeholder: Localize('EnState.PlaceHolder'),
          editable,
        },
        cp: {
          label: Localize('EnCp'),
          error: Localize('EnCp.Validation'),
          placeholder: Localize('EnCp.PlaceHolder'),
          editable,
        },
        country: {
          label: Localize('EnCountry'),
          error: Localize('EnCountry.Validation'),
          placeholder: Localize('EnCountry.PlaceHolder'),
          editable,
        },
        idCardNumber: {
          label: Localize('EnIdCardNumber'),
          error: Localize('EnIdCardNumber.Validation'),
          placeholder: Localize('EnIdCardNumber.PlaceHolder'),
          editable,
        },
        birthDate: {
          label: Localize('EnBirthDate'),
          error: Localize('EnBirthDate.Validation'),
          placeholder: Localize('EnBirthDate.PlaceHolder'),
          mode: 'date',
          config: { format: getFormattedDate },
          editable,
        },
        fieldPosition: {
          label: Localize('EnPosition'),
          nullOption: false,
          // nullOption: { value: 0, text: Localize('FieldPosition0') },
          editable,
        },
        fieldSide: {
          label: Localize('EnFieldSide'),
          nullOption: false,
          editable,
        },
        password: {
          label: Localize('EnPassword'),
          error: Localize('EnPassword.Validation'),
          placeholder: Localize('EnPassword.PlaceHolder'),
          autoCapitalize: 'none',
        },
      },
    };
  };

  adaptStoreToForm = () => {
    const pl = this.props.store.players.owner;

    const date = new Date(pl.birthDate);
    if (date.getFullYear() === 1) date.setFullYear(1995);

    return {
      ...pl,
      birthDate: date,
      fieldPosition: pl.teamData.fieldPosition,
      fieldSide: pl.teamData.fieldSide,
    }; // => this.data
  };

  adaptFormToStore = () => {
    // Should this go on the store?
    const form = this.form.getValue(); // 💥
    if (!form) return null; // Validation error

    this.props.store.players.owner.teamData.fieldPosition = parseInt(form.fieldPosition);
    this.props.store.players.owner.teamData.fieldSide = parseInt(form.fieldSide);

    const result = { ...this.props.store.players.owner, ...form };
    if (form.password) result.userData.password = form.password;

    return result;
  };

  render() {
    const p = this.props;
    const store = p.store.players;
    const buttonCaption = p.navigation.getParam('edit') ? 'Save' : 'Next';

    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView style={GlobalStyles.MainView} contentContainerStyle={style.ContainerView}>
          <View style={style.View}>
            <Text style={style.Intro}>
              <Loc>{this.data.approved ? 'PersonalData.Intro.Approved' : 'PersonalData.Intro'}</Loc>
            </Text>
            <Form
              ref={c => (this.form = c)}
              type={this.getForm()}
              options={this.getFormOptions()}
              value={this.data}
              onChange={raw => {
                this.data = raw;
              }}
            />
            <SpinnerButton
              title={buttonCaption}
              onPress={this.handleNextButton}
              style={gStyles.NextButton}
              loading={store.loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const style = StyleSheet.create({
  ContainerView: {
    paddingBottom: 80,
  },
  View: {
    padding: 0,
  },
  Intro: {
    marginBottom: 20,
  },
});

export default PersonalData;
