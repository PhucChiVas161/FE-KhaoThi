import React, { Component } from 'react';

class Lichthi extends Component {
    render() {
        return (
            <div className="psc-divPortlet-Content">
            {/* HOAT DONG SINH VIEN */}
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-sm-12 ">
                  <div className="module  k2-mega-new-main thong-bao"> <a href="" title="Thông báo"></a>
                    <h3 className="modtitle">Lịch thi</h3>
                  </div>
                  <div className="box-features">
                  Lịch thi được tổ chức chủ nhật và thứ 3 (thứ 3 chỉ tổ chức khi số lượng đông) thường xuyên chúng tôi sẽ tổ chức vào chủ nhật. Có những giai đoạn chúng tôi sẽ tổ chức hàng tuần, có những giai đoạn chúng tôi tổ chức hàng tháng (tùy thuộc nhu cầu của thí sinh)
                  </div>
                  {/* /.features */}
                </div>
                {/* SO TAY SINH VIEN */}
                <div className="note-book col-lg-5 col-sm-12 ">
                </div>
                {/* END SO TAY SINH VIEN */}
              </div>
            </div>
            {/*  End container
          <!- END HOAT DONG SINH VIEN */}
          </div>
          
        );
    }
}

export default Lichthi;