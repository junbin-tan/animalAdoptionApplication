import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { EventList } from "../EventListing/EventList"; //hardcoded events
import  EventListing from "../EventListing/EventListing";
import "./EventsAndMarketingPage.css";

const EventsAndMarketingPage = () => {
    const [data, setData] = useState(EventList);
    const handleCategory = () => { };
    const handleItems = () => { };

    return (
        <>
            <h2 style={{ textAlign: "center" }}> Events </h2>
            <section>
                <Container>
                    <Row>
                        <Col lg="12" className="mb-5">
                            <div className="market__product__filter d-flex align-items-center justify-content-between">
                                <div className="filter__left d-flex align-items-center gap-5">
                                    <div className="all__category__filter">
                                        <select onChange={handleCategory}>
                                            <option>All Categories</option>
                                            <option value="gatherings">Gathering</option>
                                            <option value="pet-training">Pet Training</option>
                                            <option value="expo">Expo</option>
                                            <option value="charity">Charity</option>
                                            <option value="competition">Competition</option>
                                        </select>
                                    </div>

                                    <div className="all__items__filter">
                                        <select onChange={handleItems}>
                                            <option>All Status</option>
                                            <option value="upcoming">Upcoming</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {EventList.map((item) => (
                            <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                                <EventListing item={item} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default EventsAndMarketingPage;