import axios from '../../axios';

export const acceptMatchPlayerNotice = async matchPlayerNotice => {
  try {
    await axios.put('/matches/acceptplayernotice', matchPlayerNotice);
    return true;
  } catch (err) {
    console.error(err);
  }
};
