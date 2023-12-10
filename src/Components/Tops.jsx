import React from 'react'
function Tops() {
    return (
        <div>
            <button type="button" className="text-white bg-slate-400  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                <div className="flex items-center me-4">
                    <img className="w-5 mx-4 h-5 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&usqp=CAU" alt="Rounded avatar" />
                    <p>
                        kkami575409@gmail.com
                        <p>Image</p>
                    </p>
                </div>
            </button>
            <button type="button" className="float-right text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
        </div>
    )
}

export default Tops