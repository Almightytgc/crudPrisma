import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/products", {name: name,
        price: parseInt(price)
    });
    Swal.fire('saved!', '', 'success')
    navigate("/");
    }

  return (
    <div className='max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
        <form onSubmit={saveProduct} className='my-' >
            <div className="flex flex-col">
                <div className="mb-5">
                    <label htmlFor="" className="font-bold text-slate-700">Product Name</label>
                    <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:boder-slate-500 hover:shadow" placeholder='product name' value={name} onChange={(e)=> setName(e.target.value)}/>
                </div>

                <div className="mb-5">
                    <label htmlFor="" className="font-bold text-slate-700">Price</label>
                    <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:boder-slate-500 hover:shadow" placeholder='product price' value={price} onChange={(e)=> setPrice(e.target.value)}/>
                </div>

                <button type="submit" className='w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow'>Save</button>
            </div>
        </form>
    </div>
  )
}
