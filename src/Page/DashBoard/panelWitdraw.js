// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Service from './../../services/request'
import { number_to_price } from "../../helper/common"
import { convertFileToBase64 } from '../../helper/common';

function PanelTransfer(props) {
  const user = useSelector((state)=> state.member)
  const DEFAULT ={
    userId: user.userId,
    pointAmount: "",
    // hinhxacnhan: ""
  }
  const [data, setData] = useState(DEFAULT)
  

  function handleSubmit(){
    let check = true
    Object.keys(data).forEach(key=>{
      if( !data[key] || data[key] ==="" ){
        check = false
      }
    })
    if(data.pointAmount < 100000 || data.pointAmount > 99000000000){
      check= false
    }
    if(!user.tentaikhoan || !user.sotaikhoan || !user.tennganhang || user.tentaikhoan ==="" ||  user.sotaikhoan === "" || user.tennganhang === ""){
      window.sweetAlert(
        '',
        'Vui lòng cập nhật thông tin tài khoản',
        'warning'
      )
    }else{
      if(check){
        Service.send({
          method: 'post', path: 'WithdrawTransaction/insert', data,
        }).then(result => {
          if (result) {
            const { statusCode, message } = result
            if (statusCode === 200) {
              window.sweetAlert(
                '',
                'Nạp rút thành công',
                'success'
              )
              setData(DEFAULT)
            }else{
              window.sweetAlert(
                '',
                message || 'Đã có lỗi xảy ra',
                'warning'
              )
            }
          } else{
            window.sweetAlert(
              '',
              'Đã có lỗi xảy ra',
              'warning'
            )
           setData(DEFAULT)
          }
        })
      }else{
        if(data.pointAmount < 1000000){
          window.sweetAlert(
            '',
            'Sốt tiền vượt quá giới hạn',
            'warning'
          )
        } 
        // else if(!data.hinhxacnhan || data.hinhxacnhan===""){
        //   window.sweetAlert(
        //     '',
        //     'Vui lòng nhập hình ảnh xác nhận',
        //     'warning'
        //   )
        // }
        else{
          window.sweetAlert(
            '',
            'Vui lòng điền vào tất cả các vị trí',
            'warning'
          )
        }
       
      }
    }
    
  }


  function onChange(e) {
    const { value, name } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  function handleUpload(imageString, name){
    Service.send({
      method: 'post', path: 'Upload/uploadMediaFile', data: {
        imageData: imageString,
        imageFormat: "png"
      },
    }).then(result => {
      if (result) {
        const { statusCode, data: imageData } = result
        if (statusCode === 200) {
          setData({
            ...data,
            [name]: imageData
          })
          
        }
      } 
    })
  }


  return (
   <>
  <div className="area " id="store">
 
     <div className="index-page"> <div className="mobile-title mobile-show">
       <h2>Rút tài sản</h2>
     </div>
     {/* <div className="mobile-title-space mobile-show" />  */}
     <div className="parent-content">
      <div className="content">
      <div className="form">
      <div className="right">
           <h2 style={{display: 'none'}}>Dự án đầu tư <i className="fas fa-sync-alt fresh-btn" aria-hidden="true" />
           </h2>
           <ul className="gamelist">
             
             <li>
               <div att-id={34} className="gamename">Ví tiền</div>
                <div className="money getCredit-js" name="VVGame2">{user  &&user.wallets &&user.wallets[0] ? number_to_price(user.wallets[0].balance) : "0.0"}</div>
             </li>
           </ul>
         </div>
         <div className="left">
           <div action="/ajax/store" method="POST" className="store_form">
             <div className="input-block">
               <label htmlFor className="title">Rút tiền bằng phương pháp : Internet Banking</label>
               <select name="src_id" className="input-content">
                 <option value={2}>ATM</option>
               </select>
               <span>Giới hạn số tiền rút tối thiểu : 500.000 VND </span>
             </div>
             <input type="hidden" name="tar_id" defaultValue={1} />
             <div className="input-block">
               <label htmlFor className="title">Nhập số tiền</label>
               <input onChange={(e) => { onChange(e) }} name="pointAmount" type="text" className="input-content" placeholder="Nhập số tiền" id="amount"  value={data.pointAmount} />
             </div>
            
              {/* <div className="input-block">
                <label className="title">Hình ảnh xác nhận</label>             
                <input  accept="image/*" onChange={e => {
                  const file = e.target.files[0]
                  convertFileToBase64(file).then(dataUrl => {
                    const newData = dataUrl.replace(/,/gi, '').split('base64')
                    if (newData[1]) {
                      handleUpload(newData[1], "hinhxacnhan")
                    }
                  })
                }} type="file"  /> 
               {
                 data.hinhxacnhan && data.hinhxacnhan !=="" ? <a className="link" href={data.hinhxacnhan}  target="_blank">Link Ảnh</a>:null
               }
                  
              </div> */}
           
             <button onClick={(e)=>{ e.preventDefault();  handleSubmit()}} type="button" className="btn submit btn-store">Rút tiền</button>
           </div>
           <div className="precautions">
             <h4>Ghi chú:</h4>
             <ol>
               <li>Cùng một tài khoản / gia đình / địa chỉ hộ gia đình / số điện thoại / địa chỉ IP / máy tính dùng chung / môi trường mạng được coi là cùng một thành viên. Nếu nhiều tài khoản và cùng một IP được hỏi và tài khoản không rõ ràng, tất cả chúng sẽ bị coi là gian lận tạm ngưng tài khoản. </li>
               <li> Đảm bảo xác nhận số tài khoản. Nếu số tài khoản sai, công ty chúng tôi không thể chịu trách nhiệm. Sau khi thành viên tham gia lần đầu tiên sẽ bị ràng buộc vĩnh viễn và không được thay đổi tùy ý. </li>
               <li> Bộ phận kiểm soát rủi ro của công ty sẽ xem xét lại, vui lòng không vi phạm quy định. </li>
               <li> Công ty có quyền xem xét tài khoản thành viên hoặc chấm dứt vĩnh viễn các dịch vụ của thành viên mà không cần thông báo trước. </li>
               <li> Nếu phản hồi chậm do các yếu tố internet, hãy kiên nhẫn. </li>
               <li> Các hành động quá thường xuyên sẽ được hệ thống tự động lọc ra.</li>
             </ol>
           </div>
         </div>
      
        <div className="left">
          <div className="precautions">
            <h4>Ghi chú:</h4>
            <ol>
              <li>Sau khi thành viên điền số tài khoản lần đầu tiên sẽ bị ràng buộc vĩnh viễn mà không có bất kỳ sự thay đổi nào. </li>
              <li> Để ngăn những người quan tâm sử dụng trang web này như một công cụ gian lận: Vui lòng xác nhận thông tin tài khoản của bạn trước khi đăng ký. </li>
              <li> Nếu bạn cần thay đổi thông tin vì lý do cần thiết, vui lòng liên hệ với nhân viên dịch vụ khách hàng. </li>
              <li> Nếu bạn sử dụng nền tảng này để thực hiện bất kỳ hành vi gian lận rửa tiền nào, công ty có quyền xem xét tài khoản thành viên hoặc chấm dứt vĩnh viễn các dịch vụ của thành viên mà không cần thông báo trước. </li>
            </ol>
          </div>
        </div>
      </div>
     </div>
     </div>
     </div>

  </div>
   </>
  )
}
export default PanelTransfer;