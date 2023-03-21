import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Api from "../../helpers/Api";
import AnimalListing from "../AnimalListing/AnimalListing";
import "./Homepage.css";

const AdoptionSection = () => {
    const [data, setData] = useState([]);

    useEffect(() => { 
        Api.getAllAnimalListings().then((data) => data.json()).then((data) => setData(data));
    }, []);
  
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="adoption__section__top d-flex align-items-center justify-content-between ">
              <h3>Latest Adoption/Fostering </h3>
                <Link to="/AdoptionFostering">Explore more </Link>
            </div>
          </Col>

          {data.map((item) => (
            <Col lg="3" md="3" sm="2" className="mb-4" key={item.animalListingId}>
              <AnimalListing item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default AdoptionSection;
