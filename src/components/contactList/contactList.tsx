import * as React from "react";
import { IContact } from "../../interfaces/contacts";
import { List } from "material-ui/List";
import ContactListRow from "../contactListRow/contactListRow";

export default class ContactList extends React.PureComponent<{contacts: IContact[]}> {
  render () {
    return (
    <List>
      {
        this.props.contacts.map((contact, index) => (
          // stringify the contact as the key, because they have no id,
          // and using index will cause re-renders if it's filtered
          <ContactListRow key={contact.id || "<optimistic>"} contact={contact} />
        ))
      }
    </List>);
  }
}
