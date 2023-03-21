import Auth from "../../helpers/Auth";
import Api from "../../helpers/Api";
import { useEffect, useState, useContext } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import UserContext from "../../helpers/context/UserContext";
import "../../index.css";

const Dashboard = () => {
  // if the user tries to access dashboard while logged out, redirect them to /login. Do this for every single page that requires user to be logged in
  Auth.redirectIfLoggedOut();
  // If the user is logged in, show the dashboard
  const currentUser = Auth.getUser();
  const userData = currentUser && JSON.stringify(currentUser, null, 2); // get user data

  const [animalListing, setAnimalListing] = useState([]);

    useEffect(() => {
        Api.getAnimalListingByMemberEmail().then(data => data.json())
            .then(data => setAnimalListing(data));
    }, []);


  // START: Code to retrieve latest actual Member Data from Java Backend Restful Server

  const {currentActualUser} = useContext(UserContext);

  console.log(currentActualUser);

  // const [actualUser, setActualUser] = useState();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await Auth.getActualUser();
  //     const data = await response.json();
  //     setActualUser(data);
  //   };

  //   fetchData();
  // }, []);

  // const userDonations = actualUser && actualUser.donations; // <-- Alwin, this is how you retrieve latest donations data for current user
  // console.log(userDonations);

  // END: Code to retrieve latest actual Member Data from Java Backend Restful Server
  

  
  return (
    <>
    <h2 style={{textAlign: "center"}}> Manage Account</h2>
    
    <div className="animalListingSection">
        <h5>View List Of Animal Listing</h5>
      
        <div className="card" >
            <DataTable value={animalListing} showGridlines tableStyle={{ minWidth: '40rem' }}>
                <Column field="animalListingId" header="ID"></Column>
                <Column field="name" header="Animal's Name"></Column>
                <Column field="description" header="Description"></Column>
                <Column header="Option"></Column>
            </DataTable>
        </div>
    </div>
  </>
  );
};

export default Dashboard;
