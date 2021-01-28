import { Component } from 'react';
import { interpolateString, interpolateStringMultiple } from '../Utils';

// import { DangerZone } from 'expo'; // Change for SDK version
// const { Localization } = DangerZone; // Change for SDK version
// https://docs.expo.io/versions/latest/sdk/localization/
import Translations from './Translations';
import * as Localization from 'expo-localization';

const DefaultLanguage = 'es'; // Should match initial value set in Store
let globalLang = DefaultLanguage;
let langSet = false;

export function setLang(lang, component) {
  // 🚧🚧🚧 Not all langues implemented yet rever to default es
  switch (lang) {
    case 'es':
    case 'en':
      globalLang = lang;
      break;
    case 'ca_ES':
    case 'pt_PT':
    case 'fr':
    case 'ar':
      globalLang = 'es';
      break;
    default:
      globalLang = 'es';
  }

  // globalLang = lang;  // Uncomment when all languages are available.

  // Force app render
  if (component) component.forceUpdate();
}

export async function setDeviceLangAsync() {
  // const lang = await Localization.getCurrentLocaleAsync(); // Change for SDK version
  // const lang = await Localization.getLocalizationAsync();
  const lang = Localization.locale;

  const baseLanguage = lang && lang.split(/_|-/)[0]; // 🚧🚧🚧 TEmporary

  // if (lang && Translations[lang]) setLang(lang);
  if (lang && Translations[baseLanguage]) setLang(baseLanguage);

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

export function LocalizeI(key, ...args) {
  if (!key) return '';

  const translations = Translations[globalLang];
  if (translations) {
    const translated = translations[key];
    if (translated) return interpolateString(translated, ...args);
  }
  return '__' + key + '__';
}

export function LocalizeIMultyple(key, ...args) {
  if (!key) return '';

  const translations = Translations[globalLang];
  if (translations) {
    const translated = translations[key];
    if (translated) return interpolateStringMultiple(translated, ...args);
  }
  return '__' + key + '__';
}

export default Loc;
