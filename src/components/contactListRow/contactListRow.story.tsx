import * as React from "react";
import { storiesOf } from "@storybook/react";
import ContactListRow from "./contactListRow";
import { IContact } from "../../interfaces/contacts";
const {contacts}: {contacts: IContact[]} = require("../../../db.json");

const stories = storiesOf("components/ContactListRow", module);
contacts.forEach((c, index) => 
  stories
    .add("contact " + index, () => <ContactListRow contact={c}/>)
  );
