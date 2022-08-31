import React from 'react';
import LeftMenu from  "./leftMenu"
import ChartParent from "./chartParent"
import _ from "lodash"
function DashBoard(props) {

  return (
    <div className="dashboard">
      <main className="dashboard-outer pad-tp main ">
        <div className="control-panel">
          <LeftMenu {...props}/>
          {/* <iframe style={{width: "100%", height: 100%}}  src="/left-menu" title="Member-Frame"></iframe> */}
          
        </div>
        <div class="game-panel ">
         <ChartParent/>
        </div>
      </main>
    </div>
  )
}
export default DashBoard;