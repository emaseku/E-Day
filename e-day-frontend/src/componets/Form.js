import React, { useState } from "react";
import axios from 'axios';
import JobInfo from './JobInfo'
import PersonalInfo from './PersonalInfo'

function Form() {
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        url: '', countryFrom: '',
        firstName: '', lastName: '',
        sourceFind: '', prevEmployed: '',
        addy1: '', addy2: '',
        addressCity: '', addressState: '',
        addressPostalCode: '', addressCounty: '',
        emailFunction: '', countryPhoneCode: '',
        phoneNumber: '', phoneDeviceType: '',
        jobTitle: '', companyTitle: '',
        jobLocation: '',
        startMonth: '', startYear: '',
        endMonth: '', endYear: '',
        roleDescription: '', school: '',
        fieldOfStudy: '', degree: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/submit-workday', formData);
            alert('Starting to fill application');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const [showButton, setShowButton] = useState(true);

    // Function to hide the button
    const hideButton = () => {
        setShowButton(false);
        setPage((currPage) => currPage + 1);
    };

    // Function to show the button
    const showTheButton = () => {
        setShowButton(true);
    };

    // Event handler for updating addressState field
  const handleAddressStateChange = (event) => {
    const newStateValue = event.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      addressState: newStateValue
    }));
  };

    const FormTitles = ["Personal Info", "Job Info"];

    const PageDisplay = () => {
        if (page === 0) {
            return <PersonalInfo formData={formData} setFormData={setFormData} handleChange={handleChange} handleAddressStateChange={handleAddressStateChange} />;
        } else
            return <JobInfo formData={formData} setFormData={setFormData} handleChange={handleChange} handleAddressStateChange={handleAddressStateChange}/>;
    }

    return (
        <div className="form">
            <div className="progressbar">
                <div style={{ width: page === 0 ? "50.3%" : "100%" }}
                ></div></div>
            <div className="form-container">
                <div className="header">
                    <h1>{FormTitles[page]}</h1>
                </div>
                <div className="body">{PageDisplay()}</div>
                <form onSubmit={handleSubmit}>
                    <div className="footer">
                        <button
                            disabled={page === 0}
                            onClick={() => {
                                setPage((currPage) => currPage - 1);
                            }}
                        >Prev
                        </button>
                        {page === 0 && <button
                            onClick={() => {
                                setPage((currPage) => currPage + 1);
                            }}
                        >Next</button>}
                        {page === 1 && <button >Submit </button>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form