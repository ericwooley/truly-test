import * as React from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import GroupApp from "material-ui/svg-icons/social/group-add";
import Popover from "material-ui/Popover";
interface IProps {
  onPress: (showPopover: boolean) => any;
  showPopover: boolean;
  children: React.ReactElement<any>;
}
interface IState {
  anchor: HTMLSpanElement|undefined;
}
export default class AddContactButton extends React.PureComponent<IProps, IState> {
  state = {
    anchor: undefined
  };
  setAnchor = (anchor: HTMLSpanElement) => this.setState({anchor});
  triggerOnPress = () => this.props.onPress(!this.props.showPopover);
  render () {
    return (
      <span style={{position: "fixed", bottom: 50, right: 50}} ref={this.setAnchor}>
        <FloatingActionButton 
          onClick={this.triggerOnPress} 
        >
          <GroupApp />
        </FloatingActionButton>
        <Popover
          onRequestClose={this.triggerOnPress}
          style={{padding: 10}}
          open={this.props.showPopover} 
          anchorEl={this.state.anchor}
          anchorOrigin={{horizontal: "right", vertical: "bottom"}}
          targetOrigin={{horizontal: "left", vertical: "top"}}
        >
          {this.props.children}
        </Popover>
      </span>
    ); 
  }
}
