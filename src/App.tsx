import * as React from "react";
import "./App.css";
import ContactList from "./containers/contactList";
import ContactSearch from "./containers/contactSearch";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider } from "react-redux";
import { getStore } from "./redux/store";
const store = getStore();
class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div>
            <ContactSearch />
            <ContactList />
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
