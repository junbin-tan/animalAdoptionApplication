import React, { useState, useEffect, useMemo  } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import EventListing from "../EventListing/EventListing";
import Api from "../../helpers/Api";
import "./Homepage.css";

const EventsSection = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        Api.getAllEventListings().then((data) => data.json()).then((data) => setData(data));
    }, []);

    return(
        <>
        <section>
            <Container>
                <Row>
                <Col lg="12" className="mb-5">
                <div className="event_section__top d-flex align-items-center justify-content-between ">
                <h3>Latest Events/Marketing</h3>
                    <Link to="/EventsAndMarketing">Explore more </Link>
                </div>
                </Col>
                    {data.map((item) => (
                        <Col lg="3" md="4" sm="6" className="mb-4" key={item.eventListingId}>
                            <EventListing item={item} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
        </>
    )
}

export default EventsSection;


