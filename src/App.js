
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
import Layout from './../src/Page/Layout'
import Home from "./../src/Page/Index"
import DashBoard from "./../src/Page/DashBoard"
import History from "./../src/Page/History"
import Login from "./../src/Page/Login"
// import ForgetPass from "./../src/Page/ForgetPass"
import Register from "./../src/Page/Register"
import ChartParent from "./../src/Page/DashBoard/chartParent"
import { toast, ToastContainer } from 'react-toastify'


import 'react-toastify/dist/ReactToastify.css';
import "./styles/login.scss"
import "./styles/home.scss"
import "./styles/dashboard.scss"
import "./styles/record.scss"
import "./styles/chart.scss"
import "./styles/pockect.scss"

function App(props) {
  const { isUserLoggedIn } = props

  return (
    <>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        position={toast.POSITION.BOTTOM_RIGHT}
      />
      <Router>
        <Switch>
          {isUserLoggedIn ?  <Route exact path="/trade" component={(props) => <Layout classNameChart="chart-2" className="homePage-second"    {...props} member={{}} Component={ChartParent} />} /> :  <Route exact path="/" component={(props) => <Login  className="loginPage" {...props} />} /> }
          
          {isUserLoggedIn ? null :   <Route exact path="/register" component={(props) => <Register  {...props} className="loginPage"  />} />}

          {isUserLoggedIn ? (
            <Route exact path="/member_center" component={(props) => <Layout  {...props} member={{}} Component={DashBoard} />} />
          ) :
            null}
       
          {isUserLoggedIn ? (
            <Route exact path="/egame" component={(props) => <Layout  {...props}  Component={History} />} />
          ) :
            null}
          {isUserLoggedIn ? (
            <Route exact path="/trade" component={(props) => <Layout classNameChart="chart-2" className="homePage-second"    {...props} member={{}} Component={ChartParent} />} />
          ) :
            null}
          {/* <Route exact path="/forgot-password" component={(props) => <Layout  {...props} Component={ForgetPass} className="login-bg" />} /> */}
         { isUserLoggedIn ? <Route exact path="/" component={(props) => <Layout classNameChart="chart-2" className="homePage-second"    {...props} member={{}} Component={ChartParent} />} /> :   <Route component={(props) => <Login  {...props}  className="loginPage" />} />}
        </Switch>
      </Router>

    </>
  );
}
const mapStateToProps = state => ({
  isUserLoggedIn:state.member ? state.member.isUserLoggedIn : false,
});

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
