import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { ADOPTION_FOSTERING } from "../AnimalListing/data";
import  AnimalListing from "../AnimalListing/AnimalListing";
import "./AdoptionFosteringPage.css";

const AdoptionFosteringPage = () => {
    const [data, setData] = useState(ADOPTION_FOSTERING);
    const handleCategory = () => {};
    const handleItems = () => {};

    // ====== SORTING DATA BY HIGH, MID, LOW RATE =========
  const handleSort = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "high") {
      const filterData = ADOPTION_FOSTERING.filter((item) => item.currentBid >= 6);

      setData(filterData);
    }

    if (filterValue === "mid") {
      const filterData = ADOPTION_FOSTERING.filter(
        (item) => item.currentBid >= 5.5 && item.currentBid < 6
      );

      setData(filterData);
    }

    if (filterValue === "low") {
      const filterData = ADOPTION_FOSTERING.filter(
        (item) => item.currentBid >= 4.89 && item.currentBid < 5.5
      );

      setData(filterData);
    }
  };

    return(
        <>
        <h2 style={{textAlign: "center"}}> Adoption/ Fostering</h2>
        <section>
        <Container>
            <Row>
                <Col lg="12" className="mb-5">
                <div className="market__product__filter d-flex align-items-center justify-content-between">
                    <div className="filter__left d-flex align-items-center gap-5">
                    <div className="all__category__filter">
                        <select onChange={handleCategory}>
                        <option>All Categories</option>
                        <option value="art">Art</option>
                        <option value="music">Music</option>
                        <option value="domain-name">Domain Name</option>
                        <option value="virtual-world">Virtual World</option>
                        <option value="trending-card">Trending Cards</option>
                        </select>
                    </div>

                    <div className="all__items__filter">
                        <select onChange={handleItems}>
                        <option>All Items</option>
                        <option value="single-item">Single Item</option>
                        <option value="bundle">Bundle</option>
                        </select>
                    </div>
                    </div>

                    <div className="filter__right">
                    <select onChange={handleSort}>
                        <option>Sort By</option>
                        <option value="high">High Rate</option>
                        <option value="mid">Mid Rate</option>
                        <option value="low">Low Rate</option>
                    </select>
                    </div>
                </div>
                </Col>

                {ADOPTION_FOSTERING.map((item) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                    <AnimalListing item={item} />
                </Col>
                ))}
            </Row>
        </Container>
        </section>
        </>
    );
}

export default AdoptionFosteringPage;