import React, { useState, useEffect } from 'react';
import Tops from './Tops';
import AddIcon from '@mui/icons-material/Add';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { useApiData } from './ApiCall';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClient, } from './ApiThunk';
function Client() {
    const dispatch = useDispatch();
    const fetchClientData = useSelector((state) => state.api.clients);
    useEffect(() => {
        dispatch(fetchClient())
        // Dispatch other API thunks as needed
    },);
    const [formData, setFormData] = useState({
        name: "",
        PhoneNo: "",
        email: "",
        Address: "",
        status: "",
    });
    const [showModal, setShowModal] = React.useState(false);
    const { api3Data, } = useApiData();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [result, setresult] = useState([])

    const HandleSerach = async (e) => {
        try {
            // Get the search key from the input field
            const key = e.target.value;

            // Fetch data from the API
            const response = await fetch(`http://localhost:5000/ap4/v5/getmanage/${key}`);

            // Parse the response as JSON
            const responseJson = await response.json();

            // Update the result state with the response data
            setresult(responseJson);
        } catch (error) {
            // Handle errors, log them, or display a user-friendly message
            console.error('Error during search:', error.message);
        }
    }
    const sendData = () => {
        setShowModal(true)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Assuming your API endpoint is http://localhost:5000/submitData
            const response = await axios.post('http://localhost:5000/ap3/v4/Client', formData);

            // Axios automatically parses the response JSON
            if (response.status === 200) {
                // Handle the success, e.g., show a success message or redirect
                console.log('Data submitted successfully');
            } else {
                // Handle the error, e.g., show an error message
                console.error('Error submitting data:', response.statusText);
            }
        } catch (error) {
            // Handle other errors, e.g., network issues
            console.error('Error during data submission:', error.message);
        }
    };
    const deleteData = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/ap3/v4/deleteClient/${id}`);
            console.log('Delete successful:', response.data);
            // Add additional logic if needed (e.g., updating state or displaying a message)
        } catch (error) {
            console.error('Error deleting data:', error);
            // Handle errors (e.g., display an error message to the user)
        }
    }
    const exportToExcel = () => {
        const fileName = 'staffData.xlsx';
        // Prepare data for export
        const exportData = [
            ['Officer', 'PIN', 'First Name', 'Last Name', 'Email', 'Phone', 'Position', 'SIA Number', 'Pay Rate'],
            ...api3Data.staff.map((staffMember) => [
                staffMember.officer,
                staffMember.pin,
                staffMember.FirstN,
                staffMember.LastN,
                staffMember.email,
                staffMember.phone,
                staffMember.position,
                staffMember.SIA,
                staffMember.Payrate,
            ]),
        ];
        const ws = XLSX.utils.aoa_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Staff Data');
        XLSX.writeFile(wb, fileName);
    };
    const [name, setname] = useState("")
    const [PhoneNo, setPhoneNo] = useState("");
    const [email, setemail] = useState("")
    const [Address, setAddress] = useState("")
    const [showModal1, setshowModal1] = useState(false)
    const [currentStaffId, setCurrentStaffId] = useState(null);
    useEffect(() => {
        // Fetch staff member data when showModal1 is true and currentStaffId is set
        const fetchData = async () => {
            if (showModal1 && currentStaffId) {
                const apiUrl = `http://localhost:5000/ap3/v4/getClint1/${currentStaffId}`;
                try {
                    const response = await axios.get(apiUrl);
                    const data = response.data.staffMember;
                    setname(data.name);
                    setPhoneNo(data.PhoneNo);
                    setemail(data.email);
                    setAddress(data.Address)
                } catch (error) {
                    console.error('Error fetching staff member data:', error);
                }
            }
        };

        fetchData(); // Trigger the fetchData function when the component mounts or when showModal1 and currentStaffId change
    }, [showModal1, currentStaffId]);
    const handleUpdate = async (id) => {
        // e.preventDefault(); // Make sure to call preventDefault on the correct event object

        setshowModal1(true);
        setCurrentStaffId(id);

    }
    const handleUpdate1 = async (e) => {
        e.preventDefault();
        try {
            // Use the current state values for position and status
            const response = await axios.put(`http://localhost:5000/ap3/v4/getUpdateClient/${currentStaffId}`, { name, PhoneNo, email, Address });

            // Axios automatically parses the response JSON
            if (response.status === 200) {
                // Handle the success, e.g., show a success message or redirect
                console.log('Data submitted successfully');
            } else {
                // Handle the error, e.g., show an error message
                console.error('Error submitting data:', response.statusText);
            }
        } catch (error) {
            // Handle other errors, e.g., network issues
            console.error('Error during data submission:', error.message);
        }
    };
    return (
        <div>
            {showModal1 ? (
                <>
                    <div
                        className="justify-center overflow-x-auto items-center flex  overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[800px] bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-2xl font-semibold">
                                        Update an existing Client
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form onSubmit={handleUpdate1}>
                                    <div className="relative p-6 flex-auto">
                                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                            <div className="mb-6">
                                                <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                <input type="text" name="position" value={name} onChange={(e) => setname(e.target.value)} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Postion" required />
                                            </div>
                                            <div className="mb-6">
                                                <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                <input type="text" name="position" value={email} onChange={(e) => setemail(e.target.value)} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Postion" required />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                            <div className="mb-6">
                                                <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                                <input type="text" name="position" value={Address} onChange={(e) => setAddress(e.target.value)} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Postion" required />
                                            </div>
                                            <div className="mb-6">
                                                <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                                <input type="text" name="position" value={PhoneNo} onChange={(e) => setPhoneNo(e.target.value)} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Postion" required />
                                            </div>
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setshowModal1(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit" onClick={handleUpdate1}

                                        >
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            <div className="p-4 sm:ml-64">
                <Tops />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-10">
                    <div>
                        <h1 className='text-2xl'>Manage Client
                        </h1>
                    </div>
                    <div>
                        <form>
                            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search"
                                    onChange={HandleSerach} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                        </form>

                    </div>
                    <div className='float-right mx-28'>
                        <div className="flex items-center mb-4">
                            <AddIcon className=" w-10 cursor-pointer" onClick={sendData} />
                            <label for="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                <DocumentScannerIcon className='mx-3 cursor-pointer' onClick={exportToExcel} />
                            </label>
                        </div>
                    </div>
                </div>
                {showModal ? (
                    <>
                        <div
                            className="justify-center overflow-x-auto items-center flex  overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[800px] bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-2xl font-semibold">
                                            Add New Staff
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <form onSubmit={handleSubmit}>
                                        <div className="relative p-6 flex-auto">
                                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                                {/* name: "",
        PhoneNo: "",
        email: "",
        Address: "",
        status: "", */}
                                                <div className="mb-6">
                                                    <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Name" required />
                                                </div>
                                                <div className="mb-6">
                                                    <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No</label>
                                                    <input type="text" name="PhoneNo" value={formData.PhoneNo} onChange={handleInputChange} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Phone Number" required />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                                <div className="mb-6">
                                                    <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                                    <input type="text" name="Address" value={formData.Address} onChange={handleInputChange} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Adress" required />
                                                </div>
                                                <div className="mb-6">
                                                    <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">status</label>
                                                    <input type="text" name="status" value={formData.status} onChange={handleInputChange} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                                <div className="mb-6">
                                                    <label for="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                    <input type="text" name="email" value={formData.email} onChange={handleInputChange} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Email" required />
                                                </div>
                                            </div>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"

                                            >
                                                Add Staff
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Book of Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {fetchClientData && Array.isArray(fetchClientData.client) && fetchClientData.client.length > 0 ? (
                                fetchClientData.client.map((staffMember) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={staffMember._id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {staffMember.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {staffMember.PhoneNo}
                                        </td>
                                        <td className="px-6 py-4">
                                            {staffMember.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            PhoneNo
                                        </td>
                                        <td className="px-6 py-4">
                                            {staffMember.Address}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                                            {staffMember.status}
                                            </span>
                                        </td>
                                        <td className="flex items-center px-6 py-4">
                                            <i className="fa-solid fa-pen-to-square fa-xl cursor-pointer" onClick={() => handleUpdate(staffMember._id)}></i>
                                            <DeleteIcon onClick={() => deleteData(staffMember._id)} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <div role="status" className="text-center relative ml-48">
                                    <svg aria-hidden="true" class="inline w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            )}


                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Client