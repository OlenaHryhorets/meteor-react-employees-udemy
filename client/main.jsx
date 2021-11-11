import React from 'react';
import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';

// after Meteor loads in the browser, render my app to the DOM
Meteor.startup(() => {
  // React render call
//render(<App/>, document.getElementById('employees-app'));
  ReactDOM.render(<App />, document.getElementById('employees-app'));
});
