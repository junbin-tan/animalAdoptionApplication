import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import NftCard from "../Nft-card/NftCard";
import { MOST_VIEWED } from "../../../assets/data/data.js";

import "./live-auction.css";

const LiveAuction = () => {
  
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__auction__top d-flex align-items-center justify-content-between ">
              <h3>Most Viewed</h3>
              <span>
                <Link to="/market">Explore more </Link>
              </span>
            </div>
          </Col>

          {MOST_VIEWED.map((item) => (
            <Col lg="3" md="4" sm="6" className="mb-4">
              <NftCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default LiveAuction;
