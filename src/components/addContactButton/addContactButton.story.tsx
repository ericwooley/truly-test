import * as React from "react";
import { storiesOf } from "@storybook/react";
import AddContactButton from "./addContactButton";
import { action } from "@storybook/addon-actions";
storiesOf("components/Add Contact Button", module)
  .add("pop over showing", () => (
    <AddContactButton showPopover={true} onPress={action("button pressed") as any}>
      <h1>Works</h1>
    </AddContactButton>
    )
  )
  .add("pop over hidden", () => (
    <AddContactButton showPopover={false} onPress={action("button pressed") as any}>
      <h1>Works</h1>
    </AddContactButton>
    )
  );
