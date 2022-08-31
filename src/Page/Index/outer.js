import React from 'react';

function Outer(props) {
  return (
    <div className="section section-2">
    	<div className="left">
    		<div className="container">
    			<h1 data-aos="fade-up" className="aos-init">Gửi tiền &amp; Rút tiền</h1>
    			<p data-aos="fade-up" className="aos-init">Chọn giữa nhiều hệ thống thanh toán để rút và gửi tiền của bạn một cách nhanh chóng và an toàn.</p>
    		</div>
    	</div>
    	<div className="right">
    		<div className="container">
    			<div className="text-block"> <i className="fas fa-tools aos-init" data-aos="fade-up" aria-hidden="true" />
    				<h3 data-aos="fade-up" className="aos-init">Nền tảng nâng cao</h3>
    				<p data-aos="fade-up" className="aos-init">Máy tính để bàn Windows / MacOs / Web / Di động</p>
    			</div>
    			<div className="text-block"> <i className="fas fa-search aos-init" data-aos="fade-up" aria-hidden="true" />
    				<h3 data-aos="fade-up" className="aos-init">Trải nghiệm miễn phí</h3>
    				<p data-aos="fade-up" className="aos-init">Tài khoản trải nghiệm miễn phí đến 1000$</p>
    			</div>
    			<div className="text-block"> <i className="fas fa-briefcase aos-init" data-aos="fade-up" aria-hidden="true" />
    				<h3 data-aos="fade-up" className="aos-init">Hỗ trợ 24/7</h3>
    				<p data-aos="fade-up" className="aos-init">Hỗ trợ nhanh chóng và chuyên nghiệp</p>
    			</div>
    		</div>
    	</div>
    </div>
  )
}
export default Outer;