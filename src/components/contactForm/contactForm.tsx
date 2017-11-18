import * as React from "react";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";
import { IContact } from "../../interfaces/contacts";
import FlatButton from "material-ui/FlatButton";
import { memoize } from "lodash";
interface IProps {
  contact: IContact;
  contactErrors: IContact;
  onSubmit: (contact: IContact) => any;
  onValueUpdate: (key: string, value: string) => any;
}
interface IState {
}
const textFieldStyle = {
  width: "100%"
};
const containerStyle = {
  textAlign: "right",
  width: 250
};
export const contactIsValid = (contact: IContact, contactErrors: IContact) => 
  !!Object.values(contact).find((value: string) => !!value) && 
  !Object.values(contactErrors).find((error: string) => !!error);
export default class ContactFrom extends React.PureComponent<IProps, IState> {
  triggerUpdateField = memoize(
    (key: string) =>
      (e: React.SyntheticEvent<HTMLInputElement>) =>
        this.props.onValueUpdate(key, e.currentTarget.value)
  );
  triggerOnSubmitIfValid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid: boolean = contactIsValid(this.props.contact, this.props.contactErrors);
    if (valid) {
      this.props.onSubmit(this.props.contact);
    }
  }
  
  render () {
    return (
      <form style={containerStyle} onSubmit={this.triggerOnSubmitIfValid}>
        <TextField
          id="name"
          onChange={this.triggerUpdateField("name")}
          style={textFieldStyle}
          floatingLabelText={"Name"} 
          underlineShow={false} 
          errorText={this.props.contactErrors.name}  
          value={this.props.contact.name}  
        />
        <Divider />
        <TextField 
          id="number"
          onChange={this.triggerUpdateField("number")}
          style={textFieldStyle}
          floatingLabelText={"Phone Number"} 
          underlineShow={false}  
          errorText={this.props.contactErrors.number} 
          value={this.props.contact.number} 
        />
        <Divider />
        <TextField 
          id="context"
          onChange={this.triggerUpdateField("context")}
          style={textFieldStyle}
          floatingLabelText={"Context"} 
          underlineShow={false}  
          errorText={this.props.contactErrors.context} 
          value={this.props.contact.context} 
        />
        <Divider />
        <FlatButton 
          disabled={!contactIsValid(this.props.contact, this.props.contactErrors)} 
          type="submit" 
          label="Add Contact" 
        />
      </form>
    ); 
  }
}
