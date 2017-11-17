import * as React from "react";
import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";
import ContactList from "./contactList";
import { IContact } from "../../interfaces/contacts";
const {contacts}: {contacts: IContact[]} = require("../../../db.json");

storiesOf("components/ContactList", module)
.add("full ContactList", () => <ContactList contacts={contacts}/>);
