import logohome from '../../../../assets/img/images/hub_background.jpg';
import imgpage from '../../../../assets/img/images/sv2.jpg';
import imgpage1 from '../../../../assets/img/images/sv3.jpg';
import imgpage2 from '../../../../assets/img/images/sv4.jpg';
import '../../../../assets/css/style.css';


function Project() {
    return ( 
        <section className="projects-section bg-light" id="projects">
        <div className="container px-4 px-lg-5">
          {/* Featured Project Row */}
          <div className="row gx-0 mb-4 mb-lg-5 align-items-center">
            <div className="col-xl-8 col-lg-7"><img className="img-fluid mb-3 mb-lg-0" src={logohome} alt="..." /></div>
            <div className="col-xl-4 col-lg-5">
              <div className="featured-text text-center text-lg-left">
                <h4 className='titleh4'> Về Chúng Tôi</h4>
                <p className="text-black-50 mb-0">
                  Trường Đại học Văn Lang chính thức triển khai Cổng thông tin Khảo Thí từ ngày 25/6/2023.Khi sinh viên/cựu sinh viên có thể thực hiện các thủ tục tại Khảo thí, sau đó được hẹn thời gian để trả kết quả theo hình thức: lấy khảo thí trực tiếp tại trang Khảo Thí theo lịch hẹn hoặc gửi qua đường bưu điện theo địa chỉ được kê khai trong quá trình thực hiện thủ tục. Cổng thông tin một cửa Trang Khảo thí đáp ứng các thủ tục trực tuyến dành cho sinh viên, tiện lợi, hữu ích, đơn giản, dễ sử dụng, dễ tìm kiếm, có thể hỗ trợ sinh viên ở bất cứ đâu và vào bất cứ lúc nào.</p>
              </div>
            </div>
          </div>



          <h1 className='titlepj' >Tiêu Chí Hoạt Động</h1> 
          <div className="row gx-0 mb-5 mb-lg-0 justify-content-center">
            <div className="col-lg-6"><img className="img-fluid" src={imgpage} alt="..." /></div>
              <div className="col-lg-6">
                <div className="bg-black text-center h-100 project">
                  <div className="d-flex h-100">
                    <div className="project-text w-100 my-auto text-center text-lg-left">
                      <h4 className="text-white">BẤT CỨ LÚC NÀO, Ở BẤT CỨ ĐÂU</h4>
                      <p className="mb-0 text-white-50">Cổng thông tin một cửa là Thủ tục trực tuyến dành cho sinh viên: tiện lợi, hữu ích, đơn giản, dễ sử dụng, dễ tìm kiếm, có thể hỗ trợ bạn ở bất cứ đâu và vào bất cứ lúc nào.</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        
          <div className="row gx-0 justify-content-center">
            <div className="col-lg-6"><img className="img-fluid" src={imgpage1} alt="..." /></div>
            <div className="col-lg-6 order-lg-first">
              <div className="bg-black text-center h-100 project">
                <div className="d-flex h-100">
                  <div className="project-text w-100 my-auto text-center text-lg-right">
                    <h4 className="text-white">SẴN LÒNG HỖ TRỢ</h4>
                    <p className="mb-0 text-white-50">Đội ngũ nhân viên có năng lực và quyền hạn sẵn sàng hỗ trợ trực tuyến khi có yêu cầu của bạn!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="row gx-0 mb-5 mb-lg-0 justify-content-center">
            <div className="col-lg-6"><img className="img-fluid" src={imgpage2} alt="..." /></div>
            <div className="col-lg-6">
              <div className="bg-black text-center h-100 project">
                <div className="d-flex h-100">
                  <div className="project-text w-100 my-auto text-center text-lg-left">
                    <h4 className="text-white">XỬ LÝ NHANH CHÓNG</h4>
                    <p className="mb-0 text-white-50">Khi nhận yêu cầu thủ tục, đội ngũ nhân viên của Nhà trường sẽ xử lý và hồi đáp nhanh chóng cho bạn.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>




        </div>
      </section>
     );
}

export default Project;