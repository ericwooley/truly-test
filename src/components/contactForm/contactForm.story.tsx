import * as React from "react";
import { storiesOf } from "@storybook/react";
import ContactForm from "./contactForm";
import { action } from "@storybook/addon-actions";
storiesOf("components/Contact Form", module)
  .add("with values and errors", () => (
    <ContactForm 
      onValueUpdate={action("onUpdateValue")}
      onSubmit={action("onSubmit")}
      contact={{name: "steve", number: "01234", context: "work"}}
      contactErrors={{name: "steve is not cool", number: "whats with that phone number", context: "really? work?"}}
    />
  ))
  .add("with no values and no errors", () => (
    <ContactForm 
      onValueUpdate={action("onUpdateValue")}
      onSubmit={action("onSubmit")}
      contact={{name: "", number: "", context: ""}}
      contactErrors={{name: "", number: "", context: ""}}
    />
  ))
  .add("with values and no errors", () => (
    <ContactForm 
      onValueUpdate={action("onUpdateValue")}
      onSubmit={action("onSubmit")}
      contact={{name: "steve", number: "01234", context: "work"}}
      contactErrors={{name: "", number: "", context: ""}}
    />
  ));
