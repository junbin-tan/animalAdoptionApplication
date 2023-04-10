
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import { ProductService } from './service/ProductService';
import Api from "../../helpers/Api";
import moment from 'moment-timezone';

export default function TestimonialPage() {
    const [testimonial, setTestimonial] = useState([]);

    useEffect(() => {
        Api.getAllTestimonials().then(data => data.json())
            .then(data => setTestimonial(data));
    }, []);

    
    /*
    useEffect( () => {
        const fetchData = async() => {
            const result = await fetch('http://localhost:8080/AnimalAdoptionApplication-war/webresources/testimonial')
            result.json().then(json => {
                setProducts(json);
            })
            //console.log(result.json())
        }
        fetchData();
    }, [])
    */
       
    return (
        <>
        <h2 style={{textAlign: "center",}}> Testimonials </h2>
        <div className="card" style={{padding: '20px'}} >
            <DataTable value={testimonial} showGridlines tableStyle={{ minWidth: '50rem'}} style={{padding: '20px'}}   >
                <Column
                field="date"
                header="Date Published"
                body={(rowData) => (
                    <span>
                    {moment(rowData.date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').tz('Asia/Shanghai').format('MMMM Do YYYY, h:mm a')}
                    </span>
                )}
                style={{ width: "20rem" }}
                />
                <Column field="message" header="Testimonial"></Column>
            </DataTable>
        </div>
        </>
    );
}
        