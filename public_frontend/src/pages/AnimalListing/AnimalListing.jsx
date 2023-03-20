import React, { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import "./AnimalListing.css";
import Modal from "../Modal/Modal";

const AnimalListing= (props) => {
  // const { title, creatorImg, imgUrl, creator } = props.item;
  const { age, animalType, gender, image, member, isAdoption, isFostering, name, description } = props.item;


  const [showModal, setShowModal] = useState(false);

  return (
    <div className="single__animallisting__card">
      <div className="animallisting__img">
        <img src={image} alt="" className="w-100" />
      </div>

      <div className="animallisting__content">
        <h5 className="animallisting__title">
          {name}
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          {/* <div className="creator__img">
            <img src={creatorImg} alt="" className="w-100" />
          </div> */}

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Posted By</h6>
              <p>{member.name}</p>
            </div>

            <div>
              {isAdoption ? <p><i className="pi pi-check-circle" style={{color: "var(--green-500)" }}
                ></i>Up for adoption</p> : 
                <p><i className="pi pi-times" style={{color: "var(--red-500)" }}
                ></i>Not up for adoption</p>}
                
              {isFostering ? <p><i className="pi pi-check-circle" style={{color: "var(--green-500)"}}></i>Up for foster</p> : 
              <p><i className="pi pi-times" style={{color: "var(--red-500)" }}
                ></i>Not up for foster</p>}
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

          {showModal && <Modal setShowModal={setShowModal} description={description} />}

        </div>
      </div>
    </div>
  );
};

export default AnimalListing;
