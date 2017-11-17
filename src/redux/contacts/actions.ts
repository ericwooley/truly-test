import { createAction } from "redux-actions";
import { IContact } from "../../interfaces/contacts";
export const actions = {
  updateSearchValue: "UPDATE_SEARCH_VALUE",
  loadContacts: "LOAD_CONTACTS",
  setContacts: "SET_CONTACTS"
};

export const actionCreators = {
  setContacts: createAction <IContact[]>(actions.setContacts),
  loadContacts: createAction(actions.loadContacts),
  updateSearchValue: createAction<string>(actions.updateSearchValue)
};
