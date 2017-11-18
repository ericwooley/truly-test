import { 
  handleActions,
  Action
} from "redux-actions";
import { actions, IUpdateNewContactPayload } from "./actions";
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
    [actions.resetNewContact]: (state: ContactState, action: Action<undefined>): ContactState => ({
      ...state,
      newContact
    }),
    [actions.updateNewContact]: (state: ContactState, action: Action<IUpdateNewContactPayload>): ContactState => {
      if (action.payload) {
        return ({
          ...state,
          newContact: {
            ...state.newContact,
            [action.payload.key]: action.payload.value
          }
        });
      }
      return state;
      
  },
    [actions.updateSearchValue]: (state: ContactState, action: Action<string>): ContactState =>
      ({...state, searchValue: action.payload || ""}),
    [actions.setContacts]: (state: ContactState, action: Action<IContact[]>): ContactState =>
      ({...state, contacts: action.payload || []})
  },
  initialState as any // this bugs me
);

export default reducer;
