import * as React from "react";
import { IContact } from "../../interfaces/contacts";
import { ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import { pinkA200 } from "material-ui/styles/colors";
import BusinessCenter from "material-ui/svg-icons/places/business-center";
import People from "material-ui/svg-icons/social/people";
import Happy from "material-ui/svg-icons/social/sentiment-very-satisfied";
import Unhappy from "material-ui/svg-icons/social/sentiment-very-dissatisfied";
export default class ContactListRow extends React.PureComponent<{contact: IContact}> {
  render () {
    const contact = this.props.contact;
    let icon = <People color={pinkA200} />;
    switch (contact.context) {
      case "work":
        icon = <BusinessCenter color={pinkA200} />;
        break;
      case "personal":
        icon = <Happy color={pinkA200} />;
        break;
      case "enemies":
        icon = <Unhappy color={pinkA200} />;
        break;
      default:
    }
    return (
      <ListItem
        primaryText={contact.name}
        secondaryText={contact.number}
        rightIcon={icon}
        leftAvatar={
          <Avatar
            src={"http://lorempixel.com/100/100/people/" + encodeURIComponent(contact.name).replace(".", "")} 
          />
          }
      />
    ); 
  }
}
