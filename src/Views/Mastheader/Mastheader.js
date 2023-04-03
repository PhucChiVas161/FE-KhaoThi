import bgimg1 from '../assets/img/images/_wiwn8912WI_logo-vhubnew.png';
function Mastheader() {
    return ( 
        <header  className="masthead">
                    <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                      <div className="row">
                        <div className="d-flex justify-content-center">
                        <div className="text-center">
                            <img style={{height:'5rem'}} src={bgimg1} class="img-responsive center-block branch-logo" />
                            <div><h1 style={{fontSize:'5rem' }} className=" h1kt mx-auto my-4 text-uppercase">KHẢO THÍ</h1></div> 
                        </div>
                      </div>
                    </div>
                  </div>
                </header>

    );
}

export default Mastheader;