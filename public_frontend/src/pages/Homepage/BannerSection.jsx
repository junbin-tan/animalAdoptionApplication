import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import bannerImg from "../../images/img.jpeg";
import "./Homepage.css";

const Homepage = () => {
    return (
        <section className="banner__section">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="banner__content">
                  <h2>
                    Your donation would help us greatly! Please donate today!
                  </h2>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Deleniti excepturi omnis neque adipisci sequi ullam unde in
                    minus quis quos.
                  </p>
    
                  <div className="banner__btns d-flex align-items-center gap-4">
                    <button className=" explore__btn d-flex align-items-center gap-2">
                      <Link to="/AdoptionFostering">Adopt</Link>
                    </button>
                    <button className=" create__btn d-flex align-items-center gap-2">
                      <Link to="/Donation">Donate</Link>
                    </button>
                  </div>
                </div>
              </Col>
    
              <Col lg="6" md="6">
                <div className="banner__img">
                  <img src={bannerImg} alt="" className="w-100" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        

      );
}
export default Homepage;