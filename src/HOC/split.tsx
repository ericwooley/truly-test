import * as React from "react";
import CircularProgress from "material-ui/CircularProgress";
/**
 * 
 * @param moduleLoader A react component to render
 */
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
      return Component ? <Component {...this.props} /> : <CircularProgress style={{marginTop: 100}} />;
    }
  }
  return LoaderWrapper;
}
