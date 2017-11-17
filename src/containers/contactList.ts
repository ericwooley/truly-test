import { compose } from "redux";
import { connect } from "react-redux";
import ContactList from "../components/contactList/";
import selectors from "../redux/selectors";
import { IState } from "../redux/store";
import loadContactsOnMount from "../HOC/loadContactsOnMount";
export default compose(
  loadContactsOnMount,
  connect(
    (state: IState) => ({
        contacts: selectors.contacts.filteredContacts(state)
      }
    )
  )
)(ContactList);
