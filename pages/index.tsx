import Faq from '../components/sections/home/Faq'
import HeroSection from '../components/sections/home/HeroSection'
import HomeFooter from '../components/sections/home/HomeFooter'
import HowItWorks from '../components/sections/home/HowItWorks'
import JoinCommunity from '../components/sections/home/JoinCommunity'
import LiveAuction from '../components/sections/home/LiveAuction'
import OurCollections from '../components/sections/home/OurCollections'
import PopularNfts from '../components/sections/home/PopularNfts'
import WhatWeDo from '../components/sections/home/WhatWeDo'
import OurPartner from '../components/sections/home/OurPartners'
import { NextPageWithLayout } from './_app'

const HomePage: NextPageWithLayout = () => {

  // Homepage Sections 
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <main>
        <HeroSection />
        <WhatWeDo />
        <LiveAuction />
        <PopularNfts />
        <OurCollections />
        <HowItWorks />
        <Faq />
        <OurPartner />
        <JoinCommunity />
        {/* <div className=" w-full bg-mainHomePage bg-cover bg-no-repeat bg-center relative before:top-0 before:bottom-0 before:left-0 before:right-0 before:absolute before:bg-black before:opacity-80"> */}
        {/* <LiveAuctionSection />
          <GalleryAndNewsSection />
          <JoinCommunitySection />
          <HowItWorksSection /> */}
        <HomeFooter />
        {/* </div> */}
      </main>
    </div>
  )
}

HomePage.Layout = 'home'

export default HomePage

//
