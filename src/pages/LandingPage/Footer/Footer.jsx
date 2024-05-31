function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div id="lienhe">
      <section className="contact-section" style={{ background: '#D51F35' }}>
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5">
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <i
                    style={{ color: '#64a19d', fontSize: '24px' }}
                    className="fas fa-map-marked-alt text-primary mb-2"
                  />
                  <h4 className="text-uppercase m-0">Address</h4>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black-50">
                    Phòng 2.06, Lầu 2 - Tòa nhà A, Cơ sở chính, 69/68 Đặng Thùy Trâm, P. 13, Q. Bình
                    Thạnh, Tp. HCM
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <i
                    style={{ color: '#64a19d', fontSize: '24px' }}
                    className="fas fa-envelope text-primary mb-2"
                  />
                  <h4 className="text-uppercase m-0">Email</h4>
                  <hr style={{ height: '2px' }} className="my-4 mx-auto" />
                  <div className="small text-black-50">
                    <a href="mailto:t.khaothi@vanlanguni.edu.vn"> t.khaothi@vanlanguni.edu.vn</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <i
                    style={{ color: '#64a19d', fontSize: '24px' }}
                    className="fas fa-mobile-alt text-primary mb-2"
                  />
                  <h4 className="text-uppercase m-0">Phone</h4>
                  <hr className="my-4 mx-auto" />
                  <div className="small text-black-50">
                    <a href="tel:0931323078">0931.323.078</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="social d-flex justify-content-center">
            <a className="mx-2" href="#!">
              <i className="fab fa-twitter" />
            </a>
            <a className="mx-2" href="#!">
              <i className="fab fa-facebook-f" />
            </a>
            <a className="mx-2" href="#!">
              <i className="fab fa-github" />
            </a>
          </div> */}
        </div>
      </section>
      <footer className="footer bg-dark small text-center text-white-50">
        <div className="container px-4 px-lg-5">
          © {currentYear} - Bản Quyền Thuộc Dương Ngọc Phúc
        </div>
      </footer>
    </div>
  );
}

export default Footer;
