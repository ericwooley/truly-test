import { createAction } from "redux-actions";

export const actions = {
  displayAddContactForm: "DISPLAY_ADD_CONTACT_FORM"
};

export const actionCreators = {
  displayAddContactForm: createAction<boolean>(actions.displayAddContactForm)
};
