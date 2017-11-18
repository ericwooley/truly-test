import { connect } from "react-redux";
import ContactForm from "../components/contactForm/contactForm";
import { IState } from "../redux/store";
// import actions from "../redux/actions";
import selectors from "../redux/selectors";
export default connect(
  (state: IState) => ({
     contact: selectors.contacts.userEnteredContact(state),
     contactErrors: selectors.contacts.userContactErrors(state)
  }),      
  {
  })(ContactForm);
