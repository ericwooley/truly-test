import { handleActions,
  Action,
  // combineActions
  } from "redux-actions";
import { actions } from "./actions";
import { IContact } from "../../interfaces/contacts";
const initialContacts: IContact[] = [];
const newContact: IContact = {
  name: "",
  context: "",
  number: ""
};
const initialState = {
  searchValue: "",
  contacts: initialContacts,
  newContact
};
export type ContactState = typeof initialState;
const reducer = handleActions(
  {
    [actions.updateSearchValue]: (state: ContactState, action: Action<string>): ContactState =>
      ({...state, searchValue: action.payload || ""}),
    [actions.setContacts]: (state: ContactState, action: Action<IContact[]>): ContactState =>
      ({...state, contacts: action.payload || []})
  },
  initialState as any // this bugs me
);

export default reducer;
