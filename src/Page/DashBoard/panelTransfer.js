import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import Service from './../../services/request'
import { useDispatch } from 'react-redux'

function PanelStore(props) {
  const user = useSelector((state)=> state.member)
  const dispatch = useDispatch()
  const DEFAULT_DATA_USER ={
    phoneNumber: user.phoneNumber,
    firstName: user.firstName,
  }

  const DEFAULT ={
    username: user.username,
    password: "",
    newPassword: ""
  }
  const [data, setData] = useState(DEFAULT)
  const [userData, setUserData] = useState(DEFAULT_DATA_USER)

  function handleSubmit(){
    let check = true
    Object.keys(data).forEach(key=>{
      if( !data[key] || data[key] ==="" ){
        check = false
      }
    })
   
    if(check){
      Service.send({
        method: 'post', path: 'User/changePasswordUser', data,
      }).then(result => {
        if (result) {
          const { statusCode, message } = result
          if (statusCode === 200) {
            window.sweetAlert(
              '',
              'Cập nhật thành công',
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
            'Xảy ra lỗi. Vui lòng thử lại sau',
            'warning'
          )
         setData(DEFAULT)
        }
      })
    }else{
      window.sweetAlert(
        '',
        'Vui lòng điền vào tất cả các vị trí',
        'warning'
      )
    }
  
  }

  function handleSubmitUser(){
    let check = true
    Object.keys(userData).forEach(key=>{
      if( !userData[key] || userData[key] ==="" ){
        check = false
      }
    })
  
    if(check){
      Service.send({
        method: 'post', path: 'User/updateUserById', data : { id: user.userId, data: userData},
      }).then(result => {
        if (result) {
          const { statusCode, message } = result
          if (statusCode === 200) {
            window.sweetAlert(
              '',
              'Cập nhật thành công',
              'success'
            )
          
          
              dispatch(({ type: 'USER_DETAILS_UPDATE', data: {
                ...user,
                ...userData
              } }))
            
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
      window.sweetAlert(
        '',
        'Vui lòng điền vào tất cả các vị trí',
        'warning'
      )
    }
  
  }

  function onChange(e) {
    const { value, name } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  function onChangeUser(e) {
    const { value, name } = e.target
    setUserData({
      ...userData,
      [name]: value
    })
  }


  return (
   <>
  <div className="area " id="store">
 
     <div className="index-page"> <div className="mobile-title mobile-show">
       <h2>Thông tin cá nhân</h2>
     </div>
     {/* <div className="mobile-title-space mobile-show" />  */}
     <div className="parent-content">
      <div className="content">
        <div className="form">
         <div className="right">
           <div className="member_form" action="/ajax/edit" method="POST">
         
           <div className="input-block">
               <label htmlFor className="title">Tên thật</label>
               <input onChange={(e) => { onChangeUser(e) }} value={userData.firstName}  name="firstName" type="text" required placeholder="Nhập mật tên" className="input-content" />
             </div>
             <div className="input-block">
               <label htmlFor className="title">Số điện thoại</label>
               <input onChange={(e) => { onChangeUser(e) }} value={userData.phoneNumber}  name="phoneNumber"  type="text" required placeholder="Số điện thoại" className="input-content" />
             </div>
            
             <button onClick={(e)=>{
               e.preventDefault()
               handleSubmitUser()
             }} className="submit btn btn-store">Cập nhật</button>
             <hr style={{marginBottom:"20px"}}></hr>
             <div className="input-block">
               <label htmlFor className="title">Đổi mật khẩu</label>
               <input onChange={(e) => { onChange(e) }} value={data.password}  name="password" type="password" maxLength={20} required placeholder="Nhập mật khẩu" className="input-content" />
             </div>
             <div className="input-block">
               <label htmlFor className="title">Xác nhận mật khẩu</label>
               <input onChange={(e) => { onChange(e) }} value={data.newPassword}  name="newPassword" maxLength={20} type="password" required placeholder="Nhập mật khẩu mới" className="input-content" />
             </div>
            
             <button onClick={(e)=>{
               e.preventDefault()
               handleSubmit()
             }} className="submit btn btn-store">Cập nhật</button>
           </div>
         </div>
         <div className="left">
           <div className="precautions">
             <h4>Ghi chú:</h4>
             <p>Trong trường hợp không thể thay đổi thông tin, quý khách vui lòng liên hệ với nhân viên chămsóc khách hàng!</p>
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