import React from 'react'
import Tops from './Tops'
import { useApiData } from './ApiCall';
function Dashbord() {
    const { api1Data, } = useApiData();
    const { api2Data, } = useApiData();
    const { api3Data, } = useApiData();
    const { api5data } = useApiData()
    const totalDeliveries1 = api2Data ? api2Data.totalDeliveries : null;
    const totalDeliveries = api1Data ? api1Data.totalDeliveries : null;
    const totalDeliveries2 = api3Data ? api3Data.totalDeliveries : null;
    const totalDeliveries3 = api3Data ? api3Data.totalDeliveries : null;
    return (
        <div>
            <div className="p-4 sm:ml-64">
                <Tops />
                <h1 className="mb-4 text-xl font-extrabold  text-gray-900 dark:text-white md:text-2xl lg:text-2xl my-3"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Dashbord</span></h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-24  mr-10">
                    <div className='items-center'>
                        <div className="max-w-sm p-6  text-center items-center bg-[#A4CAFE] border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img className="w-11 mx-4 h-11 rounded-full  xl:ml-20   lg:ml-14 my-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&usqp=CAU" alt="Rounded avatar" />
                            <p className='my-7'>
                                <h1 className='text-center lg:text-2xl sm:text-dark'>{totalDeliveries1}</h1>
                                <h1 className='text-center lg:text-2xl'>Total Staff</h1>
                            </p>

                        </div>
                    </div>
                    <div>
                        <div className='items-center'>
                            <div className="max-w-sm p-6  text-center items-center bg-[#CABFFD] border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <img className="w-11 mx-4 h-11 rounded-full xl:ml-20  lg:ml-14 my-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&usqp=CAU" alt="Rounded avatar" />
                                <p className='my-7'>
                                    <h1 className='text-center lg:text-2xl sm:text-dark'>{totalDeliveries}</h1>
                                    <h1 className='text-center lg:text-2xl'>Total Contract</h1>
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className='items-center'>
                        <div className="max-w-sm p-6  text-center items-center bg-[#C3DDFD] border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img className="w-11 mx-4 h-11 rounded-full  xl:ml-20 md:ml-6 sm:ml-6 lg:ml-14 my-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&usqp=CAU" alt="Rounded avatar" />
                            <p className='my-7'>
                                <h1 className='text-center lg:text-2xl'>{totalDeliveries2}</h1>
                                <h1 className='text-center lg:text-2xl'>Total Client</h1>
                            </p>

                        </div>
                    </div>
                    <div className='items-center'>
                        <div className="max-w-sm p-6  text-center items-center bg-[#84E1BC] border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img className="w-11 mx-4 h-11 rounded-full  xl:ml-20 md:ml-6 lg:ml-14 my-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&usqp=CAU" alt="Rounded avatar" />
                            <p className='my-7'>
                                <h1 className='text-center lg:text-2xl'>{totalDeliveries3}</h1>
                                <h1 className='text-center lg:text-2xl'>Total Site</h1>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashbord