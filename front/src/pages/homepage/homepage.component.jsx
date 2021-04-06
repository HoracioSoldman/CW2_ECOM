import React from "react";
import Bestpick from "../../components/best-pick/best-pick.component";
import Directory from '../../components/directory/directory.component'

import "./homepage.styles.scss";

const HomePage = () => (
  <div className="homepage">
    <Bestpick />
    <Directory />
  </div>
);

export default HomePage;
