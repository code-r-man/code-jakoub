import React, { PropTypes } from 'react';

// Exported from redux-devtools
import { createDevTools } from 'redux-devtools';

// Monitors are separate packages, and you can make a custom one
import DockMonitor from 'redux-devtools-dock-monitor';
import Inspector from 'redux-devtools-inspector';

// create a monitor for graphql
const GqlMonitor = ({ customUrl = '//localhost:3000/graphQL' }) => (
  <iframe style={{ width: '100%', height: '100%', overflow: 'hidden' }} src={customUrl}></iframe>
);
GqlMonitor.propTypes = {
  customUrl: PropTypes.string,
};
GqlMonitor.update = () => ({});

// createDevTools takes several monitors and produces a DevTools component
const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  <DockMonitor
    toggleVisibilityKey="ctrl-shift-h"
    changePositionKey="ctrl-shift-q"
    changeMonitorKey="ctrl-shift-m"
    defaultPosition="right"
    defaultIsVisible={false}
    defaultSize={0.8}
    fluid
  >
    <Inspector />
    <GqlMonitor />
  </DockMonitor>
);

export default DevTools;
