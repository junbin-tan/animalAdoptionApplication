import Auth from "../../helpers/Auth";
import Api from "../../helpers/Api";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "./ManageEventRegistration.css";

const ManageEventRegistration = () => {
    // redirect user to login page if they never login yet
    Auth.redirectIfLoggedOut("/login");

    const [globalFilter, setGlobalFilter] = useState(null);
    const { state } = useLocation();
    const currentEventListing = state;
    const [registeredMembers, setRegisteredMembers] = useState(
        state.eventRegistrations
    );

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

    return (
        <>
            <h2 style={{ textAlign: "center" }}>
                {" "}
                Registered Members for {" "}
                {currentEventListing.eventName}{" "}
            </h2>
            <div className="eventRegistrationSection">
                <div className="card">
                    <DataTable
                        value={registeredMembers}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} event registrations"
                        globalFilter={globalFilter}
                        header={header}
                        showGridlines
                        tableStyle={{ minWidth: "40rem" }}
                    >
                        <Column field="eventRegistrationId" header="ID"> </Column>
                        <Column field="member.name" header="Member Name"></Column>
                        <Column field="member.phoneNumber" header="Phone Number"></Column>
                        <Column field="member.email" header="Email Address"></Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default ManageEventRegistration;