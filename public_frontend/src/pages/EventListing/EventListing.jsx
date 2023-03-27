import React, { useState } from "react";
//import { format, parseISO } from "date-fns";
import "./EventListing.css";
import moment from 'moment-timezone';
import Modal from "../ModalEvent/ModalEvent";

const EventListing= (props) => {
    //const { title, creatorImg, image, creator } = props.item;
    const { image, member, name, description, capacity, dateAndTime} = props.item;
    const date = dateAndTime;
    const formattedDate = moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').tz('Asia/Shanghai').format('MMMM Do YYYY');
  
    const [showModal, setShowModal] = useState(false);
  
    return (
      <div className="single__eventlisting__card">
        <div className="eventlisting__img">
          <img src={image} alt="" className="w-100" />
        </div>
  
        <div className="eventlisting__content">
          <h5 className="eventlisting__title">
            {name}
          </h5>
  
          <div className="creator__info-wrapper d-flex gap-3">
            <div className="creator__info w-100 d-flex align-items-center justify-content-between">
              <div>
                <h6>Posted By</h6>
                <p>{member.name}</p>
              </div>
  
              <div>
                <h6>Event Date</h6>
                <p>{formattedDate}</p> 
              </div>
            </div>
          </div>
  
          <div className=" mt-3 d-flex align-items-center justify-content-between">
            <button
              className="bid__btn d-flex align-items-center gap-1"
              onClick={() => setShowModal(true)}
            >
              <i className="ri-search-2-line"></i> Read More
            </button>
  
            {showModal && <Modal setShowModal={setShowModal} description={description} eventListing = {props.item} />}
  
          </div>
        </div>
      </div>
    );
  };
  
  export default EventListing;