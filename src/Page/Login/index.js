import React, { useEffect , useState} from 'react';
import { useDispatch } from 'react-redux'
import Service from './../../services/request'

function Login(props) {
  const { className } = props
  const [data, setData] = useState({ username: '', password: '' })
  const [ textData, setTextData] = useState('')
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
    Service.send({
      method: 'post', path: 'User/loginUser', data,
    }).then(result => {
      if (result) {
        const { statusCode, data, message } = result
        
        if (statusCode === 200) {
          dispatch(({ type: 'USER_LOGIN', data: data }))
          setTimeout(() => {
            window.location.href ="/trade"
          }, 500)
        }else{
          window.sweetAlert(
            '',
            message ||'Mật khẩu hoặc tài khoản không đúng',
            'warning'
          )
        }

      } else {   
        window.sweetAlert(
          '',
          'Mật khẩu hoặc tài khoản không đúng',
          'warning'
        )
      }
      
    })
    
  }

  function handleGetText(){
    Service.send({
      method: 'post', path: 'Maintain/getSystemStatus',
    }).then(result => {
      if (result) {
        const { statusCode, data, message } = result
        if(statusCode ===200){
          setTextData(data.maintainMessage)
        }
      } 
      
    })
  }

  useEffect(()=>{
    handleGetText()
  },[])

  return (
    <main className="main">
      <div className="login_form full-page">
      	<div className="web-center-block">
      		<div className="enter-frame" style={{textAlign: 'center'}}> <img src="img/nunu/logo.png" alt="logo" className="enter-logo" />
      			<h1 style={{color: '#fff'}}>Đăng nhập</h1>
      			{/* <form action="/ajax/login" method="POST"> */}
      				<div className="input-block">
      					<label htmlFor className="title">Tên tài khoản</label>
                <input
                 onChange={(e) => {
                  e.preventDefault()
                  const { name, value } = e.target
                  setData({
                    ...data,
                    [name]: value
                  })
                }} 
                type="text" value={data.username}  className="input-content" placeholder="Điền tên đăng nhập" name="username" autoComplete="new-password" /> </div>
      				<div className="input-block">
      					<label htmlFor className="title">Mật khẩu</label>
                <input 
                 onChange={(e) => {
                  e.preventDefault()
                  const { name, value } = e.target
                  setData({
                    ...data,
                    [name]: value
                  })
                }} 
                type="password" value={data.password} className="input-content" placeholder="Nhập mật khẩu" name="password" autoComplete="new-password" /> </div>
      				<button onClick={(e)=>{ handleLogin(e)}} className="btn1 login-btn " type="button" value data-loading-text="Chế biến...">ĐĂNG NHẬP</button>
      				<div className="link-area"> 
              <a href target="_blank" onClick={()=>{
                  window.sweetAlert(
                    '',
                    textData ,
                    'warning'
                  )
              }}>Quên mật khẩu</a>
               <a href="/register">Đăng ký ngay</a> </div>
              {/* </form> */}
      		</div>
      	</div>
      </div>
    </main>
  )
}
export default Login;