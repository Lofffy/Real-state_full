import React from 'react'
import './style.css'
import HomeNavbar from "./HomeNavbar/HomeNavbar"
import Hero from "./Hero/HeroSection"
import FeaturedProperties from "./FeaturedProperties/FeaturedPropertiesSection"
import FindProperties from './FindProperties/FindProperties'
import WhyChooseUs from './WhyChooseUS/WhyChooseUs'
import PartnersSection from './Our partners/partners'
import Footer from '../../Shared/Footer'

export default function Home() {
  return (
    <>
        <HomeNavbar/>
        <Hero/>
        <FeaturedProperties/>
        <FindProperties/>
        <WhyChooseUs/>
        <PartnersSection/>
        <Footer/>
    </>
  )
}
