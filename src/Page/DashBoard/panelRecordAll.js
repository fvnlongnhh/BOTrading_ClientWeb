
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Service from './../../services/request'
import { number_to_price } from "../../helper/common"
import { convertFileToBase64 } from '../../helper/common';
import moment from "moment"

function PanelRecordAll(props) {
  const [typeActive, setTypeActive ] = useState(0)
  const user = useSelector((state)=> state.member)
  const DEFAULT ={
    userId: user.userId,
    pointAmount: "",
    // hinhxacnhan: ""
  }
  const [data, setData] = useState(DEFAULT)
  const [items, setItems] = useState([])


  useEffect(()=>{
    handleFetchList({
      status: "New"
    })
  },[])

  function handleFetchList(filter) {
    Service.send({
      method: 'POST', path: 'DepositTransaction/findByUser', data: {
        skip: 0,
        limit: 100,
        filter,
        order: {
          key: "createdAt",
          value: "desc"
        }
      }, query: null,
    }).then(res => {
      if (res) {
        const { statusCode, data, message } = res

        if (statusCode === 200) {
          
          setItems(data.data)
        } 
      } 
    })
  }

  function handleFetchListWithdraw() {
    Service.send({
      method: 'POST', path: 'WithdrawTransaction/findByUser', data: {
        skip: 0,
        limit: 100,    
        order: {
          key: "createdAt",
          value: "desc"
        }
      }, query: null,
    }).then(res => {
      if (res) {
        const { statusCode, data, message } = res

        if (statusCode === 200) {
          
          setItems(data.data)
        } 
      } 
    })
  }
  return (
   <>
  <div className="area " id="store">
 
     <div className="index-page"> <div className="mobile-title mobile-show">
       <h2>Lịch sử nạp rút</h2>
     </div>
     {/* <div className="mobile-title-space mobile-show" />  */}
     <div className="parent-content" id="list-content">
      <div className="content">
       <div className="form">
       
         <div className="left">
           <div style={{marginTop: "30px"}} className="link-btn-block">
             <a onClick={(e)=>{
              e.preventDefault()
              setTypeActive(0)
              handleFetchList({
                status: "New"
              })
            }} href="/record_store" className={`link-btn ${!typeActive? "active": ""}`}>
              <p>
                Nạp tiền chờ duyệt
              </p>
            </a>
            <a onClick={(e)=>{
              e.preventDefault()
              setTypeActive(1)
              handleFetchList({
                status: "Completed"
              })
            }} href="/record_transfer" className={`link-btn ${typeActive ===1? "active": ""}`}>
              <p>
              LỆNH NẠP TIỀN ĐÃ ĐƯỢC GỬI ĐI. <br></br>
              QUÝ KHÁCH VUI LÒNG CHUYỂN KHOẢN THEO STK THEO HƯỚNG DẪN
              NỘI DUNG CHUYỂN KHOẢN : <span style={{color: "red"}}>TÊN ĐĂNG NHẬP</span>
              </p>
            </a>
            <a onClick={(e)=>{
              e.preventDefault()
              setTypeActive(3)
              handleFetchList({
                status: "Canceled"
              })
            }} href="/record_transfer" className={`link-btn ${typeActive ===3? "active": ""}`}>
              <p>
               Nạp tiền thất bại
              </p>
            </a>
            <a onClick={(e)=>{
              e.preventDefault()
              setTypeActive(2)
              handleFetchListWithdraw()
            }} href="/record_withdraw" className={`link-btn ${typeActive ===2? "active": ""}`}>
              <p>
                Rút tiền
              </p>
            </a>
          </div> 
          {
            items.map(item=>(
              <div className="precautions">
                
                  <span>Ngày</span> 
                   <p>{moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>               
                   <span>Chi tiết</span>                           
                  <p>
                  <span style={{ color: "#fff"}} >Rút:</span>
                  <span style={{ fontWeight: "bold", marginLeft: "2px", color: "#fff"}}>Ví tiền</span>
                  </p>
                  
                  <p>
                  <span style={{ color: "#fff"}} >Tài khoản:</span>
                  <span style={{ marginLeft: "2px", color: "#fff"}}>{item.tentaikhoan}</span>
                  </p>
                  <p>
                  <span style={{ color: "#fff"}} >Số TK:</span>
                  <span style={{ marginLeft: "2px", color: "#fff"}}>{item.sotaikhoan}</span>
                  </p>
                  <p>
                  <span style={{ color: "#fff"}} >Trạng thái:</span>
                  <span style={{  marginLeft: "2px", color: "#fff"}}>{item.status ==="New" ? "Đang chờ xử lý" : item.status ==="Completed" ? "Đã nạp tiền thành công" : "Hủy bỏ"}</span>
                  </p>
                  <p>
                  <span style={{ color: "#fff"}} >Số lượng:</span>
                  <span style={{ marginLeft: "2px", color: "#fff"}}>{number_to_price(item.pointAmount)}</span>
                  </p>
          
              
              </div>
            ))
          }
         

         
         </div>
      
       </div>
     </div>
     </div>
     </div>

  </div>
   </>
  )
}
export default PanelRecordAll;