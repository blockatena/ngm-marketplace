import HomeFooter from '../components/HomeFooter'
import Faq from '../components/sections/Faq'
import GalleryAndNewsSection from '../components/sections/GalleryAndNewsSection'
import HeroSection from '../components/sections/HeroSection'
import HowItWorks from '../components/sections/HowItWorks'
import HowItWorksSection from '../components/sections/HowItWorksSection'
import JoinCommunity from '../components/sections/JoinCommunity'
import JoinCommunitySection from '../components/sections/JoinCommunitySection'
import LiveAuction from '../components/sections/LiveAuction'
import LiveAuctionSection from '../components/sections/LiveAuctionSection'
import OurCollections from '../components/sections/OurCollections'
import PopularNfts from '../components/sections/PopularNfts'
import WhatWeDo from '../components/sections/WhatWeDo'
import { NextPageWithLayout } from './_app'

const HomePage: NextPageWithLayout = () => {
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
        <JoinCommunity />
        <div className=" w-full bg-mainHomePage bg-cover bg-no-repeat bg-center relative before:top-0 before:bottom-0 before:left-0 before:right-0 before:absolute before:bg-black before:opacity-80">
          <LiveAuctionSection />
          <GalleryAndNewsSection />
          <JoinCommunitySection />
          <HowItWorksSection />
          <HomeFooter />
        </div>
      </main>
    </div>
  )
}

HomePage.Layout = 'home'

export default HomePage

//
