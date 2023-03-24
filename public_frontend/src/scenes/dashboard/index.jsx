import Auth from "../../helpers/Auth";
import Api from "../../helpers/Api";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import UserContext from "../../helpers/context/UserContext";
import "../../index.css";

const Dashboard = () => {
  // if the user tries to access dashboard while logged out, redirect them to /login. Do this for every single page that requires user to be logged in
  Auth.redirectIfLoggedOut();
  // If the user is logged in, show the dashboard
  const currentUser = Auth.getUser();
  const userData = currentUser && JSON.stringify(currentUser, null, 2); // get user data

  const [animalListings, setAnimalListings] = useState([]);
  const [applicationForms, setApplicationForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Api.getAnimalListingByMemberEmail()
      .then((data) => data.json())
      .then((data) => setAnimalListings(data));
  }, []);

  useEffect(() => {
    Api.getApplicationFormByMemberEmail()
      .then((data) => data.json())
      .then((data) => setApplicationForms(data));
  }, []);
  console.log(applicationForms);


  // START: Code to retrieve latest actual Member Data from Java Backend Restful Server
  const { currentActualUser } = useContext(UserContext);
  console.log(currentActualUser);
  // END: Code to retrieve latest actual Member Data from Java Backend Restful Server

  //-------------------------Start of Manage your Animal Listing------------------------- 
  let emptyAnimalListing = {
    animalListingId: null,
    name: "",
    description: "",
  };

  const [animalListing, setAnimalListing] = useState(emptyAnimalListing);
  const [deleteAnimalListingDialog, setDeleteAnimalListingDialog] =
    useState(false);
  const [selectedAnimalListings, setSelectedAnimalListings] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const hideDeleteAnimalListingDialog = () => {
    setDeleteAnimalListingDialog(false);
  };

  const confirmDeleteAnimalListing = (animalListing) => {
    setAnimalListing(animalListing);
    setDeleteAnimalListingDialog(true);
  };

  const redirectToManageApplicationForms= (animalListing) => {
    // console.log(animalListing);
    navigate("/ManageApplicationForm", {state: animalListing});
  };

  const deleteAnimalListing = () => {
    Api.deleteAnimalListingByAnimalListingId(
      animalListing.animalListingId
    ).then((response) => {
      if (response.status === 204) {
        // HTTP code when success deletion
        // have to manually filter away the deleted item because the item is deleted on database
        let _animalListings = animalListings.filter(
          (val) => val.animalListingId !== animalListing.animalListingId
        );
        setAnimalListings(_animalListings);
        setDeleteAnimalListingDialog(false);
        setAnimalListing(emptyAnimalListing);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Animal Listing Deleted",
          life: 3000,
        });
      } else {
        setDeleteAnimalListingDialog(false);
        response.json().then((responseJSON) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: responseJSON.error,
            life: 3000,
          });
        });
      }
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteAnimalListing(rowData)}
        />
        <Button
          icon="pi pi-file"
          label="View Application Forms"
          rounded
          outlined
          severity="info"
          onClick={() => redirectToManageApplicationForms(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage your Animal Listings</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const deleteAnimalListingDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteAnimalListingDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteAnimalListing}
      />
    </React.Fragment>
  );
  //-------------------------End of Manage your Animal Listing-------------------------


  //-------------------------Start of Manage your Application Form-------------------------
  let emptyApplicationForm = {
    applicationFormId: null,
    reason: "",
  };

  const [applicationForm, setApplicationForm] = useState(emptyApplicationForm);
  const [deleteApplicationFormDialog, setDeleteApplicationFormDialog] =
    useState(false);
  const [selectedApplicationForms, setSelectedApplicationForms] = useState(null);
  const dtForApplicationForm = useRef(null);
  const [globalFilterForApplicationForm, setGlobalFilterForApplicationForm] = useState(null);

  const hideDeleteApplicationFormDialog = () => {
    setDeleteApplicationFormDialog(false);
  };

  const confirmDeleteApplicationForm = (applicationForm => {
    setApplicationForm(applicationForm);
    setDeleteApplicationFormDialog(true);
  });

  const deleteApplicationForm = () => {
    Api.deleteApplicationFormByApplicationFormId(
      applicationForm.applicationFormId
    ).then((response) => {
      if (response.status === 204) {
        // HTTP code when success deletion
        // have to manually filter away the deleted item because the item is deleted on database
        let _applicationForms = applicationForms.filter(
          (val) => val.applicationFormId !== applicationForm.applicationFormId
        );
        setApplicationForms(_applicationForms);
        setDeleteApplicationFormDialog(false);
        setApplicationForm(emptyApplicationForm);
        toast.current.show({ //using the same toast as animal listing
          severity: "success",
          summary: "Successful",
          detail: "Application Form Deleted",
          life: 3000,
        });

      } else {
        setDeleteApplicationFormDialog(false);
        response.json().then((responseJSON) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: responseJSON.error,
            life: 3000,
          });
        });
      }
    });
  };

  const actionBodyTemplateForApplicationForm = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteApplicationForm(rowData)}
        />
      </React.Fragment>
    );
  };

  const headerForApplicationForm = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage your Application Forms</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilterForApplicationForm(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const deleteApplicationFormDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteApplicationFormDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteApplicationForm}
      />
    </React.Fragment>
  );
  //-------------------------End of Manage your Application Form-------------------------


  return (
    <>
      <h2 style={{ textAlign: "center" }}> Manage Account</h2>
      
      {/* -------------------------Start of Manage your Animal Listing------------------------- */}
      <div className="animalListingSection">
        <Toast ref={toast} />
        <div className="card">
          <DataTable
            ref={dt}
            value={animalListings}
            selection={selectedAnimalListings}
            onSelectionChange={(e) => setSelectedAnimalListings(e.value)}
            dataKey="animalListingId"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} animal listings"
            globalFilter={globalFilter}
            header={header}
            showGridlines
            tableStyle={{ minWidth: "40rem" }}
          >
            <Column field="animalListingId" header="ID"></Column>
            <Column field="name" header="Animal's Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column
              field="options" header="Options"
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
        </div>
        <Dialog
          visible={deleteAnimalListingDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteAnimalListingDialogFooter}
          onHide={hideDeleteAnimalListingDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {animalListing && (
              <span>
                Are you sure you want to delete <b>{animalListing.name}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
      {/* -------------------------End of Manage your Animal Listing------------------------- */}

      {/* -------------------------Start of Manage your Application Forms------------------------- */}
      <div className="applicationFormSection">
        <Toast ref={toast} />
        <div className="card">
          <DataTable
            ref={dtForApplicationForm}
            value={applicationForms}
            selection={selectedApplicationForms}
            onSelectionChange={(e) => setSelectedApplicationForms(e.value)}
            dataKey="applicationFormId"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} application forms"
            globalFilter={globalFilterForApplicationForm}
            header={headerForApplicationForm}
            showGridlines
            tableStyle={{ minWidth: "40rem" }}
          >
            <Column field="applicationFormId" header="Application Form ID"></Column>
            <Column field="reason" header="Description"></Column>
            <Column
              field="options" header="Options"
              body={actionBodyTemplateForApplicationForm}
              exportable={false}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
        </div>
        <Dialog
          visible={deleteApplicationFormDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteApplicationFormDialogFooter}
          onHide={hideDeleteApplicationFormDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {applicationForm && (
              <span>
                Are you sure you want to delete Application Form <b>{applicationForm.applicationFormId}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
      {/* -------------------------End of Manage your Application Forms------------------------- */}

    </>
  );
};

export default Dashboard;
