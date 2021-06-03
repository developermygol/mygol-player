import axios from 'axios';
import types from './actionTypes';
import config from '../../Config';

export const loadUserOrganitzations = async email => {
  try {
    // 🔎 Manual integration with Config
    const organitzations = [];
    let response;
    let response2;
    try {
      response = await axios.get(
        `${config.reactAppDirectoryApiUrl}/organization/userexistandorganitzation/${email}`,
        { timeout: 500 }
      );
    } catch (err) {}

    try {
      response2 = await axios.get(
        `${config.reactAppDirectoryApiUrl2}/organization/userexistandorganitzation/${email}`,
        { timeout: 500 }
      );
    } catch (err) {}

    if (response && response.data)
      organitzations.push({
        ...response.data.organitzation,
        userId: response.data.userId,
        baseUrl: config.reactAppDirectoryApiUrl,
      });
    if (response2 && response2.data)
      organitzations.push({
        ...response2.data.organitzation,
        userId: response2.data.userId,
        baseUrl: config.reactAppDirectoryApiUrl2,
      });

    return organitzations;
  } catch (err) {
    console.log(err);
    return console.error(err);
  }
};
