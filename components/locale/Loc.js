import { Component } from 'react';
import Translations from './Translations';

// import { DangerZone } from 'expo'; // Change for SDK version
// const { Localization } = DangerZone; // Change for SDK version
// https://docs.expo.io/versions/latest/sdk/localization/
import * as Localization from 'expo-localization';

const DefaultLanguage = 'es'; // Should match initial value set in Store
let globalLang = DefaultLanguage;
let langSet = false;

export function setLang(lang, component) {
  globalLang = lang;

  // Force app render
  if (component) component.forceUpdate();
}

export async function setDeviceLangAsync() {
  // const lang = await Localization.getCurrentLocaleAsync(); // Change for SDK version
  const lang = await Localization.getLocalizationAsync();
  if (lang && Translations[lang]) setLang(lang);

  langSet = true;
}

class Loc extends Component {
  render() {
    const key = this.props.children;
    return Localize(key, globalLang);
  }
}

export function LocalizeOrDefault(key) {
  const translated = Translations[globalLang][key];
  return translated === undefined ? key : translated;
}

export function Localize(key, lang) {
  //if (!langSet) console.log("2", key);
  if (!key) return '';

  if (!lang) lang = globalLang;
  const translated = Translations[lang][key];
  return translated === undefined ? '__' + key + '__' : translated;
}

export default Loc;
