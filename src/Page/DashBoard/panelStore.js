import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Service from './../../services/request'
import { number_to_price } from "../../helper/common"
import { convertFileToBase64 } from '../../helper/common';

function PanelStore(props) {
  const user = useSelector((state)=> state.member)
  const DEFAULT ={
    userId: user.userId,
    pointAmount: "",
    // hinhxacnhan: ""
  }
  const [data, setData] = useState(DEFAULT)
  const [items, setItems] = useState([])


  useEffect(()=>{
    handleFetchList()
  },[])

  function handleSubmit(){
    let check = true
    Object.keys(data).forEach(key=>{
      if( !data[key] || data[key] ==="" ){
        check = false
      }
    })
    if(data.pointAmount < 0){
      check= false
    }
    ////Nạp tiền không cần kiểm tra thông tin tài khoản
    // if(!user.tentaikhoan || !user.sotaikhoan || !user.tennganhang || user.tentaikhoan ==="" ||  user.sotaikhoan === "" || user.tennganhang === ""){
    //   window.sweetAlert(
    //     '',
    //     'Vui lòng cập nhật thông tin tài khoản',
    //     'warning'
    //   )
    // }
    // else
    //{
      if(check){
        Service.send({
          method: 'post', path: 'DepositTransaction/insert', data,
        }).then(result => {
          if (result) {
            const { statusCode, message } = result
            if (statusCode === 200) {
              // window.sweetAlert(
              //   '',
              //   'Nạp tiền thành công',
              //   'success'
              // )
              window.sweetAlert({
                title: "Nạp tiền thành công",
                html: true,
                customClass: "sweetCustorm",
                text: `
                <p>
                Lệnh nạp tiền đã được gửi đi<br></br>
                Quý khách vui lòng chuyển khoản theo STK như hướng dẫn<br></br>
                Nội dung chuyển khoản: <br></br><span style="color:red;font-weight:bold">Tên đăng nhập</span>
                </p>
                `,
                icon: "warning",
                confirmButtonColor: '#835D33',
                confirmButtonText: 'Xác nhận',
                closeOnConfirm: true,
              },(isOke)=>{
                if(isOke){
                  setData(DEFAULT)
                }                                  
              })
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
              'Xảy ra lỗi. Vui lòng thử lại sau',
              'warning'
            )
           setData(DEFAULT)
          }
        })
      }else{
        if(data.pointAmount < 0){
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
    //}
    
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


  function handleFetchList() {
    Service.send({
      method: 'POST', path: 'UserPaymentMethod/getList', data: {
        filter: {
         
        },
        skip: 0,
        limit: 20,
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

  function onChange(e) {
    const { value, name } = e.target
    setData({
      ...data,
      [name]: value
    })
  }
  return (
   <>
  <div className="area " id="store">
 
     <div className="index-page"> <div className="mobile-title mobile-show">
       <h2>Nạp tài sản</h2>
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
               <label htmlFor className="title">Nhận tiền bằng phương pháp : Internet Banking</label>
               <select name="src_id" className="input-content">
                 <option value={2}>ATM</option>
               </select>
               {/* <span> ATM Giới hạn chuyển, Giới hạn tiền gửi từ: 1000000 </span> */}
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
                  
              </div> 
            */}
             <button onClick={(e)=>{ e.preventDefault();  handleSubmit()}} type="button" className="btn submit btn-store">Xác nhận</button>
           </div>
           <div>
             <div className="title__naptien">Phương thức nạp tiền:</div>
             <div className="content__naptien">Sau khi nhập số tiền và xác nhận</div>
             <div className="content__naptien">Vui lòng chuyển khoản vào số tài khoản bên dưới</div>
            <div  className="content__naptien">
              <span className="content__naptien">Theo nội dung:</span> <span className="content__naptien-2">Tên đăng nhập</span>
            </div>
             <div style={{marginBottom: 20}} className="content__naptien">Ví điện tử hệ thống sẽ tự động cập nhật</div>
           </div>
          {
            items.map(item=>(
              <div className="precautions">
               <div className="input-block">
                  <label htmlFor className="title">Số tài khoản: </label>
                  {item.userPaymentMethodIdentityNumber}
                </div>
                <div className="input-block">
                  <label htmlFor className="title">Tên tài khoản: </label>
                  {item.userPaymentMethodReceiverName}
                 
                </div>
                <div className="input-block">
                  <label htmlFor className="title">Ngân hàng: </label>
                  {item.userPaymentMethodReferName}
                </div>
              </div>
            ))
          }
         

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
      
       </div>
     </div>
     </div>
     </div>

  </div>
   </>
  )
}
export default PanelStore;