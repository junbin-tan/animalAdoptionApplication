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
  const [eventListings, setEventListings] = useState([]);
  const [eventRegistrations, setEventRegistrations] = useState([]);
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

  useEffect(() => {
    Api.getEventListingByMemberEmail()
      .then((data) => data.json())
      .then((data) => setEventListings(data));
  }, []);

  useEffect(() => {
    Api.getEventRegistrationByMemberEmail()
      .then((data) => data.json())
      .then((data) => setEventRegistrations(data));
  }, []);



  // START: Code to retrieve latest actual Member Data from Java Backend Restful Server
  const { currentActualUser } = useContext(UserContext);
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

  const redirectToManageApplicationForms = (animalListing) => {
    // console.log(animalListing);
    navigate("/ManageApplicationForm", { state: animalListing });
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

  let emptyAppForm = {
    applicationFormId: null,
    applicationStatus: null,
    existingPetsOwned: null,
    formType: null,
    hasDailyExercise: null,
    hasOtherPets: null,
    isFirstTime: null,
    petAloneTime: null,
    reason: null,
    sleepArea: null,
    animalListing: {
      name: null,
      member: {
        name: null,
        email: null
      }
    }
  };

  const [appFormDialog, setAppFormDialog] = useState(false);
  const [appForm, setAppForm] = useState(emptyAppForm);

  const hideDialog = () => {
    setAppFormDialog(false);
  };

  const viewAppForm = (appForm) => {
    // appForm.submittedBy = appForm.member.name;
    console.log(appForm);
    setAppForm({ ...appForm });
    setAppFormDialog(true);
  };

  const appFormDialogFooter = (
    <React.Fragment>
      <Button
        label='Chat With Pet Owner'
        icon="pi pi-send"
        outlined
        onClick={() => {
          navigate("/chat", { state: appForm.animalListing.member });
        }}
      />
    </React.Fragment>
  );

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
        <Button
          icon="pi pi-file"
          label="View My Application Form"
          rounded
          outlined
          className="mr-2"
          onClick={() => viewAppForm(rowData)}
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

  //-------------------------Start of Manage your Event Listing------------------------- 
  let emptyEventListing = {
    eventListingId: null,
    eventName: "",
    description: "",
  };

  const [eventListing, setEventListing] = useState(emptyEventListing);
  const [deleteEventListingDialog, setDeleteEventListingDialog] =
    useState(false);
  const dtForEventListing = useRef(null);
  const [selectedEventListings, setSelectedEventListings] = useState(null);
  const [globalFilterForEventListing, setGlobalFilterForEventListing] = useState(null);

  const hideDeleteEventListingDialog = () => {
    setDeleteEventListingDialog(false);
  };

  const confirmDeleteEventListing = (eventListing) => {
    setEventListing(eventListing);
    setDeleteEventListingDialog(true);
  };

  const deleteEventListing = () => {
    Api.deleteEventListingByEventListingId(
      eventListing.eventListingId
    ).then((response) => {
      if (response.status === 204) {
        // HTTP code when success deletion
        // have to manually filter away the deleted item because the item is deleted on database
        let _eventListings = eventListings.filter(
          (val) => val.eventListingId !== eventListing.eventListingId
        );
        setEventListings(_eventListings);
        setDeleteEventListingDialog(false);
        setEventListing(emptyEventListing);
        toast.current.show({ //using the same toast as animal listing
          severity: "success",
          summary: "Successful",
          detail: "Event Listing Deleted",
          life: 3000,
        });
      } else {
        setDeleteEventListingDialog(false);
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

  const actionBodyTemplateForEventListing = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteEventListing(rowData)}
        />
      </React.Fragment>
    );
  };

  const headerForEventListing = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage your Event Listings</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilterForEventListing(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const deleteEventListingDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteEventListingDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteEventListing}
      />
    </React.Fragment>
  );
  //-------------------------End of Manage your Event Listing-------------------------

  //-------------------------Start of Manage your Event Registration------------------------- 
  let emptyEventRegistration = {
    eventRegistrationId: null,
    isActive: false,
    eventListing: {
      eventName: null
    },
  };

  const [eventRegistration, setEventRegistration] = useState(emptyEventRegistration);
  const [deleteEventRegistrationDialog, setDeleteEventRegistrationDialog] =
    useState(false);
  const dtForEventRegistration = useRef(null);
  const [selectedEventRegistrations, setSelectedEventRegistrations] = useState(null);
  const [globalFilterForEventRegistration, setGlobalFilterForEventRegistration] = useState(null);

  const hideDeleteEventRegistrationDialog = () => {
    setDeleteEventRegistrationDialog(false);
  };

  const confirmDeleteEventRegistration = (eventRegistration) => {
    setEventRegistration(eventRegistration);
    setDeleteEventRegistrationDialog(true);
  };

  const deleteEventRegistration = () => {
    Api.deleteEventRegistrationByEventRegistrationId(
      eventRegistration.eventRegistrationId
    ).then((response) => {
      if (response.status === 204) {
        // HTTP code when success deletion
        // have to manually filter away the deleted item because the item is deleted on database
        let _eventRegistrations = eventRegistrations.filter(
          (val) => val.eventRegistrationId !== eventRegistration.eventRegistrationId
        );
        setEventRegistrations(_eventRegistrations);
        setDeleteEventRegistrationDialog(false);
        setEventRegistration(emptyEventRegistration);
        toast.current.show({ //using the same toast as animal listing
          severity: "success",
          summary: "Successful",
          detail: "Event Registration Deleted",
          life: 3000,
        });
      } else {
        setDeleteEventRegistrationDialog(false);
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

  const actionBodyTemplateForEventRegistration = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-times-circle"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteEventRegistration(rowData)}
        />
      </React.Fragment>
    );
  };

  const headerForEventRegistration = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage your Event Registrations</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilterForEventRegistration(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const deleteEventRegistrationDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteEventRegistrationDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteEventRegistration}
      />
    </React.Fragment>
  );

  //-------------------------End of Manage your Event Registration-------------------------

  return (
    <>
      <h2 style={{ textAlign: "center" }}> Listings & Forms </h2>

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
            <Column field="applicationFormId" header="ID"></Column>
            <Column field="animalListing.name" header="Pet's name"></Column>
            <Column field="animalListing.member.name" header="Pet's Owner"></Column>
            <Column field="applicationStatus" header="Application Status"></Column>
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
        <Dialog
          visible={appFormDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="My Application Form Details"
          modal
          className="p-fluid"
          footer={appFormDialogFooter}
          onHide={hideDialog}
        >

          <div className="field">
            <label className="font-bold">Pet's name:</label>
            <p>{appForm.animalListing.name}</p>
          </div>

          <div className="field">
            <label className="font-bold">Pet's Owner:</label>
            <p>{appForm.animalListing.member.name}</p>
          </div>

          <div className="field">
            <label className="font-bold">Status:</label>
            <p>{appForm.applicationStatus}</p>
          </div>

          <div className="field">
            <label className="font-bold">Application Type:</label>
            <p>{appForm.formType}</p>
          </div>

          <div className="field">
            <label className="font-bold">
              Is applicant first time having pets?
            </label>
            {appForm.isFirstTime && <p>Yes</p>}
            {!appForm.isFirstTime && <p>No</p>}
          </div>

          <div className="field">
            <label className="font-bold">
              Applicant's pet alone time (if any)
            </label>
            <p>{appForm.petAloneTime}</p>
          </div>

          <div className="field">
            <label className="font-bold">
              What kind of sleeping area can the applicant provide?
            </label>
            <p>{appForm.sleepArea}</p>
          </div>

          <div className="field">
            <label className="font-bold">
              Does the applicant have other pets?
            </label>
            {appForm.hasOtherPets && <p>Yes</p>}
            {!appForm.hasOtherPets && <p>No</p>}
          </div>

          <div className="field">
            <label className="font-bold">
              Does the applicant's pet have daily exercise?
            </label>
            {appForm.hasOtherPets && <p>Yes</p>}
            {!appForm.hasOtherPets && <p>No</p>}
          </div>

          <div className="field">
            <label className="font-bold">
              How many existing pets does the applicant own?
            </label>
            <p>{appForm.existingPetsOwned}</p>
          </div>

          <div className="field">
            <label className="font-bold">Reason for {appForm.formType}</label>
            <p>{appForm.reason}</p>
          </div>
        </Dialog>
      </div>
      {/* -------------------------End of Manage your Application Forms------------------------- */}

      {/* -------------------------Start of Manage your Event Listing------------------------- */}
      <div className="eventListingSection">
        <Toast ref={toast} />
        <div className="card">
          <DataTable
            ref={dtForEventListing}
            value={eventListings}
            selection={selectedEventListings}
            onSelectionChange={(e) => setSelectedEventListings(e.value)}
            dataKey="eventListingId"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} event listings"
            globalFilter={globalFilterForEventListing}
            header={headerForEventListing}
            showGridlines
            tableStyle={{ minWidth: "40rem" }}
          >
            <Column field="eventListingId" header="ID"></Column>
            <Column field="eventName" header="Event Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="capacity" header="Capacity"></Column>
            <Column
              field="options" header="Options"
              body={actionBodyTemplateForEventListing}
              exportable={false}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
        </div>
        <Dialog
          visible={deleteEventListingDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteEventListingDialogFooter}
          onHide={hideDeleteEventListingDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {eventListing && (
              <span>
                Are you sure you want to delete <b>{eventListing.eventName}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
      {/* -------------------------End of Manage your Event Listing------------------------- */}

      {/* -------------------------Start of Manage your Event Registration------------------------- */}
      <div className="eventRegistrationSection">
        <Toast ref={toast} />
        <div className="card">
          <DataTable
            ref={dtForEventRegistration}
            value={eventRegistrations}
            selection={selectedEventRegistrations}
            onSelectionChange={(e) => setSelectedEventRegistrations(e.value)}
            dataKey="eventRegistrationId"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} event registrations"
            globalFilter={globalFilterForEventRegistration}
            header={headerForEventRegistration}
            showGridlines
            tableStyle={{ minWidth: "40rem" }}
          >
            <Column field="eventRegistrationId" header="ID"></Column>
            <Column field="eventListing.eventName" header="Event Name"></Column>
            <Column
              field="options" header="Options"
              body={actionBodyTemplateForEventRegistration}
              exportable={false}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
        </div>
        <Dialog
          visible={deleteEventRegistrationDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteEventRegistrationDialogFooter}
          onHide={hideDeleteEventRegistrationDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {eventRegistration && (
              <span>
                Are you sure you want to cancel your registration for <b>{eventRegistration.eventListing.eventName}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>

      {/* -------------------------End of Manage your Event Registration------------------------- */}

    </>
  );
};

export default Dashboard;
