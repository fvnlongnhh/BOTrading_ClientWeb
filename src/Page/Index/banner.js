import React, { useEffect } from 'react';

function Banner(props) {
  useEffect(() => {
    let myPlayer;

    if(window.jQuery){
      window.jQuery(function () {
        myPlayer = window.jQuery("#bgndVideo").YTPlayer({
          useOnMobile: true,
          mobileFallbackImage: " "
        });
      });
    }
   

    window.AOS.init()
  }, [])

  return (
    <div className="banner"> {/* =================影片區================= */}
      <div className="banner-text-area">
      <img src="/img/nunu/bos banner.png" alt="" data-aos="fade-up" className="aos-init aos-animate" />
        {/* <div className="container"> */}
          {/* <div className="banner-flex"> */}
            {/* <img src="/img/nunu/bos banner.png" alt="" data-aos="fade-up" /> */}
            {/* <div className="left-block">
              <h1 data-aos="fade-up" className="aos-init aos-animate">Trade Stocks, Forex,</h1>
              <h1 data-aos="fade-up" className="aos-init aos-animate">and Crypto</h1>
              <a href="/egame" className="btn aos-init aos-animate" data-aos="fade-up">Đầu tư ngay bây giờ</a>
            </div> */}
            {/* <div className="right-block">
              <img src="/img/nunu/bos banner.png" alt="" data-aos="fade-up" className="aos-init aos-animate" />
            </div> */}
          {/* </div> */}
        {/* </div> */}
      </div>
      <div className="video" id="video">
        {/* <div className="inline-YTPlayer" > */}

        {/* <div id="bgndVideo" data-property="{videoURL:'https://youtu.be/YjhrligRTbE',containment:'#bgndVideo',autoPlay:true, mute:true, startAt:0, opacity:1, realfullscreen:true, stopMovieOnBlur:false, quality:'highres'}" className="mb_YTPlayer isMuted" style={{position: 'relative', paddingBottom: '56.25%', overflow: 'hidden', height: '0px'}}>
          
       
        </div> */}

        {/* </div> */}
      </div>
    </div>
  )
}
export default Banner;