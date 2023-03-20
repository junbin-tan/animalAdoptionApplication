import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { ADOPTION_FOSTERING } from "../AnimalListing/data";
import  AnimalListing from "../AnimalListing/AnimalListing";
import Api from "../../helpers/Api";
import "./AdoptionFosteringPage.css";

const AdoptionFosteringPage = () => {
    // const [data, setData] = useState(ADOPTION_FOSTERING);
    const [data, setData] = useState([]);
    const handleCategory = () => {};
    const handleItems = () => {};
    

    useEffect(() => { 
        Api.getAllAnimalListings().then((data) => data.json()).then((data) => setData(data));
    }, []);


    // ====== SORTING DATA BY NEWEST, OLDEST =========

    const handleSort = (e) => {
      const filterValue = e.target.value;
      
      if (filterValue === "newest") {
        const filterData = data.sort((a,b) => b.animalListingId - a.animalListingId);
        console.log(filterData);

        setData([...filterData]);
      }

      if (filterValue === "oldest") {
          const filterData = data.sort((a,b) => a.animalListingId - b.animalListingId);

        setData([...filterData]);
      }
    };

    return(
        <>
        <h2 style={{textAlign: "center"}}> Adoption/ Fostering</h2>
        <section>
        <Container>
            <Row>
                <Col lg="12" className="mb-5">
                    <div className="filter__right">
                    <select onChange={handleSort}>
                        <option>Sort By</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                    </div>
                {/* </div> */}
                </Col>

                {data.map((item) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={item.animalListingId}>
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