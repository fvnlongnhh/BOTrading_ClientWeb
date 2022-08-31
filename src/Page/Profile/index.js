import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import _ from "lodash"
import { useDispatch } from 'react-redux'
import Service from './../../services/request'
import Loader from './../../components/Loader'
import moment from 'moment'


function Profile(props) {
  const { member } = props
  const { createdAt, lastActiveAt, userId, token, twoFACode } = member
  const [data, setData] = useState({})
  const [isVisible, setIsVisible] = useState(true)
  const dispatch = useDispatch()

  function onChange(e) {
    const { value, name } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  function isValidDate() {
    let check = true
    let message = 'Invalid parameters. Please try again.'


    if (!data['firstName'] || data['firstName'] === '') {
      check = false
    } else if (!data['lastName'] || data['lastName'] === '') {
      check = false
    } else if (!data['phoneNumber'] || data['phoneNumber'] === '') {
      check = false
    }

    // if (check) {
    //   if (!validateEmail(data['email'])) {
    //     check = false
    //     message = 'Email invalid'
    //   }
    // }
    if (!check) {
      toast.error(message)
    }
    return check
  }


  useEffect(() => {
    setIsVisible(true)
    setTimeout(() => { setIsVisible(false) }, 500)
  }, [])

  useEffect(() => {
    const newData = {
      // email: member.email,

      firstName: member.firstName,
      userAvatar: member.userAvatar,
      lastName: member.lastName,
      phoneNumber: member.phoneNumber,
      limitWithdrawDaily: member.limitWithdrawDaily && member.limitWithdrawDaily !== "null" ? member.limitWithdrawDaily : 0,
      active: member.active && member.active !== "null" ? member.active : 0
    }
    setData(newData)
  }, [member])


  return (
    <section className="dashboard-outer pad-tp">
      <div className="dashboard-inner">
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
        <div className="profl">
          <div className="auto-container">
            <div className="profile-outer">
              <div className="profile-top">
                <form>
                  <img src={`${data.userAvatar && data.userAvatar !== '' ? data.userAvatar : "assets/images/big-user.png"}`} alt="" />
                  <div className="file-fields">
                    <label htmlFor="dvd_image" className="dvd-n">No File Chosen</label>
                    <input onChange={(e) => {
                      const { files } = e.target
                      const file = files[0]
                      const newMimType = file.type.replace('image/', '')
                      const filename = [...Array(8)].map(_i => (~~(Math.random() * 36))).join('') + `.${newMimType}`;
                      // const path = `/assets/images/${filename}`;



                      // console.log(fs, 2423)
                      // fs.mkdir(path, file, function (error) {
                      //   if (error) {
                      //     toast.error("Upload avatar fail!")
                      //   }

                      //   setData({
                      //     ...data,
                      //     userAvatar: `${window.location.hostname}+${path}`
                      //   })
                      // });

                      console.log(files)
                    }} name="userAvatar" type="file" id="file-upload" placeholder className="textfield" mutiple />
                  </div>
                  <p>(JPEG Or PNG 500x500px Thumbnail)</p>
                </form>
              </div>
              <div className="profile-form">
                <form>

                  {/* <div className="name-fields">
                    <label>Email Address</label>
                    <input onChange={(e) => { onChange(e) }} name="email" type="email" readOnly className="textfield" required value={data.email} />
                  </div> */}
                  <div className="name-fields">
                    <label>First Name</label>
                    <input onChange={(e) => { onChange(e) }} name="firstName" type="text" className="textfield" required value={data.firstName} />
                  </div>
                  <div className="name-fields">
                    <label>Last Name</label>
                    <input onChange={(e) => { onChange(e) }} name="lastName" type="text" className="textfield" required value={data.lastName} />
                  </div>
                  <div className="name-fields">
                    <label>Phone Number</label>
                    <input onChange={(e) => { onChange(e) }} name="phoneNumber" type="text" required className="textfield" value={data.phoneNumber} />
                  </div>
                  <div className="name-fields">
                    <label>Telegram username (@ ...)</label>
                    <input onChange={(e) => { onChange(e) }} name="telegramId" type="text" required className="textfield" />
                  </div>
                  <div className="name-fields">
                    <label>2FA</label>
                    <input disabled onChange={(e) => { onChange(e) }} value={twoFACode !== 'null' ? twoFACode : ''} name="twoFACode" type="text" required className="textfield" />
                  </div>
                  <div className="name-fields">
                    <label />
                    <input onClick={(e) => {
                      setIsVisible(true)
                      e.preventDefault()
                      if (isValidDate()) {
                        Service.send({
                          method: 'post', headers: {
                            authorization: `Bearer ${token}`
                          }, path: 'User/updateUserById', data: {
                            id: userId,
                            data
                          }
                        }).then(result => {
                          if (result) {
                            const { statusCode, data, message } = result
                            if(statusCode ===200){
                              dispatch(({
                                type: 'USER_DETAILS_UPDATE', data: {
                                  ...member,
                                  ...data
                                }
                              }))
                              toast.success("Edit Profile in succesfully!")
                            } else {
                              toast.error("Somthing was wrong !")
                            }
                          } else {
                            toast.error("Somthing was wrong !")
                          }
                          setIsVisible(false)
                        })
                      } else {
                        setIsVisible(false)
                      }

                    }} type="submit" className="edit-button mg-23" defaultValue="Edit & update" />
                  </div>
                </form>
              </div>
              <div className="profile-bottom">
                <div className="profile-lft">
                  <a href="/profile">Registered On</a>
                  <p>{moment(createdAt).format('lll')} </p>
                </div>
                <div className="profile-lft profile-rt">
                  <a href="/profile">Last Logged In</a>
                  <p>{moment(lastActiveAt).format('lll')}</p>
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
export default Profile;