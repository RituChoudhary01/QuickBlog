import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newletter from '../components/Newletter'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
    <Navbar/>
    <Header/>
    <BlogList/>
    <Newletter/>
    <Footer/>
    </>
  )
}

export default Home