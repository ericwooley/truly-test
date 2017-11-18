import { createAction } from "redux-actions";
import { IContact } from "../../interfaces/contacts";
export const actions = {
  updateSearchValue: "UPDATE_SEARCH_VALUE",
  loadContacts: "LOAD_CONTACTS",
  setContacts: "SET_CONTACTS",
  updateNewContact: "UPDATE_NEW_CONTACT",
  resetNewContact: "RESET_NEW_CONTACT",
  createNewContact: "CREATE_NEW_CONTACT"
};
export interface IUpdateNewContactPayload {
  key: string; value: string;
}
export const actionCreators = {
  createNewContact: createAction<IContact>(actions.createNewContact),
  updateNewContact: createAction<IUpdateNewContactPayload>(actions.updateNewContact),
  resetNewContact: createAction(actions.resetNewContact),
  setContacts: createAction <IContact[]>(actions.setContacts),
  loadContacts: createAction(actions.loadContacts),
  updateSearchValue: createAction<string>(actions.updateSearchValue)
};
