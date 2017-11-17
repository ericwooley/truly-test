import * as React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider } from "react-redux";
import { getStore } from "../redux/store";
import { addDecorator } from "@storybook/react";
const ThemeDecorator = (storyFn: Function) => (
  <MuiThemeProvider>
    {storyFn()}
  </MuiThemeProvider>
);
const StoreDecorator = (storyFn: Function) => (
  <Provider store={getStore()} >
    {storyFn()}
  </Provider > 
);
addDecorator(ThemeDecorator);
addDecorator(StoreDecorator);
require("./appBar/appBar.story");
require("./contactList/contactList.story");
require("./contactListRow/contactListRow.story");
