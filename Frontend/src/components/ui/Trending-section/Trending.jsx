import React from "react";
import { Container, Row, Col } from "reactstrap";

import { NEWS_UPDATES } from "../../../assets/data/data";
import "./trending.css";

import NftCard from "../Nft-card/NftCard";

const Trending = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <h3 className="trending__title">News & Updates </h3>
          </Col>

          {NEWS_UPDATES.slice(0, 4).map((item) => (
            <Col lg="3" md="4" sm="6" key={item.id} className="mb-4">
              <NftCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Trending;
