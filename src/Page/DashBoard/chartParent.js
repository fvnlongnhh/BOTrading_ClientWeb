import React, { useEffect, useState } from 'react';
import Chart from "./chart"
import { useSelector } from 'react-redux'
import Service from './../../services/request'
import { number_to_price } from "../../helper/common"
import mqtt from 'mqtt';
import {toast} from "react-toastify"
import { useDispatch } from 'react-redux'
import moment from "moment"
const BTC="BTC"
const ETH="ETH"
const LIVE_RECORD="LIVE_RECORD"
const ADA="ADA"
const BNB="BNB"
const DOGE="DOGE"
const DOT="DOT"
const LTC="LTC"
const XRP="XRP"
let tmpType
let myGetDetail = null
function ChartParent({className}) {
  const { search } = window.location
  const params = new URLSearchParams(search)
  const user = useSelector(state => state.member)
  const userId = user.userId
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [typeMoney, setTypeMoney] = useState(params.get("type") || "BTC")
  tmpType = typeMoney
 
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState('Connect');
  const [payloadETH, setPayloadETH] = useState({});
  const [payloadBTC, setPayloadBTC] = useState({});
  const [payloadADA, setPayloadADA] = useState({});
  const [payloadBNB, setPayloadBNB] = useState({});
  const [payloadDOGE, setPayloadDOGE] = useState({});
  const [payloadDOT, setPayloadDOT] = useState({});
  const [payloadLTC, setPayloadLTC] = useState({});
  const [payloadXRP, setPayloadXRP] = useState({});
  const [betRecordsListLive, setBetRecordsListLive] = useState([]);
  const [payloadLIVERECORD, setPayloadLIVERECORD] = useState();
  
  const [payload, setPayload] = useState({});

  const handleCallListBetLive=()=>{
    Service.send({
      method: 'post', path: 'BetRecords/getListLive',data: {
        filter: {
          userId: userId,
        },    
        limit: 20,
      },
    }).then(result => {
      if (result) {
        const { statusCode, data } = result 
        if (statusCode === 200) {
          setBetRecordsListLive(data.data)
        }
      } 
    })
   }


  useEffect(()=>{
    setTimeout(()=>{setLoading(false)},1000)
    handleCallListBetLive()

  }, [])
  
  useEffect(() => {
    
    if (client ) {
      client.on('connect', () => {
        setConnectStatus('Connected');
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        if(topic ===tmpType){
          
          setPayload(payload);
        }
        if(topic === BTC && payload.message) {
          setPayloadBTC(JSON.parse(`${payload.message}`))
        }

        if(topic === ETH && payload.message) {         
          setPayloadETH(JSON.parse(`${payload.message}`))
        }
        if(topic === LIVE_RECORD && payload.message) {         
          setPayloadLIVERECORD(JSON.parse(`${payload.message}`))
        }

        if(topic === ADA && payload.message) {         
          setPayloadADA(JSON.parse(`${payload.message}`))
        }

        if(topic === BNB && payload.message) {         
          setPayloadBNB(JSON.parse(`${payload.message}`))
        }

        if(topic === DOGE && payload.message) {         
          setPayloadDOGE(JSON.parse(`${payload.message}`))
        }

        if(topic === DOT && payload.message) {         
          setPayloadDOT(JSON.parse(`${payload.message}`))
        }

        if(topic === LTC && payload.message) {         
          setPayloadLTC(JSON.parse(`${payload.message}`))
        }
        
        if(topic === XRP && payload.message) {         
          setPayloadXRP(JSON.parse(`${payload.message}`))
        }
        
        if(topic === `USER_${userId}` && payload.message) {         
          const newData = JSON.parse(`${payload.message}`)
          console.log(topic,`USER_${userId}` )
          
          if (newData.result ==="win") {
            handleGetUserDetail();
            toast.success(`Th???ng ${number_to_price(newData.amount)} - K???t qu??? ${newData.value}`, {
              autoClose: 5000,
            })
          }else{
            toast.error(`Thua ${number_to_price(newData.amount)} - K???t qu??? ${newData.value}`, {
              autoClose: 5000,
            })
          }
        }

      });

      mqttSub({
        topic: BTC, qos:0
      })
      mqttSub({
        topic: ETH, qos:0
      })
      mqttSub({
        topic: LIVE_RECORD, qos:0
      })

      mqttSub({
        topic: ADA, qos:0
      })

      mqttSub({
        topic: BNB, qos:0
      })


      mqttSub({
        topic: DOGE, qos:0
      })


      mqttSub({
        topic: DOT, qos:0
      })

      mqttSub({
        topic: LTC, qos:0
      })

      mqttSub({
        topic: XRP, qos:0
      })
      
      mqttSub({
        topic: `USER_${userId}`, qos:0
      })

      return ()=>{
        mqttUnSub({
          topic: `USER_${userId}`
        })
        mqttUnSub({
          topic: BTC
        })
        mqttUnSub({
          topic: ETH
        })
        mqttSub({
          topic: LIVE_RECORD, qos:0
        })

        mqttSub({
          topic: ADA, qos:0
        })
        mqttSub({
          topic: BNB, qos:0
        })
        mqttSub({
          topic: DOGE, qos:0
        })
        mqttSub({
          topic: DOT, qos:0
        })
        mqttSub({
          topic: LTC, qos:0
        })
        mqttSub({
          topic: XRP, qos:0
        })
        
      }
    }
    
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus('Connect');
      });
    }
  }

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        
      });
    }
  };

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus('Connecting');
    setClient(mqtt.connect(host, mqttOption));
  };


  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        
      });
    }
  };

  const handleGetUserDetail=()=>{
    if(myGetDetail){
      window.clearTimeout(myGetDetail)
    }
    myGetDetail = setTimeout(()=>{
      Service.send({
        method: 'post', path: 'User/getDetailUserById',data: { id: user.userId,},
      }).then(result => {
        if (result) {
          const { statusCode, data } = result 
          if (statusCode === 200) {
            if(user.userId === data.userId) {
              dispatch(({ type: 'USER_DETAILS_UPDATE', data: data }))
            }
          }
        } 
      })
    }, 2000)
   }

  useEffect(()=>{
     if(payloadLIVERECORD){
      betRecordsListLive.push(payloadLIVERECORD)
      if(betRecordsListLive.length > 15){
        betRecordsListLive.shift()
      }
      setBetRecordsListLive([...betRecordsListLive])
     }
     
  },[payloadLIVERECORD])

  useEffect(()=>{
    
    handleConnect()
    return ()=>{
      handleDisconnect()
    }
  }, [])

  const handleConnect = () => {
    let url = process.env.REACT_APP_API_WSS_URL
    
    if (window.location.protocol !== "https:") {
       url = process.env.REACT_APP_API_WS_URL
   }
    const clientId = `ChartData_${userId}_${moment().format("YYYY_MM_DD_hh_mm_ss")}`
    
    const options = {
      rejectUnauthorized: false,
      // keepalive: 30,
      // protocolId: 'MQTT',
      // protocolVersion: 4,
      // clean: true,
      reconnectPeriod: 10000,
      // connectTimeout: 30 * 1000,
      // will: {
      //   topic: 'WillMsg',
      //   payload: 'Connection Closed abnormally..!',
      //   qos: 0,
      //   retain: false
      // }
    };
    options.clientId = clientId;
  
    mqttConnect(url, options);
    
    
  };

  const handleDisconnect = () => {
    mqttDisconnect();
  };

  return (
    <div className={`chart ${className}`}>
    {
      !loading ? (
        <div>

           <Chart 
           payloadETH={payloadETH}
           payloadADA={payloadADA}
           payloadBNB={payloadBNB}
           payloadDOGE={payloadDOGE}
           payloadDOT={payloadDOT}
           payloadXRP={payloadXRP}
           payloadLTC={payloadLTC}
           payloadBTC={payloadBTC}
           payloadBTC={payloadBTC}
           payloadBTC={payloadBTC}
           payload={payload}
           mqttDisconnect={mqttDisconnect}
           betRecordsListLive={betRecordsListLive}
            setTypeMoney={setTypeMoney} typeMoney={typeMoney} setLoading={setLoading} />
        </div>
      ):(   
     <div className="loading">
      <div style={{textAlign: 'center'}}>
        <img src="./assets/images/loading.gif" />
      </div>
    </div>
      )
    }
    <section className="lightBox ">
       <div className="lightbox-black" onClick={()=>{ window.lightBoxClose()}} />
       <div className="lightBox-body"> {/*????????????-????????????*/} <div className="lightBox-panel" id="lightBoxConfirm">
      <div className="lightBox-header">X??c nh???n giao d???ch <div className="lightBox-close" style={{position: 'absolute', textAlign: 'right', top: '-5px', right: '18px'}}>
      <i class="fa fa-times" aria-hidden="true"  onClick={()=>{ window.lightBoxClose()}}></i>
        </div>
      </div>
      <div className="lightBox-content">
        <table className="lightBox-table">
          <tbody>
            <tr>
              <td>T??n s???n ph???m</td>
              <td id="lightBoxConfirm_game">BTC/USD</td>
            </tr>
            <tr>
              <td>Lo???i ?????u t??</td>
              <td id="lightBoxConfirm_bet_patterns" />
            </tr>
            <tr>
              <td>Ho??n l???i v???n ?????u t??</td>
              <td id="lightBoxConfirm_bet_rates" />
            </tr>
            <tr>
              <td>Gi?? s???n ph???m</td>
              <td id="lightBoxConfirm_price">47481.839836</td>
            </tr>
            <tr>
              <td>S??? ti???n giao d???ch</td>
              <td>
                <span className="money" id="lightBoxConfirm_bet_balance">100</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="btn-group">
          <button className="btn-cancel" onclick="lightBoxClose()"> H???y b???</button>
          <button className="btn-confirm" xonclick="addchart()">X??c nh???n</button>
        </div>
      </div>
    </div> {/*????????????-????????????*/} <div className="lightBox-panel" id="lightBoxSuccess">
      <div className="lightBox-icon">
        <span className="icon-check" />
      </div>
      <div className="lightBox-title" style={{position: 'inherit'}}>Giao d???ch th??nh c??ng</div>
      <div className="lightBox-content">
        <p>Sau ????y l?? th??ng tin giao d???ch c???a b???n</p>
        <table className="lightBox-table">
          <tbody>
            <tr>
              <td>T??n s???n ph???m</td>
              <td id="lightBoxSuccess_game">BTC/USD</td>
            </tr>
            <tr>
              <td>Lo???i ?????u t?? </td>
              <td id="lightBoxSuccess_bet_patterns" />
            </tr>
            <tr>
              <td>S??? ti???n giao d???ch </td>
              <td>
                <span className="money" id="lightBoxSuccess_bet_balance">100</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="btn-group">
          <button className="btn-confirm" onclick="lightBoxClose()">x??c nh???n</button>
        </div>
      </div>
    </div> {/*????????????-????????????*/} <div className="lightBox-panel" id="lightBoxError">
      <div className="lightBox-icon">
      <i class="fa fa-times" aria-hidden="true"  onClick={()=>{ window.lightBoxClose()}}></i>
      </div>
      <div className="lightBox-title">giao d???ch kh??ng th??nh c??ng</div>
      <div className="lightBox-content">
        <p>L?? do</p>
        <div className="btn-group">
          <button className="btn-confirm" onclick="lightBoxClose()">x??c nh???n</button>
        </div>
      </div>
    </div> {/*????????????-????????????*/} <div className="lightBox-panel not_auto_close" id="lightBoxAlert">
      <div className="lightBox-header">Tin nh???n gi???i thi???u</div>
      <div className="lightBox-content">
        <div className="lightBox-message">tin nh??n h???? th??ng</div>
        <div className="btn-group">
          <button className="btn-confirm" onclick="lightBoxClose()">x??c nh???n</button>
        </div>
      </div>
    </div> {/*????????????-????????????*/} <div className="lightBox-panel introductions" id="lightBoxRule">
      <div className="lightBox-header">Quy t???c <div className="lightBox-close" style={{position: 'absolute', textAlign: 'right', top: '-5px', right: '18px'}}>
      <i class="fa fa-times" aria-hidden="true"  onClick={()=>{ window.lightBoxClose()}}></i>
        </div>
      </div>
      <div className="lightBox-content introductions"> . <table className="lightBox-table">
          <tbody>
            <tr>
              <td>
                <h5>Gi???i thi???u</h5>
              </td>
              <td />
            </tr>
            <tr>
              <td>M?? t???</td>
              <td>Giao d???ch n??y l?? m???t s???n ph???m ph??i sinh t??i ch??nh v?? b???n c?? th??? ??o??n m???t trong hai k???t qu??? c?? th??? x???y ra. <br /> N???u d??? ??o??n c???a b???n l?? ch??nh x??c, b???n s??? nh???n ???????c nh???ng l???i ??ch theo l???ch tr??nh.N???u kh??ng, b???n m???t t??i s???n ?????u t?? c???a b???n. </td>
            </tr>
            <tr>
              <td>Qui ?????nh</td>
              <td>Sau th???i gian giao d???ch c??? ?????nh, nh???ng thay ?????i v??? gi?? c???a t??i s???n c?? b???n v?? gi?? th???c thi ???????c chia th??nh c??c t??y ch???n g???i ho???c ?????t v?? ch??? c?? hai k???t qu??? c?? th??? x???y ra, c??? trong v?? ngo??i gi??, khi ch??ng h???t h???n. <br /> Theo xu h?????ng c???a c?? s??? (gi?? c??? phi???u, gi?? h???i ??o??i ho???c gi?? h??ng h??a ho???c ch??? s??? th??? tr?????ng ch???ng kho??n) khi ????o h???n ph?? h???p v???i d??? b??o ????? x??c ?????nh c?? l???i nhu???n hay kh??ng, khi d??? ??o??n ch??nh x??c h?????ng c???a gi?? t??i s???n ho???c ch??? s??? c?? b???n trongM???t th???i gian nh???t ?????nh, n?? n???m trong gi??, b???n c?? th??? nh???n ???????c l??i su???t x??c ?????nh v?? s??? ti???n ?????u t?? ban ?????u, n???u kh??ng, n?? n???m ngo??i gi?? v?? s??? ti???n ?????u t?? ban ?????u s??? b???ng 0.Ho???c ch??? ph???c h???i m???t t??? l??? kh?? nh??? </td>
            </tr>
            <tr>
              <td>????ng c???a</td>
              <td>Th??? tr?????ng ????ng c???a t??? <br /> 00:00 M???i th??? b???y ?????n 12:00 m???i th??? Hai kh??c <br /> Ti???n ???o kh??ng b??? ???nh h?????ng </td>
            </tr>
            <tr>
              <td>
                <h5>Lo???i ?????u t??</h5>
              </td>
              <td />
            </tr>
            <tr>
              <td> T??NG L??N, NG?? </td>
              <td> K??ch th?????c c???a giao d???ch n??y ???????c t??nh theo t??? gi?? h???i ??o??i hi???n t???i v?? s??? ch??? s??? ???????c x??c ?????nh l?? m?? cu???i c??ng. <br /> Kho???ng m?? cu???i c??ng 0 ~ 9 <br /> M??a thu: 0 ~ 4, t??ng: 5 ~ 9 <br /> V?? d???: T??? gi?? h???i ??o??i hi???n t???i l?? 1.1152339 <br /> S??n cu???i c??ng l?? 9 ????? t??ng, mua t??ng v?? l???i nhu???n, n???u kh??ng th?? mua gi???m ????? m???t </td>
            </tr>
            <tr>
              <td> l???, ch???n </td>
              <td> Giao d???ch n??y t??nh to??n ????n v?? t??ng g???p ????i theo t??? gi?? h???i ??o??i hi???n t???i v?? ????nh gi?? r???ng s??? ch??? s??? l?? s??n cu???i c??ng. <br /> Kho???ng m?? cu???i c??ng 0 ~ 9 <br /> S??? l???: 1,3,5,7,9, ch???n: 0,2,4,6,8 <br /> V?? d???: T??? gi?? h???i ??o??i hi???n t???i l?? 1.1152339 <br /> S??n cu???i c??ng l?? 9 cho k??? l???, mua l??? l?? l???i nhu???n, n???u kh??ng th?? th???m ch?? mua l?? m???t </td>
            </tr>
            <tr>
              <td> L??N, XU???NG </td>
              <td> Giao d???ch n??y d???a tr??n t??? gi?? h???i ??o??i t???i th???i ??i???m mua v?? t??? gi?? h???i ??o??i hi???n t???i v??o cu???i tu???n ????? t??nh to??n t??ng v?? gi???m, v?? ch??? s??? ph??n ??o??n l?? hai ch??? s??? cu???i c??ng. V?? d???: Mua l???i khi mua, t??? gi?? h???i ??o??i l?? 1.1152323, t??? gi?? h???i ??o??i hi???n t???i l?? 1.1152339 v??o cu???i tu???n Hai yard cu???i c??ng khi mua l?? 23, hai yard cu???i c??ng khi tu???n h???t h???n l?? 39 Mua 23, h???t h???n 39-for, mua L???i nhu???n, n???u kh??ng, mua xu???ng ????? m???t </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> {/*????????????-????????????*/} <div className="lightBox-panel introductions" id="lightBoxTime">
      <section className="section section-binary">
        <div className="tap-content">
          <div className="tab-pane active" id="betInquiry">
            <div className="tab-header">
              <div style={{ display: "flex", alignItems: "center", marginBottom: "15px"}} className="lightBox-header" >k??? l???c l???ch s???
                <i style={{marginLeft: "auto"}} class="fa fa-times" aria-hidden="true"  onClick={()=>{ window.lightBoxClose()}}></i>
              </div>
           
              <div id="history_form" className="filter">
                <div>Ch???n m???t lo???i: <br />
                  <select id="history_roomList">
                    <option value={704}>USD/JPY</option>
                    <option value={705}>USD/CHF</option>
                    <option value={706}>USD/RUB</option>
                    <option value={700}>BTC/USD</option>
                    <option value={701}>ETH/USD</option>
                    <option value={702}>GBP/USD</option>
                    <option value={703}>EUR/USD</option>
                  </select>
                </div>
                <div>V???n ?????: <br />
                  <input name="stock-number" type="text" />
                </div>
                <div>Ng??y b???t ?????u: <br />
                  <input name="start" type="text" />
                </div>
                <div>Ng??y cu???i: <br />
                  <input name="end" type="text" />
                </div>
                <button id="bettingrecord" className="btn btn-danger">T??m ki???m</button>
              </div>
              
              <div id="bet_history_table" className="result-list">
              {/* <table style={{marginTop: "20px", textAlign: 'center', width: "100%"}}>
                <tr>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Country</th>
                </tr>
                <tr>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                </tr>
                <tr>
                  <td>Centro comercial Moctezuma</td>
                  <td>Francisco Chang</td>
                  <td>Mexico</td>
                </tr>
              </table> */}
                Kh??ng k???t qu???
                
                </div>
              <div className="pagination" id="bet_history_pages" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
   </section>
  
    </div>
  )
}
export default ChartParent;