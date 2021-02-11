import axios from '../../axios';

import types from './actionTypes';

export const startLoadTournaments = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('/tournaments');
      if (data) dispatch(setTournaments(data));

      // return error or swal
    } catch (err) {
      console.error(err);
    }
  };
};

export const setTournaments = tournaments => ({
  type: types.tournamentsLoad,
  payload: tournaments,
});

export const setActiveTournament = tournament => ({
  type: types.tournamentActiveLoad,
  payload: tournament,
});
