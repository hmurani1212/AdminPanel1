import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
// Create a context for the API data 
const ApiDataContext = createContext();
// Create a custom hook to use the API data context
export const useApiData = () => {
    return useContext(ApiDataContext);
};
// Create a provider component to manage API calls and data
export const ApiDataProvider = ({ children }) => {
    // State variables to store data from different APIs
    const [api1Data, setApi1Data] = useState(null);
    const [api2Data, setApi2Data] = useState(null);
    const [api3Data, setApi3Data] = useState(null);
    const [api4Data, setApi4Data] = useState(null);
    const [api5data, setApi5Data] = useState(null);
    const [api6data, setApi6Data] = useState(null);
    // useEffect to fetch data from API 1 when the component mounts
    const fethingSingleData = async () => {
        const data = await axios.get("http://localhost:5000/ap2/v3/getStaff")
            .then((res) => {
                setApi1Data(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fethingSingleData1 = async () => {
        const data = await axios.get("http://localhost:5000/ap1/v1/getcontractors")
            .then((res) => {
                setApi2Data(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fethingSingleData2 = async () => {
        const data = await axios.get("http://localhost:5000/ap3/v4/getClient")
            .then((res) => {
                setApi3Data(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fethingSingleData3 = async () => {
        const data = await axios.get("http://localhost:5000/ap4/v5/getManageStaff")
            .then((res) => {
                setApi4Data(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fethingSingleData4 = async () => {
        const data = await axios.get("http://localhost:5000/ap5/v6/getSite")
            .then((res) => {
                setApi5Data(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fethingSingleData5 = async () => {
        const data = await axios.get("http://localhost:5000/ap6/v7/getShift")
            .then((res) => {
                setApi6Data(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fethingSingleData5()
        fethingSingleData4()
        fethingSingleData3()
        fethingSingleData2();
        fethingSingleData1()
        fethingSingleData();
    },[]);

    // Provide the API data through the context
    const contextValue = {
        api1Data,
        api2Data,
        api3Data,
        api4Data,
        api5data,
        api6data,
    };
    return (
        <ApiDataContext.Provider
            value={contextValue}>
            {children}
        </ApiDataContext.Provider>
    );
};
