import React from "react";
import {Link, Route, Routes} from 'react-router-dom';


import {  Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import img from "../assets/images/qrCode.png";
import avatar from "../assets/images/ava-01.png";

import "../styles/create-item.css";

const item = {
  imgUrl: img,
  creatorImg: avatar,
  creator: "Trista Francis",
};

const Create = () => {
  return (
    <>
      <CommonSection title="Donation" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Preview Item</h5>
              <NftCard item={item} />
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <form>

                  <div className="form__input">
                    <label htmlFor="">Leave a comment!</label>
                    <textarea
                      name=""
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                    ></textarea>
                  </div>
                  <div></div>
                </form>
              </div>
              <div>
                <a
                  href="https://buy.stripe.com/test_5kA17o4Ji5Ax4CYbII"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bid__btn d-flex align-items-center gap-1">
                    <i class="ri-search-2-line"></i> Proccede with Donation
                  </button>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Create;
