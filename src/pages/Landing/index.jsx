import React from "react";
import "./style.css"
import CallToAction from "../../components/landing_page/CallToAction";
import Navigator from "../../components/landing_page/Navigator";
import TimeAtom from "../../components/landing_page/TimeAtom";

const Landing = () => {
  return <div className="landing-page">
    <Navigator></Navigator>
    <div className="main">
        <TimeAtom></TimeAtom>
        <CallToAction></CallToAction>
    </div>
  </div>;
};

export default Landing;