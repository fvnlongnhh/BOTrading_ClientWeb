import React, { useEffect, useState } from 'react';
import PanelStore from  "./panelStore"
import PanelAccount from "./panelAccount"
import PanelTransfer from "./panelTransfer"
import PanelWitdraw from "./panelWitdraw"
import PanelRecord from "./panelRecord"
import PanelRecordAll from "./panelRecordAll"
// import { useHistory } from "react-router-dom";
function LeftMenu() {
  const [activeSlug, setActiveSlug] = useState("member")

  function renderCotent(){
    if(activeSlug ==="store"){
      return <PanelStore/>
    }else if(activeSlug === "transfer"){
      return <PanelTransfer/>
    }else if(activeSlug ==="withdraw"){
      return <PanelWitdraw/>
    }else if ( activeSlug==="record_store"){
      return <PanelRecord/>
    }else if ( activeSlug==="record_store_all"){
      return <PanelRecordAll/>
    }
    return <PanelAccount/>
  }
 

  return (
    <div className="container">
    <div className="mobile-fixed">
      <div className={`link-btn ${activeSlug === "member" ? "active": ""}`}>
        <a onClick={(e)=>{
          e.preventDefault()
          setActiveSlug("member")
        }} 
        href="/member">
          <img className="mobile-icon" alt="logo" src="../../img/nunu/svgs/id-card.svg" />
          <br />
          <p>Thông tin tài khoản</p>
        </a>
      </div>
      <div className={`link-btn ${activeSlug === "transfer" ? "active": ""}`}>
        <a
        onClick={(e)=>{
          e.preventDefault()
          setActiveSlug("transfer")
        }} 
        href="/transfer">
          <img className="mobile-icon" alt="logo" src="../../img/nunu/svgs/exchange.svg" />
          <br />
          <p>Thông tin cá nhân</p>
        </a>
      </div>
    
      <div className={`link-btn ${activeSlug === "store" ? "active": ""}`}>
        <a 
        onClick={(e)=>{
          e.preventDefault()
          setActiveSlug("store")
        }} 
        href="/store">
          <img className="mobile-icon" alt="logo" src="../../img/nunu/svgs/database.svg" />
          <br />
          <p>Nạp tài sản</p>
        </a>
      </div>
     
      <div className={`link-btn ${activeSlug === "withdraw" ? "active": ""}`}>
        <a
        onClick={(e)=>{
          e.preventDefault()
          setActiveSlug("withdraw")
        }} 
        href="/withdraw">
          <img className="mobile-icon" alt="logo" src="../../img/nunu/svgs/credit-card.svg" />
          <br />
          <p>Rút tài sản</p>
        </a>
      </div>
      <div className={`link-btn ${activeSlug === "record_store" ? "active": ""}`}>
        <a
        onClick={(e)=>{
          e.preventDefault()
          setActiveSlug("record_store")
        }} 
         href="/record_store">
          <img className="mobile-icon" alt="logo" src="../../img/nunu/svgs/suitcase.svg" />
          <br />
          <p>Lịch sử giao dịch</p>
        </a>
      </div>
      <div className={`link-btn ${activeSlug === "record_store_all" ? "active": ""}`}>
        <a
        onClick={(e)=>{
          e.preventDefault()
          setActiveSlug("record_store_all")
        }} 
         href="/record_store_all">
          <img className="mobile-icon" alt="logo" src="../../img/nunu/svgs/recordAll.svg" />
          <br />
          <p>Lịch sử nạp rút</p>
        </a>
      </div>
      {/* 
      <div className="link-btn">
        <a href="google.com/game/vvgame" target="_blank">
          <img className="mobile-icon" alt="logo" src="../../img/nunu/svgs/game-control.svg" />
          <br />
          <p>game</p>
        </a>
      </div>
     */}
    </div>
    {renderCotent()}
   </div>
  )
}
export default LeftMenu;