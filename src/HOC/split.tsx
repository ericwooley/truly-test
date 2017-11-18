import * as React from "react";
import CircularProgress from "material-ui/CircularProgress";
import Card from "material-ui/Card/Card";
/**
 * 
 * @param moduleLoader A react component to render a loading circle while the split module is loading.
 */
// TODO: This style needs help, but good enough for now
const loaderWrapperStyle = {
  textAlign: "center",
  paddingBottom: 100

};
export default function LoaderHOC <P>(moduleLoader: () => Promise<React.ComponentClass<P>> ) {
  class LoaderWrapper extends React.Component<P> {
    state: {Component: React.ComponentClass<P>|null} = {
      Component: null
    };
    async componentWillMount () {
      const Component = await moduleLoader();
      this.setState({Component});
    }
    render () {
      const Component = this.state.Component;
      return Component ? 
      <Component {...this.props} /> : 
      (
        <Card style={loaderWrapperStyle as any}>
          <CircularProgress style={{marginTop: 100}} />
        </Card>
      );
    }
  }
  return LoaderWrapper;
}
