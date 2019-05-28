
// --- Post bootstrap -----
import React from "react";
import AdvertisementList from "./modules/views/AdvertisementList";
import AppFooter from "./components/MyFooter";
import ProductHero from "./modules/views/ProductHero";
import ProductHowItWorks from "./modules/views/ProductHowItWorks";
import ServiceList from './modules/views/ServiceList'
import AppAppBar from "./components/MyAppBar";

export default class HomePage extends React.Component{
  render(){
    return(
      <div>
        <AppAppBar cookies={this.props.cookies} />
        <ProductHero cookies={this.props.cookies} />
        <ProductHowItWorks cookies={this.props.cookies} />
        <ServiceList cookies={this.props.cookies} />
        <AdvertisementList cookies={this.props.cookies} />
        <AppFooter cookies={this.props.cookies} />
      </div>
    )
  }
}
