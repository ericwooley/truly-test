import * as React from "react";
import "./App.css";
import ContactList from "./containers/contactList";
import ContactSearch from "./containers/contactSearch";
import AddContactButton from "./containers/addContactButton";
import ContactForm from "./containers/ContactForm";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider } from "react-redux";
import { getStore } from "./redux/store";
import Paper from "material-ui/Paper";
const store = getStore();
class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div>
            <ContactSearch />
            <div className="main-content">
              <Paper>
                <ContactList />
              </Paper>
            </div>
            <AddContactButton>
              <ContactForm />
            </AddContactButton>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
