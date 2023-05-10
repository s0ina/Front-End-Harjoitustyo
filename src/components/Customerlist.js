import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';




export default function Customerlist() {
    const [customer, setCustomer] = useState({firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''});
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchCstmrs(), []);

    const fetchCstmrs = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const addCustomer = (event) => {
        event.preventDefault();
        setCustomers([...customers, customer]);
    }

    const inputChanged = (event) => {
        setCustomer ({...customer, [event.target.name]: event.target.value});
    }

    
    

    const columns = [
        {
            headerName: 'Firstname',
            field:'firstname',
            sortable: true
        },
        {
            headerName:'Lastname',
            field:'lastname',
            sortable: true,
            filter: true
        },
        {
            headerName:'Street Address',
            field:'streetaddress',
            sortable: true
        },
        {
            headerName:'Postcode',
            field:'postcode',
            sortable: true,
            filter: true
        },
        {
            headerName:'City',
            field:'city',
            sortable: true,
            filter: true
        },
        {
            headerName:'Email',
            field:'email',
            sortable: true
        },
        {
            headerName:'Phone Number',
            field:'phone',
            sortable: true
        },

        {
            headerName: 'Delete',
            cellRendererFramework: (params) => {
                return (
                    <button onClick={(event) => deleteCustomer(event, params.data)}>Delete</button>
                );
            },
            width: 100,
        },
    ];

    const deleteCustomer = (event, customer) => {
        console.log("data:", customer);
        const selfUrl = customer.links.find(link => link.rel === 'self').href;
        fetch(selfUrl, { method: "DELETE" })
            .then(response => fetchCstmrs())
            .catch(err => console.error(err))
    };

    


    return (
        <>
        <div>
            <br>
            </br>
            <form>
            <label for="firstname">First name: </label>
            <input type="firstname" name="firstname" value={customer.firstname} onChange={inputChanged}/>
            <label for="lastname">Last name: </label>
            <input type="lastname" name="lastname" value={customer.lastname} onChange={inputChanged}/>
            <label for="streetaddress">Street Address: </label>
            <input type="streetaddress" name="streetaddress" value={customer.streetaddress} onChange={inputChanged}/>
            <label for="postcode">Postcode: </label>
            <input type="postcode" name="postcode" value={customer.postcode} onChange={inputChanged}/>
            <label for="city">City: </label>
            <input type="city" name="city" value={customer.city} onChange={inputChanged}/>
            <label for="email">Email: </label>
            <input type="email" name="email" value={customer.email} onChange={inputChanged}/>
            <label for="phone">Phone: </label>
            <input type="phone" name="phone" value={customer.phone} onChange={inputChanged}/>
            <br></br>
            <br></br>
            <button onClick={addCustomer}>Add Customer</button>
            </form>
            <br></br>
            </div>
             <div className="ag-theme-alpine" style={{height: '50rem'}}>
             <AgGridReact style={{ width: 200, height: 200 }}
                 columnDefs={columns}
                 rowData={customers}/>
         </div>
         </>
    );
}