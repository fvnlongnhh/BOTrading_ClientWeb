
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { useDispatch } from 'react-redux'
import Service from './../../services/request'
// import { toast } from 'react-toastify';

function LayoutPage(props) {
  const { Component, className = "", classNameChart = "" } = props
  const [ linkSupport, setLinkSupport ] = useState( null )
  const dispatch = useDispatch()

  useEffect(() => {
    Service.send({
      method: 'post', path: 'Maintain/getSystemStatus',
    }).then(result => {
      if(result) setLinkSupport(result?.telegramGroupUrl)
    })
  },[])

  useEffect(() => {
    const bodyId = document.getElementById("body-root")
    bodyId.classList.remove("loginPage");
    if (className !== '') {
      bodyId.classList.add(className)
    } else {
      bodyId.classList.toggle('id');
    }
  }, [className])

  useEffect(() => {
    let mobileHeader = document.getElementById("headMobile");
    let webHeader = document.getElementById("headWeb");
    window.onscroll = function () {
    scrollFunction(mobileHeader, webHeader)
    };
    
  }, [])

  function scrollFunction(mobileHeader, webHeader) {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    mobileHeader.style.background = "#292c2e";
    webHeader.style.background = "#19191A";
    } else {
    mobileHeader.style.background = "transparent";
    webHeader.style.background = "#19191A";
    }
  }
  
  const { pathname }= props.location
  
  // function handlePlayGame(params) {
  //   Service.send({
  //     method: 'post', path: 'Game/playGame', data: params, headers: {
  //       authorization: `Bearer ${token}`
  //     }
  //   }).then(result => {
  //     if (result) {
  //       const { statusCode, message } = result
  //       if (statusCode === 200) {
  //         props.history.push('/live-games')
  //       } else {
  //         toast.error(message || "something was wrong!")
  //       }
  //     }
  //   })
  // }

  function handleLogout(e){
    e.preventDefault()
    dispatch(({ type: 'USER_RESET'}))
    setTimeout(() => {
      props.history.push('/')
    }, 200)
  }
  
  return (
    <>
    {/* mobile */}
    <div id="mobile">
      	<header id="headMobile" >
      		<div className={`nav container `}>
      			<a href="https://mttoption.com" className="nav-logo"> <img src="../../img/nunu/logo.png" /> </a>
      			<button className="hamburger hamburger--collapse" type="button"> <span className="hamburger-box">
                      <span className="hamburger-inner" />
              </span> 
            </button>
      		</div>
      		<div className="index-link-block">
      			<div className="group index">
      				{/* <div className="main-item show">
      					<h3 style={{color: 'white'}}>Điều hướng</h3>
      					<div className="unfold-btn"> <img src="img/nunu/icon_open.svg" className="open" alt="" /> <img src="img/nunu/icon_close.svg" className="close show" alt="" /> </div>
      				</div> */}
      				<div className="secondary-item show"> 
                <a href="https://mttoption.com">Trang Chủ</a> 
                {/* <a href="/page_about">關於我們</a> */} 
                <a href="/trade">Thị trường giao dịch</a> 
                {/* <a href="/page_product">遊戲中心</a> 
                <a href="/page_price">優惠活動</a> 
                <a href="/page_easy">新手教學</a> */} 
                {/* <a href="">Dịch vụ chăm sóc khách</a> */} 
                <a href="/member_center">Trung tâm thành viên</a> 
                <a href={linkSupport} rel="noopener noreferrer" target='_blank'>Hỗ trợ</a> 
                <a href="logout"  onClick={(e)=>{
                handleLogout(e)
                }}>Đăng xuất</a>  
                </div>
      			</div> 
          </div>
      	</header>
      </div>

       {/* desktop */}
     <div id="web">
      	<header id="headWeb" >
      		<div className={`nav container ${pathname ==="/member_center" ? "dashboardContainer" : ""}`}>
      			<a href="https://mttoption.com" className="nav-logo"> <img src="../../img/nunu/logo.png" /> </a>
      			<div className="right-index-link-block"> 
            <a id="trangchu" className= "right-index-link-block-highlight" href="https://mttoption.com">Trang Chủ</a>
            <a id="thitruong" className= "right-index-link-block-highlight" href="/trade">Thị trường giao dịch</a> 
            {/* <a href="/page_product">遊戲中心</a> <a href="/page_price">優惠活動</a> <a href="/page_easy">新手教學</a> */} 
            {/* <a href="">Dịch vụ chăm sóc khách</a> */}
            <a id="thanh vien" className= "right-index-link-block-highlight" href="/member_center">Trung tâm thành viên</a> 
            <a id="thanh vien" className= "right-index-link-block-highlight" href="/member_center">Trung tâm thành viên</a> 
            <a  onClick={(e)=>{
               handleLogout(e)
             }}  href="logout" className="btn1 ">Đăng xuất</a> </div>
      		</div>
      	</header>
      </div>
      <Component  {...props} className={classNameChart} />
      <footer className="newsletter_right_w3_agileits bg-dark pymd-5 py-4">
      	<div className="container">
      		<div className="copyright text-center">
      			<p className="copy-right-w3ls">© 2020 TEAM INTERNATIONAL ALL RIGHTS RESERVED</p>
      		</div>
      	</div>
      </footer>
    </>
  );

}

const mapStateToProps = state => ({
  // member: state.member || {},
});

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutPage)
