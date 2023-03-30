import Auth from "../../helpers/Auth";
import Api from "../../helpers/Api";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "./ManageApplicationForm.css";

const ManageApplicationForm = () => {
  // redirect user to login page if they never login yet
  Auth.redirectIfLoggedOut("/login");
  
  const [globalFilter, setGlobalFilter] = useState(null);
  const { state } = useLocation();
  const currentAnimalListing = state;
  // const memberApplicationForms = state.applicationForms;
  const [memberApplicationForms, setMemberApplicationForms] = useState(
    state.applicationForms
  );
  // console.log(memberApplicationForms);

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
  };

  const [appFormDialog, setAppFormDialog] = useState(false);
  const [appForm, setAppForm] = useState(emptyAppForm);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
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

  const viewAppForm = (appForm) => {
    appForm.submittedBy = appForm.member.name;
    // console.log(appForm);
    setAppForm({ ...appForm });
    setAppFormDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setAppFormDialog(false);
  };

  const updateApplicationFormStatus = (newApplicationFormStatus) => {
    const applicationFormId = appForm.applicationFormId;
    appForm.applicationStatus = newApplicationFormStatus;
    appForm.animalListing = currentAnimalListing;
    console.log(`app form id: ${applicationFormId}`);
    console.log(appForm);

    Api.updateAppFormStatus(applicationFormId, appForm).then((response) => {
      if (response.status === 204) {
        // refresh data table without retrieving updated data from backend
        for (var i = 0; i < memberApplicationForms.length; i++) {
          if (
            memberApplicationForms[i].applicationFormId === applicationFormId
          ) {
            memberApplicationForms[i] = appForm;
          } else if (memberApplicationForms[i].applicationStatus === 'SUBMITTED' && newApplicationFormStatus === 'ACCEPTED') {
            memberApplicationForms[i].applicationStatus = 'REJECTED';
          } 
        }
        setMemberApplicationForms([...memberApplicationForms]);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: `Application form updated to ${newApplicationFormStatus}!`,
          life: 3000,
        });
      } else {
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

    delete appForm.animalListing; // need to delete animalListing this after updating, if not will kena Cylic Ref problem in REACT, not Jakarta EE as animalListing are not supposed to be inside appform json, but for the sake of passing the complete app form json object to jakarta, had to do this.

    setAppFormDialog(false);
  };

  const appFormDialogFooter = (
    <React.Fragment>
      <Button
        label="Reject"
        icon="pi pi-times"
        outlined
        disabled={appForm.applicationStatus !== 'SUBMITTED' || appForm.applicationStatus === 'ACCEPTED'}
        onClick={() => updateApplicationFormStatus("REJECTED")}
      />
      <Button
        label="Accept"
        icon="pi pi-check"
        disabled={appForm.applicationStatus !== 'SUBMITTED' || appForm.applicationStatus === 'REJECTED'}
        onClick={() => updateApplicationFormStatus("ACCEPTED")}
      />
      <Button
        label="Mark As Completed"
        icon="pi pi-check"
        disabled={appForm.applicationStatus !== 'ACCEPTED'}
        onClick={() => updateApplicationFormStatus("COMPLETED")}
      />
    </React.Fragment>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-file"
          label="View Application Form"
          rounded
          outlined
          className="mr-2"
          onClick={() => viewAppForm(rowData)}
        />
      </React.Fragment>
    );
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        {" "}
        Manage Incoming Application Forms for Animal Listing{" "}
        {currentAnimalListing.name}{" "}
      </h2>
      <div className="applicationFormSection">
        <Toast ref={toast} />
        <div className="card">
          <DataTable
            value={memberApplicationForms}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} application forms"
            globalFilter={globalFilter}
            header={header}
            showGridlines
            tableStyle={{ minWidth: "40rem" }}
          >
            <Column field="applicationFormId" header="ID"></Column>
            <Column field="formType" header="Adoption/Fostering"></Column>
            <Column field="reason" header="Reason"></Column>
            <Column
              field="applicationStatus"
              header="Application Status"
            ></Column>
            <Column
              field="options"
              header="Options"
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "12rem" }}
            ></Column>
          </DataTable>
        </div>

        <Dialog
          visible={appFormDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Application Form Details"
          modal
          className="p-fluid"
          footer={appFormDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label className="font-bold">Submitted by:</label>
            <p>{appForm.submittedBy}</p>
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
    </>
  );
};

export default ManageApplicationForm;
