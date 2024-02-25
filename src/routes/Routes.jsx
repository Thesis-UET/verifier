import React from "react";
import { Route, Switch } from "react-router";
import QRScan from "../pages/QRScan/QRScan";

const Routes= () => {
  return (
    <Switch>
      <Route
      exact
        path=""
        component={QRScan}
      />
    </Switch>
  );
};

export default Routes;