import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        id="mainNav"
      >
        <div className="container px-4 px-lg-5">
          <div className="d-flex align-items-center">
            <FaHome className="logohome" />
            <a className="navbar-brand">
              <span className="d-none d-lg-inline">
                TRƯỜNG ĐẠI HỌC VĂN LANG
              </span>
              <span className="d-inline d-lg-none">VLU</span>
            </a>
          </div>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#faq">
                  THÔNG BÁO
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#gioithieu">
                  GIỚI THIỆU
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#lienhe">
                  LIÊN HỆ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/Login')}>
                  ĐĂNG NHẬP
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
