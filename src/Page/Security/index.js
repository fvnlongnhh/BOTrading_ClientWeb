import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import _ from "lodash"
import Service from './../../services/request'
import Loader from './../../components/Loader'
import { useDispatch } from 'react-redux'
import { HOST } from './../../constants/url'
const changepassword = 'changepassword'
const s2fSetup = 's2fSetup'
const kyc = 'kyc'
function Security(props) {
  const { member } = props
  const dispatch = useDispatch()
  const { username, token, userId, twoFACode } = member
  const [taskId, setTakId] = useState(changepassword)
  const [isVisible, setIsVisible] = useState(true)
  const [authCode, setAuthCode] = useState('')
  const [data, setData] = useState({
    username,
    password: "",
    newPassword: ""
  })
  useEffect(() => {
    setIsVisible(true)
    setTimeout(() => { setIsVisible(false) }, 500)
  }, [])

  function hanleLoading(id) {
    if (id !== kyc) {
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false);
        setTakId(id)
      }, 500)
    }
  }

  function onChange(e) {
    const { value, name } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  function handleChangePassword(params) {
    Service.send({
      method: 'post', path: 'User/changePasswordUser', data: params, headers: {
        authorization: `Bearer ${token}`
      }
    }).then(result => {
      if (result) {
        const { statusCode } = result
        if (statusCode === 200) {
          dispatch(({
            type: 'USER_DETAILS_UPDATE', data: {
              ...member,
              ...params
            }
          }))
          toast.success("Change Password in succesfully!")
          setData({
            username,
            password: "",
            newPassword: ""
          })
        }
      } else {
        toast.error("Your password invalid!")
      }
      setIsVisible(false)
    })
  }

  function handleVertify(params) {
    Service.send({
      method: 'post', path: 'User/verify2FA', data: params, headers: {
        authorization: `Bearer ${token}`
      }
    }).then(result => {
      if (result) {
        const { statusCode } = result
        if (statusCode === 200) {
          toast.success("2FA Setup Authentication Code succesfully!")
          setAuthCode('')
        }

      } else {
        toast.warning("Your authentication code incorret!")
      }
      setIsVisible(false)
    })
  }

  return (
    <section className="dashboard-outer pad-tp">
      <div className="dashboard-inner">
        <div className="dashboard-top">
          <div className="banner-sidebar">
            <ul>
              <li>
                <a href="/dashboard">
                  <img src="assets/images/dash-icon1.png" alt="" />
                </a>
              </li>
              <li>
                <a href="/profile">
                  <img src="assets/images/dash-icon2.png" alt="" />
                </a>
              </li>
              <li>
                <a href="/security">
                  <img src="assets/images/dash-icon3.png" alt="" />
                </a>
              </li>
              <li>
                <a href="/history">
                  <img src="assets/images/dash-icon4.png" alt="" />
                </a>
              </li>
            </ul>
          </div>
          <div className="dashboard-top-right dashboard-top-rightts">
            <div className="dashboard-tab-left">
              <div className="tabs-outer">
                <div className="tab">
                  <button onClick={() => { hanleLoading(changepassword) }} className={`tablinks ${taskId === changepassword ? "active" : null}`} >Change Password</button>
                  <button onClick={() => { hanleLoading(kyc) }} className={`tablinks ${taskId === kyc ? "active" : null}`}>KYC</button>
                  <button onClick={() => { hanleLoading(s2fSetup) }} className={`tablinks ${taskId === s2fSetup ? "active" : null}`}> 2FA Setup</button>
                </div>
                <div id="password_change-tabcontent" className={`tabcontent ${taskId === changepassword ? "active" : null}`}>
                  <div className="tab-content">
                    <div className="tab-left tab-lefts">
                      <form>
                        <div className="name-fields">
                          <label>Your Current Password</label>
                          <input value={data.password} onChange={(e) => { onChange(e) }} name="password" type="password" placeholder="Enter current password" required className="textfield" />
                        </div>
                        <div className="name-fields">
                          <label>New Password</label>
                          <input value={data.newPassword} onChange={(e) => { onChange(e) }} name="newPassword" type="password" required placeholder="Enter new password" className="textfield" />
                        </div>
                        <div className="name-fields">
                          <label>Re-type New Password</label>
                          <input value={data.newPasswordRepeat} onChange={(e) => { onChange(e) }} name="newPasswordRepeat" type="password" required placeholder="Re-type new password" className="textfield" />
                        </div>
                        {/* <div className="name-fields">
                          <label>2FA</label>
                          <input onChange={(e) => { onChange(e) }} name="tfa" type="text" required placeholder="Enter 2FA code" className="textfield" defaultValue />
                        </div> */}
                        <div className="name-fields">
                          <label />
                          <input onClick={(e) => {
                            e.preventDefault()
                            if (!data.newPassword && data.newPassword === '') {
                              toast.warn("New password was empty!")
                            } else if (data.newPassword !== data.newPasswordRepeat) {
                              toast.warn("Re-type new password din't match")
                            } else {
                              const newData = { ...data }
                              delete newData['newPasswordRepeat']
                              handleChangePassword(newData)
                            }

                          }} type="submit" className="submit-button mgt-38 mg-0" defaultValue="update" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div id="kyc-tabcontent" className={`tabcontent ${taskId === kyc ? "active" : null}`} >
                  <div className="tab-content">
                    <div className="card-outer">
                      <div className="card-left">
                        <div className="file-upload">
                          <div className="image-upload-wrap">
                            <input className="file-upload-input" type="file" accept="image/*" />
                            <div className="drag-text">
                              <img src="images/upload-icon.png" alt="upload" />
                              <h3>
                                <p>click here to upload an image</p>
                                <p>Document Front.jpg Maximum File Size is 12 MB</p>
                              </h3>
                            </div>
                          </div>
                          <button className="file-upload-btn" type="button">upload</button>
                          <div className="file-upload-content">
                            <img className="file-upload-image" src="#" alt="your" />
                            <div className="image-title-wrap">
                              <button type="button" className="remove-image">Remove
                              <span className="image-title">Uploaded Image</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="2fa-tabcontent" className={`tabcontent ${taskId === s2fSetup ? "active" : null}`}>
                  <div className="tab-content">
                    <div>
                      <div style={{ paddingRight: '20px' }} className="tab-left security-left">
                        <form action method="post">
                          <div className="name-fields name-fieldsd">
                            <label>2FA Secret</label>
                            <input disabled name="secret" type="text" className="textfield" value={twoFACode} />
                            <input type="button" className="copy-button copy-buttonss" />
                          </div>
                          <div className="name-fields name-fieldsd">
                            <label>2FA Setup: Enter Authentication Code</label>
                            <input onChange={(e) => {
                              const { value } = e.target
                              setAuthCode(value)
                            }} value={authCode} name="authCode" type="text" placeholder="Authentication code" className="textfield" />

                            <input style={{ marginTop: '20px' }} onClick={(e) => {
                              e.preventDefault();
                              handleVertify(
                                {
                                  otpCode: authCode,
                                  id: userId
                                }
                              )
                            }} type="button" className="submit-button" defaultValue="ENABLE 2FA" />
                          </div>
                        </form>
                      </div>
                      <div className="tab-rightts">
                        <img src={`${HOST}User/get2FACode?userId=${userId}`} alt="2fa-secret" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isVisible ? <Loader /> : null}
    </section>
  )
}
export default Security;