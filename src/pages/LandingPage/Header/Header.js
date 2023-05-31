import bgimg1 from '../../../assets/img/images/LogoVLU.png';

function Header() {
  return (
    <header className="masthead">
      <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
        <div className="row">
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <img
                style={{ height: '5rem', display: 'inline-block' }}
                src={bgimg1}
                className="img-responsive branch-logo"
                aria-label="Logo của trang web"
              />
              <div>
                <h1 style={{ fontSize: '5rem' }} className=" h1kt mx-auto my-4 text-uppercase">
                  KHẢO THÍ
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
