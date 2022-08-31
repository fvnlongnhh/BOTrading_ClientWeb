import React, { useEffect, useState } from 'react';
import { number_to_price } from "../../helper/common"
import _ from "lodash"
import Service from './../../services/request'
import { toast } from 'react-toastify';
function Affiliate(props) {
  const { member } = props
  const { username, wallets, memberLevelName, token, userId } = member
  const [childrendData, setChildrenData] = useState([])
  const newWallets = wallets || `[]`
  const balanceEth = _.get(newWallets[0], "balance", 0);
  const unitEth = _.get(newWallets[0], "balanceUnit", 0);
  const balanceBit = _.get(newWallets[1], "balance", 0);
  const unitBit = _.get(newWallets[1], "balanceUnit", 0);

  function handleGetChildren(params) {
    Service.send({
      method: 'post', path: 'Commission/getChildUser', data: params, headers: {
        authorization: `Bearer ${token}`
      }
    }).then(result => {
      if (result) {

        const { statusCode, data } = result
        if (statusCode === 200) {
          setChildrenData(data)
        }
      } else {
        toast.error("something was wrong!")
      }

    })
  }

  useEffect(() => {
    handleGetChildren({
      userId
    })
  }, [])
  return (
    <>
      <section className="banner-outer banner-outers">
        <div className="auto-container">
          <div className="banner-inner banner-innrs">
            <h2>AFFILIATE</h2>
          </div>
        </div>
      </section>
      <section className="live-games-outer">
        <div className="auto-container">
          <div className="affilate-innr">
            <div className="affilate-left">
              <div className="tree">
                <ul id="myUL">
                  <li><span className="caret">{username} (<small>{memberLevelName}</small>) {balanceBit ? (<>- {number_to_price(balanceBit || '')} {unitEth}</>) : null} - {balanceEth ? (<>- {number_to_price(balanceEth)} {unitBit}</>) : null}</span>
                    {
                      childrendData.length ? <>
                        <ul  >
                          {
                            childrendData.map(item => {
                              return (
                                <li><span className="caret">{item.username} (<small>{item.memberLevelName}</small>)</span>
                                  <ul className="nested" />
                                </li>
                              )
                            })
                          }
                        </ul>
                      </> : null
                    }

                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="live-games-outer">
        <div className="auto-container">
          <div className="policy-outer policy-withdraw ">
            <div className="policy-detail">
              <div className="policy-desc">
                <p><span>1.</span> We have the right to modify, suspend or cancel any promotions or policies at any
                    time.</p>
                <p><span>2.</span> If we finds fraud, bad play, any manipulation of promotion rules or promotion abuse,
                  the related players and their related accounts will be suspended and permanently blocked in the
                    program.</p>
                <p><span>3.</span> These terms and conditions are in addition to the our <a href="/terms-and-conditions">General Terms and Conditions</a> and the <a href="/affiliate-policy">Affiliate Terms and Conditions</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Affiliate;