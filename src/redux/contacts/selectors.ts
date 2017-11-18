import { createSelector } from "reselect";

import { IContact } from "../../interfaces/contacts";
import { ContactState } from "./reducer";
export interface IContactSubState { contacts: ContactState; }
const searchValue = (state: IContactSubState) => state.contacts.searchValue;
const contactsUnsorted = (state: IContactSubState) => state.contacts.contacts;
const contacts = createSelector(contactsUnsorted, (contactList: IContact[]) => 
  [...contactList].sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  }));
const userEnteredContact = (state: IContactSubState) => state.contacts.newContact;
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

const userContact = (state: IContactSubState) => state.contacts.newContact;
const userContactErrors = createSelector(userContact, (contact): IContact => ({
  name: contact.name.length ? "" : "name is required",
  context: contact.context.length ? "" : "context is required",
  number:  contact.number.length ? "" : "phone number is required",
}));
export default {
  userContactErrors,
  userEnteredContact,
  contacts,
  filteredContacts,
  searchValue
};
