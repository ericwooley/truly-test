import * as React from "react";
import { storiesOf } from "@storybook/react";
import AppBar from "./appBar";
import { action } from "@storybook/addon-actions";
storiesOf("components/app bar", module)
  .add("default", () => 
    <AppBar onSearchChange={action("onSearchChange")} value="test" />);
