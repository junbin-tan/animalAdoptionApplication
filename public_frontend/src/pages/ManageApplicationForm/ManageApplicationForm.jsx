import Auth from "../../helpers/Auth";
import Api from "../../helpers/Api";
import React, { useEffect, useState, useContext, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "./ManageApplicationForm.css";

const ManageApplicationForm = () => {
    const [globalFilter, setGlobalFilter] = useState(null);

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
          <h2 style={{ textAlign: "center" }}> Manage Incoming Application Forms for Animal Listing XXX </h2>
          <div className="applicationFormSection">
            <div className="card">
              <DataTable
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
                field="options" header="Options"
                // body={actionBodyTemplate}
                exportable={false}
                style={{ minWidth: "12rem" }}
                ></Column>
              </DataTable>
            </div>
          </div>
          </>
    )
};

export default ManageApplicationForm;