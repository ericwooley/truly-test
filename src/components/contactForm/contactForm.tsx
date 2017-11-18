import * as React from "react";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";
import { IContact } from "../../interfaces/contacts";
interface IProps {
  contact: IContact;
  contactErrors: IContact;
}
interface IState {
}
export default class ContactFrom extends React.PureComponent<IProps, IState> {
  render () {
    return (
      <form>
        <TextField
          floatingLabelText={"Name"} 
          underlineShow={false} 
          errorText={this.props.contactErrors.name}  
          value={this.props.contact.name}  
        />
        <Divider />
        <TextField 
          floatingLabelText={"Phone Number"} 
          underlineShow={false}  
          errorText={this.props.contactErrors.name} 
          value={this.props.contact.name} 
        />
        <Divider />
        <TextField 
          floatingLabelText={"Context"} 
          underlineShow={false}  
          errorText={this.props.contactErrors.context} 
          value={this.props.contact.context} 
        />
        <Divider />
      </form>
    ); 
  }
}
