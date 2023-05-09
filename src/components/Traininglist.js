import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Customerlist.js'
import dayjs from 'dayjs'

export default function Traininglist() {
    const [training, setTraining] = useState({date: '', duration: '', priority: ''});
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const formatdate = dayjs(training.date).format("MM/DD/YYYY hh:mm:ss A");
    


    useEffect(() => fetchTrnings(), []);
    useEffect(() => fetchCustomers(), []);

    const fetchTrnings = () => {
        fetch('http://traineeapp.azurewebsites.net/api/trainings')
        .then(response => response.json())
        .then(data => Promise.all(data.content.map(resolveTrainingCustomer)))
        .then(setTrainings);
    }

    const resolveTrainingCustomer = (training) => {
        const customerLink = training.links.find(item => item.rel === 'customer');
        if (!customerLink) {  // If customer link is missing, customer will be an empty object
            training.customer = {};
            return Promise.resolve(training);
        }
        return fetch(customerLink.href)
            .then(response => response.json())
            .catch(err => {})  // Empty customer on e.g. 404
            .then(customer => {
                // Add retrieved customer data to the training object
                training.customer = customer;
                return training;
            });
    }

    const fetchCustomers = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const addTraining = (event) => {
        event.preventDefault();
        setTrainings([...trainings, training]);
    }

    const inputChanged = (event) => {
        setTraining ({...training, [event.target.name]: event.target.value});
    }

    const selectedCustomer = (event) => {
        setTraining({...training, customerId: event.target.value});
      }

    const handleSelectChange = (event) => {
        const selectedCustomerId = event.target.value;
        const selectedCustomerObject = customers[selectedCustomerId];
        //const selectedCustomerObject = customers.find(customer => customer.id === selectedCustomer);
        setTraining({...training, customer: selectedCustomerObject, customerId: selectedCustomerId});
    }

    
    


    const columns = [
        {
        
            headerName: 'Date',
            field: 'date',
            sortable: true,
            valueFormatter: ({ value }) => dayjs(value).format("MM/DD/YYYY hh:mm:ss A")
        },

        {
            headerName:'Duration',
            field:'duration',
            sortable: true
        },
        {
            headerName:'Activity',
            field:'activity',
            sortable: true,
            filter: true
        },
        {
            headerName: 'First name',
            field:'customer.firstname',
            sortable: true
        },
        {
            headerName: 'Last name',
            field:'customer.lastname',
            sortable: true
        }
    ];


    return (
        <>
            <div>
                <label for="date">Date:</label>
                <input header= "Date" type="datetime-local" name="date" value={training.date} onChange={inputChanged}/>
                <label for="duration">Duration:</label>
                <input header="Duration" type="duration" name="duration" value={training.duration} onChange={inputChanged}/>
                <label for="activity">Activity:</label>
                <input header="Activity" type="activity" name="activity" value={training.activity} onChange={inputChanged}/>

                <label for="customer">Customer:</label>
                <select name="customer" value={training.customerId} onChange={handleSelectChange}>
                <option value="">Select a customer</option>
                    {customers.map((customer, i) => (
                <option key={i} value={i}>
                {customer.firstname} {customer.lastname}
                 </option>
                 ))}
                </select>

                <button onClick={addTraining}>Add Training</button>
            </div>
            <div className="ag-theme-alpine" style={{height: '72rem'}}>
                <AgGridReact style={{ width: 500, height: 500 }}
                    columnDefs={columns}
                    rowData={trainings}
                    />
            </div>
        </>
    );
    
}