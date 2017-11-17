import { createSelector } from "reselect";

import { IContact } from "../../interfaces/contacts";
import { ContactState } from "./reducer";
interface IStateSubset { contacts: ContactState; }
const searchValue = (state: IStateSubset) => state.contacts.searchValue;
const contacts = (state: IStateSubset) => state.contacts.contacts;
const filteredContacts = createSelector(
  searchValue, 
  contacts, 
  (value: string, contactList: IContact[]) => {
    if (!value) {
      return contactList;
    }
    value = value.toLowerCase();
    return contactList.filter(c => {
      const matchesName = c.name.toLowerCase().indexOf(value) !== -1;
      const matchesNumber = c.number.toLowerCase().indexOf(value) !== -1;
      const matchesContext = c.context.toLowerCase().indexOf(value) !== -1;
      return matchesName || matchesContext || matchesNumber;
    }); 
  }
);
export default {
  contacts,
  filteredContacts,
  searchValue
};
