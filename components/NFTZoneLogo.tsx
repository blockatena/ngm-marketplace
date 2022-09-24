interface NFTZoneLogoProps {
  size?: "small" | "normal";
}

const NFTZoneLogo: React.FC<NFTZoneLogoProps> = ({ size = "normal" }) => {
  if (size === "small") {
    return (
      <div className='flex flex-col w-fit font-bold'>
        <h2 className='relative font-hero-header leading-none text-white text-[20px] md:text-[25px] lg:text-[29px] pb-0'>
          NFTZone
        </h2>
        <div className='bg-white w-[40px] md:w-[45px] lg:w-[51px] h-[3px] mx-auto rounded-[100%]' />
      </div>
    );
  }

  return (
    <div className='flex flex-col w-fit font-bold'>
      <h2 className='relative font-hero-header leading-none text-white text-[38px] md:text-[42px] lg:text-[48px] pb-0'>
        NFTZone
      </h2>
      <div className='bg-white w-[60px] md:w-[70px] lg:w-[75px] h-[4px] mx-auto rounded-[100%]' />
    </div>
  );
};

export default NFTZoneLogo;
