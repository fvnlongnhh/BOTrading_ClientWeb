import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import Service from './../../services/request'
import Loader from './../../components/Loader'
function ForgetPass(props) {
  const [data, setData] = useState({ username: '' })
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()

  return (
    <section className="login-outer pad-tp">
      <div className="login-innr">
        <div className="login-inner">
          <div className="login-left">
            <img src="assets/images/login-left-img.png" alt="" />
          </div>
          <div className="login-right">
            <h1>Forgot Password</h1>
            <p>We will send you an email to Reset Your Password!</p>
            <div className="forgot-outer">
              <form>
                <div className="name-fields">
                  <input onChange={(e) => {
                    e.preventDefault()
                    const { name, value } = e.target
                    setData({
                      ...data,
                      [name]: value
                    })
                  }} name="username" type="text" placeholder="Username" className="textfield" />
                  <input onClick={(e) => {
                    e.preventDefault()
                    setIsVisible(true)
                    if (data.username === '') {
                      toast.error('Please fill all mendatory fields')
                      setTimeout(() => {
                        setIsVisible(false)
                      }, 500)
                    } else {
                      Service.send({ method: 'post', path: 'User/resetPasswordUser', data }).then(result => {
                        if (result) {
                          const { statusCode } = result
                          if (statusCode === 200) {

                            toast.success("We sent you an email to Reset Your Password ")

                          }
                        } else {
                          toast.error("Your username was'nt corret !")
                        }
                        setIsVisible(false)
                      })


                    }
                  }} type="submit" className="get-button" defaultValue="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isVisible ? <Loader /> : null}
    </section>
  )
}
export default ForgetPass;