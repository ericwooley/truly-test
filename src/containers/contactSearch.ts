import { connect } from "react-redux";
import AppBar from "../components/appBar/appBar";
import selectors from "../redux/selectors";
import { IState } from "../redux/store";
import actions from "../redux/actions";
export default connect(
  (state: IState) => ({
    value: selectors.contacts.searchValue(state)
  }),      
  {
    onSearchChange: actions.contacts.updateSearchValue
  })(AppBar);
