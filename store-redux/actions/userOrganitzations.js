import axios from 'axios';
import types from './actionTypes';
import config from '../../Config';

export const loadUserOrganitzations = async email => {
  try {
    // 🔎 Manual integration with Config
    const organitzations = [];
    const response = await axios.get(
      `${config.reactAppDirectoryApiUrl}/organization/userexistandorganitzation/${email}`
    );
    const response2 = await axios.get(
      `${config.reactAppDirectoryApiUrl2}/organization/userexistandorganitzation/${email}`
    );

    if (response.data) organitzations.push({ ...response.data.organitzation, userId: response.data.userId });
    if (response2.data)
      organitzations.push({ ...response2.data.organitzation, userId: response2.data.userId });

    return organitzations;
  } catch (err) {
    console.log(err);
    return console.error(err);
  }
};
