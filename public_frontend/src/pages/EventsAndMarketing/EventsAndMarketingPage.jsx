import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col } from "reactstrap";
import { EventList } from "../EventListing/EventList"; //hardcoded events
import EventListing from "../EventListing/EventListing";
import Api from "../../helpers/Api";
import "./EventsAndMarketingPage.css";

const EventsAndMarketingPage = () => {
    //const [data, setData] = useState(EventList);
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

    const handleSort = () => { };


    useEffect(() => {
        Api.getAllEventListings().then((data) => data.json()).then((data) => setData(data));
    }, []);

    
    function getFilteredList() {
        if(!selectedCategory) {
            return data;
            //return EventList; //(for hardcoded events)
        } else {
            //return data.filter((event) => event.category === selectedCategory); //(for hardcoded events)
            return data.filter((a) => a.eventType === selectedCategory);
        }
    } 

    var filteredList = useMemo(getFilteredList, [selectedCategory, data]);

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value); 
    } 

    /* doesnt work cos it sets the data -> subsequent selecting filters wont work
    const handleCategoryChange = (e) => {
        const filterValue = e.target.value;

        if (filterValue === "ALL") {
            const filterData = data;

            setData(filterData);
        }

        if (filterValue === "GATHERING") {
            const filterData = data.filter((a) => a.eventType.toString() === "GATHERING");

            setData(filterData);
        }
    }; */

    /* ====== SORTING DATA BY NEWEST, OLDEST =========

    const handleSort = (e) => {
        const sortValue = e.target.value;
        
        if (sortValue === "newest") {
          const sortData = data.sort((a,b) => b.eventListingId - a.eventListingId);
          console.log(sortData);
  
          setData([...sortData]);
        }
  
        if (sortValue === "oldest") {
            const sortData = data.sort((a,b) => a.eventListingId - b.eventListingId);
  
          setData([...sortData]);
        }
      };*/


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
                                        <select onChange={handleCategoryChange}>
                                            <option value="">All Categories</option>
                                            <option value="GATHERING">Gathering</option>
                                            <option value="PET_TRAINING">Pet Training</option>
                                            <option value="EXPO">Expo</option>
                                            <option value="CHARITY">Charity</option>
                                            <option value="COMPETITION">Competition</option>
                                        </select>
                                    </div>

                                    <div className="all__items__filter">
                                        <select onChange={handleSort}>
                                            <option>Sort By</option>
                                            <option value="newest">Newest</option>
                                            <option value="oldest">Oldest</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {filteredList.map((item) => (
                            <Col lg="3" md="4" sm="6" className="mb-4" key={item.eventListingId}>
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