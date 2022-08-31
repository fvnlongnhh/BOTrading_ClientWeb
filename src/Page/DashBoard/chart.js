import React, { useEffect, useState } from 'react';
import _ from "lodash"

import { useSelector } from 'react-redux'
import Connection from "./connection"
import { number_to_price } from "../../helper/common"
import Service from './../../services/request'
import { useDispatch } from 'react-redux'
import moment from "moment"
import { useHistory } from "react-router-dom";
const BTC="BTC"
const ETH="ETH"
const  BET_TYPE= {
BIG: "BetBig",
SMALL: "BetSmall",
ODD: "BetOdd",
EVEN: "BetEven",
UP: "BetUp",
DOWN: "BetDown",
}
const ListIcon = [
  "../../img/nunu/svgs/draw1.svg",
  "../../img/nunu/svgs/draw2.svg",
  "../../img/nunu/svgs/draw3.svg",
  "../../img/nunu/svgs/draw4.svg",
  "../../img/nunu/svgs/draw5.svg",
  "../../img/nunu/svgs/draw6.svg",
  "../../img/nunu/svgs/draw7.svg",
]
const ListIcon2 = [
  "../../img/nunu/svgs/draw8.svg",
  "../../img/nunu/svgs/draw9.svg",
]

const ListIcon3 = [
  "../../img/nunu/svgs/draw10.svg",
  "../../img/nunu/svgs/draw11.svg",
  "../../img/nunu/svgs/draw12.svg",
  "../../img/nunu/svgs/draw13.svg",
]
const ListIcon4 = [
  "../../img/nunu/svgs/draw14.svg",
  
]
function Chart(props) {
 
  const dispatch = useDispatch(props)
  const { payloadETH , payloadADA, payloadBNB, payloadDOGE, payloadDOT, payloadLTC, payloadXRP, payloadBTC, payload, betRecordsListLive, mqttDisconnect } = props
  const [betRecordsList, setBetRecordsList] = useState([]);
  const [betRecordChange, setBetRecordChange] = useState(false)
  const [tmpPrice, setTmpPice] = useState(100000);
  const { typeMoney, setTypeMoney, setLoading } = props
  const user = useSelector((state)=> state.member)
  const history = useHistory()
  let newWallets = user.wallets
  if(!newWallets || !newWallets[0] ){
    history.push("/")
    window.localStorage.clear();
    newWallets = []
  }
  const DEFAULT_DATA = {
    userId: user.userId,
    betRecordAmountIn: "",
    // betRecordType:  BET_TYPE.UP, ////Bỏ chọn cách chơi mặc định
    betRecordUnit: `${typeMoney}-USD`
  } 
  const [dataBetRecord, setDataBetRecord] = useState(DEFAULT_DATA)

  const handleBetRecords =(data)=>{

    Service.send({
      method: 'post', path: 'BetRecords/insert', data,
    }).then(result => {
      if (result) {
        const { statusCode, message, data ={}} = result
        setBetRecordChange(true)
        if (statusCode === 200) {
        
          setDataBetRecord(DEFAULT_DATA)
          handleGetUserDetail()
         
          handleCallListBet()
          setTimeout(()=>{
            setBetRecordChange(false)
            window.sweetAlert(
              '',
              `Đặt lệnh thành công với Mã GD: ${data.ID}, Số tiền: ${number_to_price(data.betRecordAmountIn || 0)}, ${data.betRecordType === "BetUp" ? "Lên": "Xuống" }`,
              'success'
            )
          },1000)
        }else{
          window.sweetAlert(
            '',
            message,
            'warning'
          )
        }
      } 
    })
  }
  

 const handleRenderTextType = (type) =>{
  if(type ===BET_TYPE.UP){
    return {text:"lên", type:"result_up"}
  }else if(type ===BET_TYPE.DOWN){
    return  {text:"xuống", type:"result_down"}
  }else if(type ===BET_TYPE.EVEN){
    return  {text:"chẳn", type:"result_even"}
  }
  return  {text:"lẻ", type:"result_odd"}
 }

 const handleCallListBet=()=>{
  Service.send({
    method: 'post', path: 'BetRecords/getList',data: {
      filter: {
        userId: user.userId,
      },
      skip: 0,
      limit: 20,
    },
  }).then(result => {
    if (result) {
      const { statusCode, data } = result 
      if (statusCode === 200) {
        setBetRecordsList(data.data)
      }
    } 
  })
 }

 

 const handleGetUserDetail=(message)=>{
  Service.send({
    method: 'post', path: 'User/getDetailUserById',data: { id: user.userId,},
  }).then(result => {
    if (result) {
      const { statusCode, data } = result 
      if (statusCode === 200) {
        if(user.userId === data.userId) {
          dispatch(({ type: 'USER_DETAILS_UPDATE', data: data }))
        }
        if(message){
          window.sweetAlert(
            '',
            message,
            'success'
          )
        }
      }
    } 
  })
 }

  useEffect(()=>{
    handleCallListBet()
    handleGetUserDetail()
    setInterval(()=>{
      handleCallListBet()
    }, 20000)
  },[])

  function handleOnclickIcon(){
    window.sweetAlert(
      '',
      "Tính năng phân tích chỉ dùng cho tài khoản VIP",
      'warning'
    )
  }
 

  const ethPrice = payloadETH.price ? (+payloadETH.price).toFixed(4) : null
  const adaPrice = payloadADA.price ? (+payloadADA.price).toFixed(4) : null
  const bnbPrice = payloadBNB.price ? (+payloadBNB.price).toFixed(4) : null
  const dogePrice = payloadDOGE.price ? (+payloadDOGE.price).toFixed(4) : null
  const dotPrice = payloadDOT.price ? (+payloadDOT.price).toFixed(4) : null
  const ltcPrice = payloadLTC.price ? (+payloadLTC.price).toFixed(4) : null
  const xrpPrice = payloadXRP.price ? (+payloadXRP.price).toFixed(4) : null
  const btcPrice = payloadBTC.price ? (+payloadBTC.price).toFixed(4) : null
  
  return (
    <>
       <nav className="nav">
        <div className="logo">
          <img src="./assets/images/loading.gif" />
          <a>
            <b> Thời gian: </b>
            <span id="now_datetime"> {moment(payloadBTC._id || "").format("YYYY/MM/DD HH:mm:ss")}</span>
          </a>
        </div> {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="icon-bars"></span>
        </button> */} <div id="navbarSupportedContent">
          <ul className="nav-btnGroup">
            <li>
              <button onClick={()=>{
                
                window.lightBox('#lightBoxRule')}
                } >Quy tắc</button>
            </li>
            {/* <li>
              <button id="openbettingrecord" onClick={()=>{window.lightBox('#lightBoxTime')}}>Ghi lại</button>
            </li> */}
            {/* <button onclick="myrefresh()" className="refresh-btn">
              <div>
              <i class="fa fa-repeat" aria-hidden="true"></i>
              </div>
            </button> */}
          </ul>
        </div>
      </nav>
        {/* thoi gian */}
      <div className="tradingview-widget-container" style={{width: '100%', height: '47px'}}>
       <iframe scrolling="no" allowTransparency="true" frameBorder={0} src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=uk#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22title%22%3A%22S%26P%20500%22%7D%2C%7B%22proName%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22title%22%3A%22Nasdaq%20100%22%7D%2C%7B%22description%22%3A%22BIT%2FJPY%22%2C%22proName%22%3A%22BITFINEX%3ABTCJPY%22%7D%2C%7B%22description%22%3A%22ASXGOLD%22%2C%22proName%22%3A%22ASX%3AGOLD%22%7D%2C%7B%22description%22%3A%22AUDSILVER%22%2C%22proName%22%3A%22FX_IDC%3AXAGAUD%22%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22adaptive%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A44%2C%22utm_source%22%3A%22xgame.gd11.sunbur77.club%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22ticker-tape%22%7D" style={{boxSizing: 'border-box', height: '72px', width: '100%'}} />
   
       </div>
     
      <div className="container-fluid">
      
      <div className="choice-list">
        <div className="frame-title">
          <img src="./assets/images/online.gif" />Thị Trường giao dịch
        </div>
        <div className="choice-section">
          <div className="choices item">
            <div className="list-item down" id="choices_701" game={701}>
              <div className="list-item-name">ETH/USD</div>
              <div className="item-section2">
                <div className="list-item-price">
                  <div className="price">{ ethPrice? ethPrice.substring(0, ethPrice.length-2) : "----"} <span className="l">{`${ethPrice ? ethPrice[ethPrice.length - 2] :"-"}${ethPrice ? ethPrice[ethPrice.length - 1] :"-"}` }</span>
                  </div>
                </div>
                <div className={`list-item-updown ${payloadETH.percentage * 10000 > 0  ? "up":"down"}`}>
                  <div className="number"> {payloadETH.percentage? payloadETH.percentage: "--"} %</div>
                </div>
              </div>
            </div>
          </div>
          <div className="choices item">
            <div className="list-item down" id="choices_701" game={701}>
              <div className="list-item-name">ADA/USD</div>
              <div className="item-section2">
                <div className="list-item-price">
                  <div className="price">{ adaPrice? adaPrice.substring(0, adaPrice.length-2) : "----"} <span className="l">{`${adaPrice ? adaPrice[adaPrice.length - 2] :"-"}${adaPrice ? adaPrice[adaPrice.length - 1] :"-"}` }</span>
                  </div>
                </div>
                <div className={`list-item-updown ${payloadADA.percentage * 10000 > 0  ? "up":"down"}`}>
                  <div className="number"> {payloadADA.percentage? payloadADA.percentage: "--"} %</div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="choices item">
            <div className="list-item down" id="choices_701" game={701}>
              <div className="list-item-name">BNB/USD</div>
              <div className="item-section2">
                <div className="list-item-price">
                  <div className="price">{ bnbPrice? bnbPrice.substring(0, bnbPrice.length-2) : "----"} <span className="l">{`${bnbPrice ? bnbPrice[bnbPrice.length - 2] :"-"}${bnbPrice ? bnbPrice[bnbPrice.length - 1] :"-"}` }</span>
                  </div>
                </div>
                <div className={`list-item-updown ${payloadBNB.percentage * 10000 > 0  ? "up":"down"}`}>
                  <div className="number"> {payloadBNB.percentage? payloadBNB.percentage: "--"} %</div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="choices item">
            <div className="list-item down" id="choices_701" game={701}>
              <div className="list-item-name">DOGE/USD</div>
              <div className="item-section2">
                <div className="list-item-price">
                  <div className="price">{ dogePrice? dogePrice.substring(0, dogePrice.length-2) : "----"} <span className="l">{`${dogePrice ? dogePrice[dogePrice.length - 2] :"-"}${dogePrice ? dogePrice[dogePrice.length - 1] :"-"}` }</span>
                  </div>
                </div>
                <div className={`list-item-updown ${payloadDOGE.percentage * 10000 > 0  ? "up":"down"}`}>
                  <div className="number"> {payloadDOGE.percentage? payloadDOGE.percentage: "--"} %</div>
                </div>
              </div>
            </div>
          </div>
          <div className="choices item">
            <div className="list-item down" id="choices_701" game={701}>
              <div className="list-item-name">DOT/USD</div>
              <div className="item-section2">
                <div className="list-item-price">
                  <div className="price">{ dotPrice? dotPrice.substring(0, dotPrice.length-2) : "----"} <span className="l">{`${dotPrice ? dotPrice[dotPrice.length - 2] :"-"}${dotPrice ? dotPrice[dotPrice.length - 1] :"-"}` }</span>
                  </div>
                </div>
                <div className={`list-item-updown ${payloadDOT.percentage * 10000 > 0  ? "up":"down"}`}>
                  <div className="number"> {payloadDOT.percentage? payloadDOT.percentage: "--"} %</div>
                </div>
              </div>
            </div>
          </div>
          <div className="choices item">
            <div className="list-item down" id="choices_701" game={701}>
              <div className="list-item-name">LTC/USD</div>
              <div className="item-section2">
                <div className="list-item-price">
                  <div className="price">{ ltcPrice? ltcPrice.substring(0, ltcPrice.length-2) : "----"} <span className="l">{`${ltcPrice ? ltcPrice[ltcPrice.length - 2] :"-"}${ltcPrice ? ltcPrice[ltcPrice.length - 1] :"-"}` }</span>
                  </div>
                </div>
                <div className={`list-item-updown ${payloadLTC.percentage * 10000 > 0  ? "up":"down"}`}>
                  <div className="number"> {payloadLTC.percentage? payloadLTC.percentage: "--"} %</div>
                </div>
              </div>
            </div>
          </div>
          <div className="choices item">
            <div className="list-item down" id="choices_701" game={701}>
              <div className="list-item-name">XRP/USD</div>
              <div className="item-section2">
                <div className="list-item-price">
                  <div className="price">{ xrpPrice? xrpPrice.substring(0, xrpPrice.length-2) : "----"} <span className="l">{`${xrpPrice ? xrpPrice[xrpPrice.length - 2] :"-"}${xrpPrice ? xrpPrice[xrpPrice.length - 1] :"-"}` }</span>
                  </div>
                </div>
                <div className={`list-item-updown ${payloadXRP.percentage * 10000 > 0  ? "up":"down"}`}>
                  <div className="number"> {payloadXRP.percentage? payloadXRP.percentage: "--"} %</div>
                </div>
              </div>
            </div>
          </div>
       
          <div className="choices item">
            <div className="list-item down" id="choices_702" game={702}>
              <div className="list-item-name">BTC/USD</div>
              <div className="item-section2">
              <div className="list-item-price">
                  <div className="price">{ btcPrice? btcPrice.substring(0, btcPrice.length-2) : "----"} <span className="l">{`${btcPrice ? btcPrice[btcPrice.length - 2] :"-"}${btcPrice ? btcPrice[btcPrice.length - 1] :"-"}` }</span>
                  </div>
                </div>
                <div className={`list-item-updown ${payloadBTC.percentage * 10000 > 0 ? "up":"down"}`}>
                  <div className="number"> {payloadBTC.percentage ?payloadBTC.percentage : "--"}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="choice-section2"></div> 
      </div>
      {/* dong cua */}
      <div className="game_cover" style={{display: 'none'}}>Đóng cửa ...</div>
      {/* chart */}
     
      <div className="row">
        <div className="canvas-run">
            <div className="section-trend"> 
            <div style={{display: "flex", height: "100%"}}>
              <div className={"drawing-toolbar"}>
              {
                ListIcon.map(item=>(
                  <div onClick={()=>{handleOnclickIcon()}} className="drawing-toolbar__content">
                    <img src={item} style={{cursor: "pointer"}}></img>
                    
                  </div>
                ))
              }
              <div className="drawing-toolbar__line"></div>
              {
                ListIcon2.map(item=>(
                  <div onClick={()=>{handleOnclickIcon()}} className="drawing-toolbar__content">
                    <img src={item} style={{cursor: "pointer"}}></img>
                    
                  </div>
                ))
              }
               <div className="drawing-toolbar__line"></div>
               {
                ListIcon3.map(item=>(
                  <div onClick={()=>{handleOnclickIcon()}} className="drawing-toolbar__content">
                    <img src={item} style={{cursor: "pointer"}}></img>
                    
                  </div>
                ))
              }
                <div className="drawing-toolbar__line"></div>
                {
                ListIcon4.map(item=>(
                  <div onClick={()=>{handleOnclickIcon()}} className="drawing-toolbar__content">
                    <img src={item} style={{cursor: "pointer"}}></img>
                    
                  </div>
                ))
              }
            </div>
        
              <div style={{width: "100%"}}>
              <div className="game-body canvas">
              <div className="game-box">
              <Connection typeMoney={typeMoney} payload={payload} betRecordChange={betRecordChange} />
             
              </div>
            </div>
              <div className="bet-area1"> 
             <section className="section section-binary">
                <div className="block">
                  <div className="tap-content">
                    <div className="tab-pane active" id="binaryBox">
                      <div className="tab-infomation" style={{width: '100%', textAlign: 'center', marginBottom: '20px'}}>
                        <div className="tab-type">
                          <p>Kiểu:</p>
                          <select id="right_roomList" onChange={(e)=>{
                            const { value } = e.target
                            if(value === BTC || value === ETH){
                              
                              setTypeMoney(value)
                              mqttDisconnect()
                              setTimeout(()=>{
                                window.location.href = `${window.location.origin}${window.location.pathname}?type=${value}`;
                              },500)

                            }else{
                              window.sweetAlert(
                                '',
                                'Đang bị khóa',
                                'warning'
                              )
                            }
                          
                          }} value={typeMoney} style={{maxWidth: 'unset'}}>
                            <option value={BTC}>BTC/USD</option>
                            <option value={ETH}>ETH/USD</option>
                            <option value={"ADA/USD"}>ADA/USD</option>
                            {/* <option value={"BNB/USD"}>BNB/USD</option> */}
                            <option value={"DOGE/USD"}>DOGE/USD</option>
                            <option value={"DOT/USD"}>DOT/USD</option>
                            <option value={"LTC/USD"}>LTC/USD</option>
                            <option value={"XRP/USD"}>XRP/USD</option>
                            <option value={"BTC/USD"}>BTC/USD</option>
                            

                          </select>
                        </div>
                        <div className="tab-current sub-title2">
                          {/* <div className="name">ID: <span id="gameid" ckt-name="now_period">202110027001166</span>
                          </div> */}
                          <div className="countdown-area">Đếm ngược: <div  className="countdown" id="countdown" last_seconds={4}>{60 - (+moment(payloadBTC._id || "").format("ss"))}s</div>
                            <img style={{marginLeft: "5px"}} src="./assets/images/count.gif" />
                          </div>
                        </div>
                      </div>
                      <div className="wrapup">
                        <form id="Game_form" className="bet-2" onsubmit="lightBox('#lightBoxConfirm');return false;">
                          <div className="bet-infoleft">
                            <div className="wallet-frame">
                              <i class="fa fa-user" aria-hidden="true"></i>
                              Xin chào<span style={{marginLeft: "5px"}} id="user-account" className="id"> {user.firstName || ""}</span>
                            </div>
                            <div>
                              <div className="radio-group">
                                <div className="choose-radio temp-up">
                                  <input onChange={(e)=>{
                                    const { checked } = e.target
                                    if(checked){
                                      setDataBetRecord({
                                        ...dataBetRecord,
                                        betRecordType: BET_TYPE.UP
                                      })
                                    }
                                  }} checked={dataBetRecord.betRecordType === BET_TYPE.UP} id="binary_playType_A" name="binary_playType_big_or_small" type="radio" bet_value="45_1" />
                                  <label htmlFor="binary_playType_A" style={{borderRadius: '10px 0 0 10px'}}>Lên <br />
                                    <span className="bet1">90%</span>
                                  </label>
                                </div>
                                <div className="choose-radio temp-down">
                                  <input  onChange={(e)=>{
                                    const { checked } = e.target
                                    if(checked){
                                      setDataBetRecord({
                                        ...dataBetRecord,
                                        betRecordType: BET_TYPE.DOWN
                                      })
                                    }
                                  }}  checked={dataBetRecord.betRecordType === BET_TYPE.DOWN}  id="binary_playType_B" name="binary_playType_big_or_small" type="radio" bet_value="45_2" />
                                  <label htmlFor="binary_playType_B" style={{borderRadius: '0 10px 10px 0'}}>Xuống <br />
                                    <span className="bet1">90%</span>
                                  </label>
                                </div>
                                <div className="choose-radio odd_even_color">
                                  <input  onChange={(e)=>{
                                    const { checked } = e.target
                                    if(checked){
                                      setDataBetRecord({
                                        ...dataBetRecord,
                                        betRecordType: BET_TYPE.ODD
                                      })
                                    }
                                  }} checked={dataBetRecord.betRecordType === BET_TYPE.ODD} id="binary_playType_C" name="binary_playType_single_or_double" type="radio" bet_value="46_1" />
                                  <label htmlFor="binary_playType_C" style={{borderRadius: '10px 0 0 10px'}}>Lẻ <br />
                                    <span className="bet1">90%</span>
                                  </label>
                                </div>
                                <div className="choose-radio odd_even_color">
                                  <input   onChange={(e)=>{
                                    const { checked } = e.target
                                    if(checked){
                                      setDataBetRecord({
                                        ...dataBetRecord,
                                        betRecordType: BET_TYPE.EVEN
                                      })
                                    }
                                  }} checked={dataBetRecord.betRecordType === BET_TYPE.EVEN} id="binary_playType_D" name="binary_playType_single_or_double" type="radio" bet_value="46_2" />
                                  <label htmlFor="binary_playType_D" style={{borderRadius: '0 10px 10px 0'}}>Chẵn <br />
                                    <span className="bet1">90%</span>
                                  </label>
                                </div>
                              
                              </div>
                            </div>
                          </div>
                          <div className="bet-inforight">
                           <div style={{
                                 display: "flex",
                                 alignItems: "center"
                           }}>
                               <div className="wallet-frame"> Ví tiền: <span style={{ paddingLeft: "5px"}} id="wallet" ckt-name="balance">{" "} {newWallets[0] ? number_to_price(newWallets[0].balance) : "0.0"}</span>
                                 
                                 </div>
                                 <div onClick={()=>{handleGetUserDetail("Cập nhật số dư thành công")}} className="nav-btnGroup">
                                      <span> <img style={{cursor: "pointer"}} className="mobile-icon" src="../../img/nunu/svgs/refreshIcon.svg" /></span>
                                  </div>
                             </div>
                            <div className="sub-content">
                              <div className="amount-select" style={{display: 'flex'}}>
                                <p>Số tiền</p>
                                <select className="custom-amount-select" onChange={(e)=>{
                                  const {value} = e.target
                                  setTmpPice(value)
                                }} value={tmpPrice}>
                                  {/* <option value={0}>tùy chỉnh.</option> */}
                                  <option value={100000}>100K</option>
                                  <option value={250000}>250K</option>
                                  <option value={500000}>500K</option>
                                  <option value={1000000}>1000K</option>
                                  <option value={2000000}>2000K</option>
                                  <option value={3000000}>3000K</option>
                                  <option value={5000000}>5000K</option>
                                  <option value={10000000}>10M</option>
                                  <option value={20000000}>20M</option>
                                  <option value={30000000}>30M</option>
                                  <option value={50000000}>50M</option>
                                  <option value={100000000}>100M</option>
                                  <option value={200000000}>200M</option>
                                  <option value={300000000}>300M</option>
                                  <option value={500000000}>500M</option>
                                 
                                </select>
                              </div>
                              {/* <div className="amount-input" style={{display: 'flex'}} hidden>
                                <p>Số tiền</p>
                                <input id="amount-input" onChange={(e)=>{
                                  e.preventDefault()
                                  const {value} = e.target
                                  if(+value > 0){
                                    setTmpPice(0) 
                                    setDataBetRecord({
                                      ...dataBetRecord,
                                      betRecordAmountIn: +value
                                    })                                  
                                  }else if(value ===""){
                                    setDataBetRecord({
                                      ...dataBetRecord,
                                      betRecordAmountIn: ""
                                    })
                                  }
                                }} name="amount-input" value={dataBetRecord.betRecordAmountIn} type="text" />
                              </div>
                           */}
                            </div>
                            <button onClick={(e)=>{
                              e.preventDefault()
                              //Bỏ chọn cách chơi mặc định
                              if (dataBetRecord.betRecordType === undefined) {
                                window.sweetAlert(
                                  '',
                                  'Vui lòng chọn 1 cách chơi (Lên / Xuống / Chẵn / Lẻ)',
                                  'warning'
                                )
                                return;
                              }
                              
                              if(60 - (+moment().format("ss")) < 15){
                                window.sweetAlert(
                                  '',
                                  'Phiên giao dịch sẽ thực hiện sau 15s',
                                  'warning'
                                )
                              }else{
                                if(dataBetRecord.betRecordAmountIn <=0){
                                  dataBetRecord.betRecordAmountIn = tmpPrice                                 
                                }
                                
                                if(dataBetRecord.betRecordAmountIn < 100000){
                                  window.sweetAlert(
                                    '',
                                    'Số tiền phải lớn hơn hoặc bằng 100k',
                                    'warning'
                                  )
                                }else if(dataBetRecord.betRecordAmountIn > 500000000){
                                  window.sweetAlert(
                                    '',
                                    'Số tiền phải bé hoặc bằng 500tr',
                                    'warning'
                                  )
                                }else if(newWallets[0] && newWallets[0].balance <  dataBetRecord.betRecordAmountIn ){
                                  window.sweetAlert(
                                    '',
                                    'Số tiền vượt quá toài khoản hiện có',
                                    'warning'
                                  )
                                }else{
                                  
                                  window.sweetAlert({
                                    title: "Xác nhận giao dịch",
                                    html: true,
                                    customClass: "sweetCustorm",
                                    text: `
                                    <table class="table__bet">
                                      <tr>
                                        <td>Tên sản phẩm</td>
                                        <td>${typeMoney}/USD</th>                                     
                                      </tr>
                                      <tr>
                                        <td>Loại đầu tư</td>
                                        <td>${handleRenderTextType(dataBetRecord.betRecordType).text}</td>                                  
                                      </tr>
                                      <tr>
                                        <td>Hoàn lại vốn đâù từ</td>
                                        <td>90%</td>                                    
                                      </tr>
                                      <tr>
                                        <td>Giá sản phẩm</td>
                                        <td>${typeMoney ===BTC ? (btcPrice? btcPrice : "----")  : ( ethPrice? ethPrice : "----")} </td>                                    
                                      </tr>
                                      <tr>
                                       <td>Số tiền giao dịch</td>
                                       <td>${number_to_price(dataBetRecord.betRecordAmountIn)}</td>                                    
                                      </tr>
                                    </table>
                                    `,
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: '#835D33',
                                    confirmButtonText: 'Xác nhận',
                                    cancelButtonText: "Hủy bỏ",
                                    closeOnConfirm: true,
                                    closeOnCancel: true
                                  },(isOke)=>{
                                    if(isOke){
                                     handleBetRecords(dataBetRecord)
                                    }                                  
                                  })                                                              
                                }
                              }
                            }} type="submit" className="btn-buy">OK</button>
                          </div>
                        </form>
                      </div> {/* wrapup */}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            </div>
             </div>
          </div> 
        
            <div className="user-list"> {/* 交易紀錄：客人交易紀錄 */} <div className="record-half">
              <div className="frame-title">
                <img src="./assets/images/traffic.gif" /> Giao dịch của tôi
              </div>
           {
              betRecordsList &&betRecordsList.map(item=>(
              <div className="side-log-item">
                <div className="list-bet">
                  <div className="list-bet-time">
                    <span className="bet-time">{moment(item.createdAt).format("HH:mm:ss")}</span>
                  </div>
                  <div className="list-bet-stat">
                    <div className="list-bet-type">
                      <div className="bet-type">{item.betRecordUnit}</div>
                    </div>
                    <div className="list-bet-updown">
                    <div className={`bet-number ${handleRenderTextType(item.betRecordType).type}`}>{handleRenderTextType(item.betRecordType).text}</div>
                    </div>
                    <div className="list-bet-price">
                    <div className="bet-price">{number_to_price(item.betRecordAmountIn)}</div>
                    </div>
                  </div>
                </div>
            </div>
           
             ))
           }
            </div> {/* 本日交易：現場客人交易紀錄 */} <div className="record-half2 now">
              <div className="frame-title" style={{marginTop: '20px'}}>
                <img src="./assets/images/traffic.gif" /> Giao dịch trực tiếp.
              </div>
              {
             betRecordsListLive &&  betRecordsListLive.map(item=>(
                <div className="side-log-item">
                  <div className="list-bet">
                    <div className="list-bet-time">
                      <span className="bet-time">{moment(item.createdAt).format("HH:mm:ss")}</span>
                    </div>
                    <div className="list-bet-stat">
                      <div className="list-bet-type">
                        <div className="bet-type">{item.betRecordUnit}</div>
                      </div>
                      <div className="list-bet-updown">
                      <div className={`bet-number ${handleRenderTextType(item.betRecordType).type}`}>{handleRenderTextType(item.betRecordType).text}</div>
                      </div>
                      <div className="list-bet-price">
                      <div className="bet-price">{number_to_price(item.betRecordAmountIn)}</div>
                      </div>
                    </div>
                  </div>
              </div>            
             ))
           }
            </div>
          </div> {/* ONLINE USER LIST End */}
        </div>
      </div>

    </div>
    
  </>
  )
}
export default Chart;