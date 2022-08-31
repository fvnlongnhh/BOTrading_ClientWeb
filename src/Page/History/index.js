import React, { useEffect, useState } from 'react';
import _ from "lodash"
function History(props) {
  

  return (

    <main className="main">

      <div id="egame">
      	<div className="page">
      		<div className="text-area">
      			<div className="container">
      				<h1>Thị trường giao dịch</h1> </div>
      		</div>
      	</div>
      	<div className="index-page">
      		<div className="container">
      			<div className="game-group">
      				<div className="game-card">
      					<div className="top-img">
      						<h1>Ví tiền</h1>
      						<div className="top-img-cover" /> </div> <a onClick={e=>{ e.preventDefault(); props.history.push("/trade")}} href="/trade" className="link-btn">
                        bắt đầu
                      </a> </div> 
                      </div>
      		</div>
      	</div>
      </div>
    </main>


  )
}
export default History;