import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
// import { validateEmail } from './../../helper/common'
import Service from './../../services/request'
import ReCAPTCHA from "react-google-recaptcha";


function Register(props) {
  const { className, location } = props
  const search = location.search
  const params = new URLSearchParams(search);
  const [data, setData] = useState({
    check: true,
    referUser: params.get("refer") || ""
  })
  const [captCha, setCaptCha] = useState()
  const dispatch = useDispatch()
  useEffect(() => {
    const bodyId = document.getElementById("body-root")
    bodyId.classList.remove("homePage");
    if (className !== '') {
      bodyId.classList.add(className)
    } else {
      bodyId.classList.toggle('id');
    }
  }, [className])

  function handleLogin(e){
    e.preventDefault()
    if (isValidDate()) {
      const newData = {}
      Object.keys(data).forEach(key => {
        if (key !== 'confirm_password' && key !== 'check' ) {

          newData[key] = data[key]
        }
      })
      

      Service.send({ method: 'post', path: 'User/registerUser', data: newData }).then(result => {
        if (result) {
          const { statusCode, message } = result;
          if (statusCode === 200) {
            window.sweetAlert(
              '',
              'Tạo tài khoản thành công',
              'success'
            )
            setTimeout(() => {
              props.history.push('/')
            }, 1000)
          } else {
            if (message === "DUPLICATE_USER") {
              window.sweetAlert(
                '',
                'Tên đăng nhập không hợp lệ hoặc đã tồn tại',
                'warning'
              )
            } else if (message === "INVALID_REFER_USER"){
              window.sweetAlert(
                '',
                'Người giới thiệu không hợp lệ',
                'warning'
              )
            } else {
              window.sweetAlert(
                '',
                'Đăng ký thất bại',
                'warning'
              )
            }
          }
        } else {
          window.sweetAlert(
            '',
            'Đăng ký thất bại',
            'warning'
          )
        }
      })
    }
  }

  function isValidDate() {
    let check = true
    let message = 'Invalid parameters. Please try again.'
    if(!captCha){
      message="Mã xác nhận"
      check = false
    }

    if (!data['firstName'] || data['firstName'] === '') {
      message="Nhập tên thật"
      check = false
    }else if (!data['username'] || data['username'] === '') {
      message="Nhập tên tài khoản"
      check = false
    } 
    // else if (!data['email'] || data['email'] === '') {
    //   message="Nhập email"
    //   check = false
    // } 
    else if (!data['password'] || data['password'] === '') {
      message= "Nhập mật khẩu"
      check = false
    } else if (!data['phoneNumber'] || data['phoneNumber'] === '') {
      message= "Số điện thoại di động"
      check = false
    } else if (!data['confirm_password'] || data['confirm_password'] === '') {
      message= "Nhập lại mật khẩu"
      check = false
    }else if (!data['check'] || data['check'] === '') {
      message= "Xác nhận rằng tôi đủ 18"
      check = false
    }else if (!data['referUser'] || data['referUser'] === '') {
      message= "Nhập người giới thiệu"
      check = false
    }

    if(data['username']  && data['username'].length <5){
      message="Tên tài khoản phải hơn 6 ký tự"
    }

    if (check) {
      if (data['password'] !== data['confirm_password']) {
        check = false
        message = 'Mật khẩu với xác nhận mật khẩu không trùng khớp'
      } 
      // else if (!validateEmail(data['email'])) {
      //   check = false
      //   message = 'Email không hợp lệ'
      // }
    }
    if (!check) {
      
      window.sweetAlert(
        '',
        message || 'Đã có lỗi xảy ra',
        'warning'
      )
      
    }
    return check
  }

  function onChange(e) {
    const { value, name } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  return (
    <main className="main">
       <div className="full-page">
        <div className="web-center-block register">
          <div className="enter-frame" style={{textAlign: 'center'}}> <img src="img/nunu/logo.png" alt="logo" className="enter-logo" />
            <h1 style={{color: '#fff'}}>Thành viên đã đăng ký</h1>
           
            <form action="/ajax/register" className="register_form" method="post">
              <div className="text-block">
                <p style={{marginTop: 0}}> Để bảo vệ quyền lợi của mình , thành viên phải đăng ký họ tên theo CMND và tải khoản ngân hàng là
cùng một người. Vui lòng sử dụng Số Điện Thoại cá nhân. Không được sử dụng nhiều danh tính để
đăng ký tài khoản với số lượng lớn dẫn đến trùng thông tin, khi đó gây ảnh hưởng hệ thống ( Nếu có
rủi ro mất tiền khi trùng lắp thông tin , công ty sẽ không chịu trách nhiệm ). </p>
              </div>
              <div className="input-block-area">
                <div className="input-block">
                  <label htmlFor className="title">Họ và Tên</label>
                  <input onChange={(e) => { onChange(e) }} name="firstName" type="text" className="input-content" value={data.firstName} placeholder="Nhập họ và tên" required maxLength={50} /> </div>
                <div className="input-block">
                  <label htmlFor className="title">Số điện thoại di động</label>
                  <input onChange={(e) => { onChange(e) }} value={data.phoneNumber} name="phoneNumber" type="text" className="input-content" placeholder="Nhập số có thể nhận SMS"  required maxLength={11} /> </div>
              </div>
              {/* <div class="input-block-area"> */}
              <div className="input-block">
                <label htmlFor className="title">Tên đăng nhập</label>
                <input onChange={(e) => { onChange(e) }} name="username"  value={data.username} type="text"  className="input-content" placeholder="6 ~ 20 sự kết hợp của các số" autoComplete="new-password"  required minLength={6} maxLength={20} /> </div>
                {/* <div className="input-block">
                <label htmlFor className="title">Email</label>
                <input onChange={(e) => { onChange(e) }} name="email"  value={data.email} type="email"  className="input-content" placeholder="Nhập email" autoComplete="new-password"  required  /> </div> */}
              {/* </div> */}
              <div className="input-block-area">
                <div className="input-block">
                  <label htmlFor className="title">Mật khẩu</label>
                  <input onChange={(e) => { onChange(e) }} name="password" value={data.password}  type="password" className="input-content" placeholder="Nhập mật khẩu" autoComplete="new-password"  minLength={3}  required maxLength={40} /> </div>
                <div className="input-block">
                  <label htmlFor className="title">Nhập lại mật khẩu</label>
                  <input onChange={(e) => { onChange(e) }} name="confirm_password" value={data.confirm_password}  type="password"  className="input-content" placeholder="Nhập mật khẩu" autoComplete="new-password" minLength={3}  required maxLength={40} /> </div>
              </div>
              <div className="input-block">
                <label htmlFor>Người giới thiệu</label>
             
                <div className="input-block communication-software">
                  <input name="contact_type" type="hidden"  />
                  <input onChange={(e) => { onChange(e) }} name="referUser"   value={data.referUser}   type="text" placeholder="Người giới thiệu" maxLength={30} /> </div>
              
              </div>
              <div className="input-block">
                <label htmlFor>ZaloID</label>
             
                <div className="input-block communication-software">
                  <input name="contact_type" type="hidden"  />
                  <input onChange={(e) => { onChange(e) }} name="zaloId"   value={data.zaloId}   type="text" placeholder="ZaloID" maxLength={30} /> </div>
              
              </div>
              <div className="input-block">
                <div className="input-verification-code-block">
                  <label htmlFor className="title">Mã xác nhận</label>
                  <div style={{paddingTop: "10px"}} className="verification">
                    <ReCAPTCHA
                      sitekey="6LdWVj4dAAAAAFxKrl6fVeW27wgzPs9b5VdzlfLD"
                      onChange={(value)=>{
                        setCaptCha(value)
                      }}
                    />
                  </div>
                </div>
              </div>
             
              <div className="text-block">
              <input onChange={(e) => { 
                setData({
                  ...data,
                  check: e.target.checked
                })
                
              }} name="check" checked={data.check}    type="checkbox" className="checkbox" />Xác nhận rằng tôi đủ 18 tuổi trở lên và tất cả các hoạt động trên trang web này không vi phạm pháp luật do quốc gia nơi tôi sinh sống. Tôi cũng chấp nhận tất cả các quy tắc và quy định liên quan và tuyên bố về quyền riêng tư trong ứng dụng này. <a href="/policy"> Cam kết bảo mật</a> </div>
              <button onClick={(e)=>{ handleLogin(e)}}  className="btn1 login-btn submit" data-loading-text="Chế biến...">Đăng ký</button>
              <div className="link-area"> <a href target="_blank">Dịch vụ chăm sóc khách</a> <a href="/login">Đăng nhập</a> </div>
             
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
export default Register;