import React from 'react';

function Policy(props) {
  return (
    <div>
      <section className="banner-outer banner-outers">
        <div className="auto-container">
          <div className="banner-inner banner-innrs">
            <h2>AFFILIATE POLICY</h2>
          </div>
        </div>
      </section>
      <section className="live-games-outer">
        <div className="auto-container">
          <div className="policy-outer">
            <table width="100%" border={0} cellSpacing={0} cellPadding={0}>
              <tbody><tr className="tb-heading">
                <th>Level</th>
                <th>Commission</th>
                <th>Condition</th>
              </tr>
                <tr>
                  <td>Level 1</td>
                  <td>0.1%</td>
                  <td>A places bets at least 500 BIT bets
                      <br />Total bets system: 5,000 BIT bets
                      <br />A HAS 2 F1, EACH F1 PLACE $300 BETS/WEEK</td>
                </tr>
                <tr className="gray-bg">
                  <td>Level 2</td>
                  <td>0.2%</td>
                  <td>B places bets at least 800 BIT bets
                      <br />Total bets system: 30,000 BIT bets
                      <br />A HAS 4 F1, EACH F1 PLACE $500 BETS/WEEK</td>
                </tr>
                <tr>
                  <td>Level 3</td>
                  <td>0.3%</td>
                  <td>C places bets at least 1,000 BIT bets
                      <br />Total bets system: 80,000 BIT bets
                      <br />A HAS 6 F1, EACH F1 PLACE $800 BETS/WEEK</td>
                </tr>
                <tr className="gray-bg">
                  <td>Level 4</td>
                  <td>0.4%</td>
                  <td>D places bets at least 1,500 BIT bets
                      <br />Total bets system: 200,000 BIT bets
                      <br />A HAS 8 F1, EACH F1 PLACE $1.000 BETS/WEEK
                      <br />
                  </td>
                </tr>
                <tr>
                  <td>Level 5</td>
                  <td>0.5%</td>
                  <td>E places bets at least 2,000 BIT bets
                      <br />Total bets system: 500,000 BIT bets
                      <br />A HAS MINIMUM 2 F1 AT LEVEL 4 OR MORE.</td>
                </tr>
                <tr>
                  <td>Level 6</td>
                  <td>0.6%</td>
                  <td>E places bets at least 2,500 BIT bets
                      <br />Total bets system: 1,000,000 BIT bets
                      <br />A HAS MINIMUM 2 F1 AT LEVEL 5 OR MORE.</td>
                </tr>
                <tr>
                  <td>Level 7</td>
                  <td>0.7%</td>
                  <td>E places bets at least 3,000 BIT bets
                      <br />Total bets system: 1,500,000 BIT bets
                      <br />A HAS MINIMUM 2 F1 AT LEVEL 6 OR MORE.</td>
                </tr>
              </tbody></table>
            <div className="policy-desc policy-descs">
              <p>Your level will be updated in every 2 hours
                  <br />Matching Commission 10% (only calculated on level 4, 5)
                  <br />Your commission will be calculated and paid on every Monday
                  <br />Levels will only be counted till 06:00 UTC every Monday and Total bets, Total system bets, Total
                  system users and Levels will be reset in between 07:00 to 09:00 UTC every Monday</p>
            </div>
            <div className="policy-desc pdl-20">
              <h3 className="pd-0">Note:</h3>
              <p>
                <img src="assets/images/tick-icon.png" alt="" />We have the right to modify, suspend or cancel any
                  promotions or policies at any time.</p>
              <p>
                <img src="assets/images/tick-icon.png" alt="" />If we finds fraud, bad play, any manipulation of promotion
                rules or promotion abuse, the related players and their related accounts will be suspended and
                  permanently blocked in the program..</p>
              <p>
                <img src="assets/images/tick-icon.png" alt="" />These terms and conditions are in addition to the our <a href="/terms-and-conditions">General Policy</a> and the <a href="/withdraw-policy">Withdraw
                    Policy</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Policy;