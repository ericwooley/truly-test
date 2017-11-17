import * as React from "react";
import MUIAppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import { blue50 } from "material-ui/styles/colors";
interface IProps {
  onSearchChange: (text: string) => any; 
  value: string; 
  id?: string;
}
export default class AppBar extends React.PureComponent<IProps> {
  triggerSearchChange = (e: React.FormEvent<HTMLInputElement>) => this.props.onSearchChange(e.currentTarget.value);
  render () {
    return (
      <MUIAppBar
        iconElementLeft={
          <TextField
            id={this.props.id || "appBar-search-input"}
            value={this.props.value}
            onChange={this.triggerSearchChange}
            floatingLabelText="Search Contacts" 
            inputStyle={{color: blue50}}
            floatingLabelStyle={{color: blue50}}
          />
        }
      />
    ); 
  }
}
