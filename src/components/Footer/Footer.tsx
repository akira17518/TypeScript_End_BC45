import React from 'react'
import '../../components/Footer/Footer.css'
type Props = {
  logo?: JSX.Element
}

const Footer = (props: Props) => {
  return (
    <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
    <div className="container py-5">
      <div className="row g-5">
      <div className="subscrible">
          <div className="subscrible_text">
            <h2>
              Subscribe To Our Newsletter
            </h2>
          </div>
          <div className="subscrible_form">
            <form className="d-flex">
            <input className="form-control border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
              <button>
                <i className="fa fa-play text-primary mb-4 mt-3"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 footer_item">
              <h3> Elearning</h3>
              <ul className="footer_contact">
                  <li>
                      <i className="fa fa-phone"></i>
                      <span>
                          1800-123-4567
                          <br/>
                          +91 987-654-3210
                      </span>
                  </li>
                  <li>
                      <i className="fa fa-envelope"></i>
                      <span>
                          info@example.com
                          <br/>
                          services@gmail.com
                      </span>
                  </li>
                  <li>
                      <i className="fas fa-map-marker-alt"></i>
                      <span>
                          Demo Address #8901 Marmora
                          <br/>
                          Road City
                      </span>
                  </li>
              </ul>
        </div>
        <div className="col-lg-4 col-md-6 footer_item">
        <h3>Our Services</h3>
              <ul>
                  <li><a href="#">
                          <i className="fa fa-angle-right"></i>
                          Strategy &amp; Research
                      </a></li>
                  <li><a href="#">
                          <i className="fa fa-angle-right"></i>
                          Web Development
                      </a></li>
                  <li><a href="#">
                          <i className="fa fa-angle-right"></i>
                          Web Solution
                      </a></li>
                  <li><a href="#">
                          <i className="fa fa-angle-right"></i>
                          Digital Marketing
                      </a></li>
                  <li><a href="#">
                          <i className="fa fa-angle-right"></i>
                          App Design
                      </a></li>
              </ul>
        </div>
        <div className="col-lg-4 col-md-6 footer_item">
        <h3>Other links</h3>
              <ul>
                  <li><a href="#">
                          <i className="fa fa-angle-right"></i>
                          FAQ
                      </a></li>
                  <li><a href="#">
                          <i className="fa fa-angle-right"></i>
                          Portfolio
                      </a></li>
                  <li><a href="#">
                          <i className="fa fa-angle-right"></i>
                          Privacy Policy
                      </a></li>
                  <li><a href="#">
                          <i className="fa fa-angle-right"></i>
                          Terms &amp; Conditions
                      </a></li>
                  <li><a href="#">
                          <i className="fa fa-angle-right"></i>
                          Support
                      </a></li>
              </ul>
        </div>
        {/* <div className="col-lg-3 col-md-6">
          <h4 className="text-white mb-3">Newsletter</h4>
          <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
          <div className="position-relative mx-auto" style={{maxWidth: 400}}>
            <input className="form-control border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
            <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
          </div>
        </div> */}
      </div>
    </div>
   
  </div>
  )
}

export default Footer