import React, { useState } from "react";
import "./AnimalListing.css";
import Modal from "../Modal/Modal";

const AnimalListing= (props) => {
  const { title, creatorImg, imgUrl, creator } = props.item;

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="single__animallisting__card">
      <div className="animallisting__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className="animallisting__content">
        <h5 className="animallisting__title">
          {title}
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={creatorImg} alt="" className="w-100" />
          </div>

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Posted By</h6>
              <p>{creator}</p>
            </div>

            <div>
              <h6>Published On</h6>
              <p>28 Febuary 2023</p>
            </div>
          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => setShowModal(true)}
          >
            <i class="ri-search-2-line"></i> Read More
          </button>

          {showModal && <Modal setShowModal={setShowModal} />}

        </div>
      </div>
    </div>
  );
};

export default AnimalListing;
