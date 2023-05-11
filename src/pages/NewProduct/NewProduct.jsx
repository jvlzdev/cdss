import React, { useState } from 'react'
import { useCreateProductMutation } from '../../services/appApi';
import { useNavigate } from 'react-router-dom';
import categories from '../../constants/categories';

const NewProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description || !price || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        console.log('data', { name, description, price, category, images })
        createProduct({ name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    function showWidget() {
        console.log('window', window.cloudinary)
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dgpshvkkk",
                uploadPreset: "qt5rwlj4",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

    return (
        <div className='flex justify-center items-center h-fit mx-auto'>
            <form className='w-[50vh]	p-8 bg-slate-100' onSubmit={handleSubmit}>
                <h1 className='text-[3rem] text-center font-bold'>New Product</h1>
                <div className="mb-6">
                    <label className="block mb-2 text-md font-semibold text-dark-700">Product name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} className="text-lg p-4 focus:rounded-none rounded-none bg-transparent border border-gray-500 text-dark-900 placeholder-dark-700 block w-full" />
                    {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p> */}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-md font-semibold text-dark-700">Description</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} className="text-lg p-4 focus:rounded-none rounded-none bg-transparent border border-gray-500 text-dark-900 placeholder-dark-700 block w-full" />
                    {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p> */}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-md font-semibold text-dark-700">Price</label>
                    <input type="text" onChange={(e) => setPrice(e.target.value)} className="text-lg p-4 focus:rounded-none rounded-none bg-transparent border border-gray-500 text-dark-900 placeholder-dark-700 block w-full" />
                    {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p> */}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-md font-semibold text-dark-700">Category</label>
                    <select value={category} className="text-lg p-4 focus:rounded-none rounded-none bg-transparent border border-gray-500 text-dark-900 placeholder-dark-700 block w-full" onChange={(e) => setCategory(e.target.value)}>
                        <option defaultValue>
                            -- Select One --
                        </option>
                        {
                            categories.map((category) => (
                                <option key={category.value} value={category.value}>{category.name}</option>
                            ))
                        }
                    </select>
                    {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p> */}
                </div>
                <div className="mb-6">
                    {/* <label className="block mb-2 text-md font-semibold text-dark-700">Upload Images</label> */}
                    <button type="button" onClick={showWidget} className='w-full block p-6 text-neutral-900'>Upload Images</button>
                    <div className="images-preview-container">
                        {images.map((image) => (
                            <div className="image-preview" key={image}>
                                <img src={image.url} />
                                {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                            </div>
                        ))}
                    </div>
                    {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p> */}
                </div>
                <div>
                    <button type="submit" className='w-full block bg-neutral-950 p-6 text-white'>Create Product</button>
                </div>
            </form>
        </div>
    )
}

export default NewProduct