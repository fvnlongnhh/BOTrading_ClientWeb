import React from 'react';
import Banner from './banner'
import LiveGames from './liveGames'
import Outer from './outer'
import Welcome from './welcome'
import Cards from './cards'
import Demo from './demo'
import Faq from './faq'
function Index(props) {
  return (
    <>
      <Banner />
      <LiveGames />
      <Outer />
      <Welcome />
      <Cards />
      <Demo />
      <Faq /> 
    </>
  )
}
export default Index;