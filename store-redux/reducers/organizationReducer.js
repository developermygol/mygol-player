import types from '../actions/actionTypes';

const initalState = {
  organizations: [],
  activeOrganization: null,
};

const organizationReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.organizationsLoad:
      return { ...state, organizations: action.payload };
    case types.organizationActiveLoad:
      return { ...state, activeOrganization: { ...action.payload } };
    default:
      return state;
  }
};

export default organizationReducer;
