import { compose } from "redux";
import { lifecycle } from "recompose";
import { connect } from "react-redux";
import actions from "../redux/actions"; 
export const LoadContactsOnMount = lifecycle<any, {loadContacts: () => any}>({
  componentWillMount() {
    this.props.loadContacts();
  }
});
export default compose(
  connect(() => ({}), {loadContacts: actions.contacts.loadContacts}),
  LoadContactsOnMount
);
