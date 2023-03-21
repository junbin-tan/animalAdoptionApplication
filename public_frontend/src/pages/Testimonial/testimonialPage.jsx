
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import { ProductService } from './service/ProductService';
import Api from "../../helpers/Api";

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
        <h2 style={{textAlign: "center"}}> Testimonials</h2>
        <div className="card">
            <DataTable value={testimonial} showGridlines tableStyle={{ minWidth: '50rem' }}>
                <Column field="date" header="Date Published"></Column>
                <Column field="message" header="Testimonial"></Column>
            </DataTable>
        </div>
        </>
    );
}
        