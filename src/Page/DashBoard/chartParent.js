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
            toast.success(`Thắng ${number_to_price(newData.amount)} - Kết quả ${newData.value}`, {
              autoClose: 5000,
            })
          }else{
            toast.error(`Thua ${number_to_price(newData.amount)} - Kết quả ${newData.value}`, {
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
       <div className="lightBox-body"> {/*彈跳光箱-確認交易*/} <div className="lightBox-panel" id="lightBoxConfirm">
      <div className="lightBox-header">Xác nhận giao dịch <div className="lightBox-close" style={{position: 'absolute', textAlign: 'right', top: '-5px', right: '18px'}}>
      <i class="fa fa-times" aria-hidden="true"  onClick={()=>{ window.lightBoxClose()}}></i>
        </div>
      </div>
      <div className="lightBox-content">
        <table className="lightBox-table">
          <tbody>
            <tr>
              <td>Tên sản phẩm</td>
              <td id="lightBoxConfirm_game">BTC/USD</td>
            </tr>
            <tr>
              <td>Loại đầu tư</td>
              <td id="lightBoxConfirm_bet_patterns" />
            </tr>
            <tr>
              <td>Hoàn lại vốn đầu tư</td>
              <td id="lightBoxConfirm_bet_rates" />
            </tr>
            <tr>
              <td>Giá sản phẩm</td>
              <td id="lightBoxConfirm_price">47481.839836</td>
            </tr>
            <tr>
              <td>Số tiền giao dịch</td>
              <td>
                <span className="money" id="lightBoxConfirm_bet_balance">100</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="btn-group">
          <button className="btn-cancel" onclick="lightBoxClose()"> Hủy bỏ</button>
          <button className="btn-confirm" xonclick="addchart()">Xác nhận</button>
        </div>
      </div>
    </div> {/*彈跳光箱-交易成功*/} <div className="lightBox-panel" id="lightBoxSuccess">
      <div className="lightBox-icon">
        <span className="icon-check" />
      </div>
      <div className="lightBox-title" style={{position: 'inherit'}}>Giao dịch thành công</div>
      <div className="lightBox-content">
        <p>Sau đây là thông tin giao dịch của bạn</p>
        <table className="lightBox-table">
          <tbody>
            <tr>
              <td>Tên sản phẩm</td>
              <td id="lightBoxSuccess_game">BTC/USD</td>
            </tr>
            <tr>
              <td>Loại đầu tư </td>
              <td id="lightBoxSuccess_bet_patterns" />
            </tr>
            <tr>
              <td>Số tiền giao dịch </td>
              <td>
                <span className="money" id="lightBoxSuccess_bet_balance">100</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="btn-group">
          <button className="btn-confirm" onclick="lightBoxClose()">xác nhận</button>
        </div>
      </div>
    </div> {/*彈跳光箱-交易失敗*/} <div className="lightBox-panel" id="lightBoxError">
      <div className="lightBox-icon">
      <i class="fa fa-times" aria-hidden="true"  onClick={()=>{ window.lightBoxClose()}}></i>
      </div>
      <div className="lightBox-title">giao dịch không thành công</div>
      <div className="lightBox-content">
        <p>Lý do</p>
        <div className="btn-group">
          <button className="btn-confirm" onclick="lightBoxClose()">xác nhận</button>
        </div>
      </div>
    </div> {/*彈跳光箱-提示訊息*/} <div className="lightBox-panel not_auto_close" id="lightBoxAlert">
      <div className="lightBox-header">Tin nhắn giới thiệu</div>
      <div className="lightBox-content">
        <div className="lightBox-message">tin nhăn hệ thông</div>
        <div className="btn-group">
          <button className="btn-confirm" onclick="lightBoxClose()">xác nhận</button>
        </div>
      </div>
    </div> {/*彈跳光箱-交易規則*/} <div className="lightBox-panel introductions" id="lightBoxRule">
      <div className="lightBox-header">Quy tắc <div className="lightBox-close" style={{position: 'absolute', textAlign: 'right', top: '-5px', right: '18px'}}>
      <i class="fa fa-times" aria-hidden="true"  onClick={()=>{ window.lightBoxClose()}}></i>
        </div>
      </div>
      <div className="lightBox-content introductions"> . <table className="lightBox-table">
          <tbody>
            <tr>
              <td>
                <h5>Giới thiệu</h5>
              </td>
              <td />
            </tr>
            <tr>
              <td>Mô tả</td>
              <td>Giao dịch này là một sản phẩm phái sinh tài chính và bạn có thể đoán một trong hai kết quả có thể xảy ra. <br /> Nếu dự đoán của bạn là chính xác, bạn sẽ nhận được những lợi ích theo lịch trình.Nếu không, bạn mất tài sản đầu tư của bạn. </td>
            </tr>
            <tr>
              <td>Qui định</td>
              <td>Sau thời gian giao dịch cố định, những thay đổi về giá của tài sản cơ bản và giá thực thi được chia thành các tùy chọn gọi hoặc đặt và chỉ có hai kết quả có thể xảy ra, cả trong và ngoài giá, khi chúng hết hạn. <br /> Theo xu hướng của cơ sở (giá cổ phiếu, giá hối đoái hoặc giá hàng hóa hoặc chỉ số thị trường chứng khoán) khi đáo hạn phù hợp với dự báo để xác định có lợi nhuận hay không, khi dự đoán chính xác hướng của giá tài sản hoặc chỉ số cơ bản trongMột thời gian nhất định, nó nằm trong giá, bạn có thể nhận được lãi suất xác định và số tiền đầu tư ban đầu, nếu không, nó nằm ngoài giá và số tiền đầu tư ban đầu sẽ bằng 0.Hoặc chỉ phục hồi một tỷ lệ khá nhỏ </td>
            </tr>
            <tr>
              <td>Đóng cửa</td>
              <td>Thị trường đóng cửa từ <br /> 00:00 Mỗi thứ bảy đến 12:00 mỗi thứ Hai khác <br /> Tiền ảo không bị ảnh hưởng </td>
            </tr>
            <tr>
              <td>
                <h5>Loại đầu tư</h5>
              </td>
              <td />
            </tr>
            <tr>
              <td> TĂNG LÊN, NGÃ </td>
              <td> Kích thước của giao dịch này được tính theo tỷ giá hối đoái hiện tại và số chữ số được xác định là mã cuối cùng. <br /> Khoảng mã cuối cùng 0 ~ 9 <br /> Mùa thu: 0 ~ 4, tăng: 5 ~ 9 <br /> Ví dụ: Tỷ giá hối đoái hiện tại là 1.1152339 <br /> Sân cuối cùng là 9 để tăng, mua tăng vì lợi nhuận, nếu không thì mua giảm để mất </td>
            </tr>
            <tr>
              <td> lẻ, chẵn </td>
              <td> Giao dịch này tính toán đơn và tăng gấp đôi theo tỷ giá hối đoái hiện tại và đánh giá rằng số chữ số là sân cuối cùng. <br /> Khoảng mã cuối cùng 0 ~ 9 <br /> Số lẻ: 1,3,5,7,9, chẵn: 0,2,4,6,8 <br /> Ví dụ: Tỷ giá hối đoái hiện tại là 1.1152339 <br /> Sân cuối cùng là 9 cho kỳ lạ, mua lẻ là lợi nhuận, nếu không thì thậm chí mua là mất </td>
            </tr>
            <tr>
              <td> LÊN, XUỐNG </td>
              <td> Giao dịch này dựa trên tỷ giá hối đoái tại thời điểm mua và tỷ giá hối đoái hiện tại vào cuối tuần để tính toán tăng và giảm, và chữ số phán đoán là hai chữ số cuối cùng. Ví dụ: Mua lại khi mua, tỷ giá hối đoái là 1.1152323, tỷ giá hối đoái hiện tại là 1.1152339 vào cuối tuần Hai yard cuối cùng khi mua là 23, hai yard cuối cùng khi tuần hết hạn là 39 Mua 23, hết hạn 39-for, mua Lợi nhuận, nếu không, mua xuống để mất </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> {/*彈跳光箱-交易紀錄*/} <div className="lightBox-panel introductions" id="lightBoxTime">
      <section className="section section-binary">
        <div className="tap-content">
          <div className="tab-pane active" id="betInquiry">
            <div className="tab-header">
              <div style={{ display: "flex", alignItems: "center", marginBottom: "15px"}} className="lightBox-header" >kỷ lục lịch sử
                <i style={{marginLeft: "auto"}} class="fa fa-times" aria-hidden="true"  onClick={()=>{ window.lightBoxClose()}}></i>
              </div>
           
              <div id="history_form" className="filter">
                <div>Chọn một loại: <br />
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
                <div>Vấn đề: <br />
                  <input name="stock-number" type="text" />
                </div>
                <div>Ngày bắt đầu: <br />
                  <input name="start" type="text" />
                </div>
                <div>Ngày cuối: <br />
                  <input name="end" type="text" />
                </div>
                <button id="bettingrecord" className="btn btn-danger">Tìm kiếm</button>
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
                Không kết quả
                
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