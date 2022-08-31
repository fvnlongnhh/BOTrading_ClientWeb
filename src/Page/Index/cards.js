import React from 'react';

function Cards(props) {
  return (
  <>
    <div className="section section-4">
      <h1 style={{width: '80%', textAlign: 'center', margin: '30px auto 0 auto'}} data-aos="fade-up" className="aos-init">Nhà môi giới từng đoạt giải thưởng được các chuyên gia uy tín nhất trong ngành công nhận và khen ngợi.</h1>
    </div>
    <div className="section section-4">
        <div className="right">
          <h2>Giải thưởng ERA Vàng Chất lượng Quốc tế Thế kỷ</h2>
          <p>
            Nhóm Hướng dẫn Sáng kiến Kinh doanh
          </p>
          <a href="/egame" className="btn1 ">Nhập công cụ</a>
        </div>
        <div className="left">
          <h2>Ứng dụng công nghệ tốt nhất</h2>
          <p>
            Hiệp hội Tiếp thị Web
          </p>
          <a href="/member_center" className="btn1 ">Quản lý đầu tư</a>
        </div>
      </div>
  </>
  )
}
export default Cards;