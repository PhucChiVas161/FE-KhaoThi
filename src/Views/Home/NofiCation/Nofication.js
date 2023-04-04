import '../NofiCation/css/style.css';
import '../NofiCation/js/style.js';
import { AiFillBell } from "react-icons/ai";
function Notification() {
  return ( 
    <section id="faq" className="faq section-bg">
            <div className="container">
              <div className="section-title wow animated fadeInUp animated" style={{visibility: 'visible', animationName: 'fadeInUp'}}>
                <p data-aos="fade-up">THÔNG BÁO</p>
                <h2 data-aos="fade-up" ></h2>
              </div>
              <div className="faq-list">
                <ul>
                  <li className="mb-3 fadeInLeft wow animated animated  animated" data-wow-duration="1s" style={{visibility: 'visible', animationDuration: '1s', animationName: 'fadeInLeft'}}>
                    <AiFillBell className="bx bx-help-circle icon-help"> </AiFillBell> 
                    <a data-toggle="collapse" class="collapse" href="#faq-list-1" aria-expanded="false" aria-controls="collapseOne">Nguyên tắc chung sinh viên cần thực hiện để giải quyết một công việc là gì?
                    <i class="bx bx-chevron-down icon-close"></i><i class="bx bx-chevron-up icon-show"></i></a>
                    <div id="faq-list-1" class="collapse p-3" data-bs-parent=".faq-list">

                      <p>
                      </p><p>Khi cần giải quyết một công việc gì liên quan đến bản thân mình, sinh viên phải thực hiện theo nguyên tắc sau đây:</p>
                      <p>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tìm hiểu và nắm rõ về công việc cần giải quyết, thông qua các tài liệu do Trường ban hành và công bố tại website. Các thông tin cần phải nắm rõ tối thiểu gồm: các bước tiến hành, loại đơn/biểu mẫu cần sử dụng, nơi nhận/trả hồ sơ, thời gian dự kiến trả hồ sơ;</p>
                      <p>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Chuẩn bị đúng và đủ hồ sơ;</p>
                      <p>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Đến liên hệ đúng nơi nhận hồ sơ và đúng thời gian quy định nhận hồ sơ để giải quyết công việc;</p>
                      <p>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Trang phục, tác phong nghiêm túc; trình thẻ sinh viên và hồ sơ cho bộ phận tiếp nhận; nhận lại giấy hẹn trả hồ sơ; đóng lệ phí đối với những trường hợp có thu lệ phí.</p>
                      <p />
                    </div>
                  </li>

                </ul>
              </div>
            </div>
    </section>
          
   );
}

export default Notification;