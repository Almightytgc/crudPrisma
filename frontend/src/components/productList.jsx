import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useSWR, {useSWRConfig} from "swr";
import Swal from 'sweetalert2'

function ProductList() {

    const {mutate} = useSWRConfig();

    const fetcher = async () => {
        const response = await axios.get('http://localhost:5000/products');
        return response.data;
    };

    const { data } = useSWR('products', fetcher);
    console.log(data);
    if (!data) return <h2>Loading...</h2>;

    const deleteProduct = async (productId) => {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel'
        });
    
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:5000/products/${productId}`);
            mutate('products');
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          } catch (error) {
            Swal.fire('Error!', 'An error occurred while deleting the file.', 'error');
          }
        }
      };


    return (
        <div className='flex flex-col mt-5'>
            <div className="w-full">
                <Link to="/add" className='bg-green-500 hover:bg-green-700 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg'>Add New</Link>
                <div className="relative shadow rounded-lg mt-3 flex justify-center">
                    <table className='text-xl text-left text-gray-500 w-[80%]'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                            <tr>
                                <th className='py-3 px-1 text-center'>No</th>
                                <th className='py-3 px-1 text-center'>Product Name</th>
                                <th className='py-3 px-1 text-center'>Price</th>
                                <th className='py-3 px-1 text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((product, index) => {
                                return (
                                    <tr className='bg-white border-b' key={product.id}>
                                        <td className='py-3 px-6 text-center'>{index + 1}</td>
                                        <td className='py-3 px-6 text-center'>{product.name}</td>
                                        <td className='py-3 px-6 text-center'>{product.price}</td>
                                        <td className='py-3 px-6 text-center'>
                                            <Link to={`/edit/${product.id}`} className='font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1'>Edit</Link>
                                            <button className='font-medium bg-redd-400 bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white mr-1' onClick={() => deleteProduct(product.id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductList;