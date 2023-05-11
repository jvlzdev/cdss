import React from 'react'
import { Link } from "react-router-dom";
import categories from '../../constants/categories';

const Categories = () => {
    return (
        <div className="flex items-center justify-center h-20">
            <div className="hidden md:block">
                <div className="flex items-baseline">
                    {categories.map((category) => (
                        <Link
                            key={category.value}
                            to={`/category/${category.value.toLocaleLowerCase()}`}
                            className="ml-4 px-2 py-2 rounded-md text-sm font-semibold text-gray-900 transition duration-700 ease-in-out hover:text-gray-500"
                        >
                            {category.name.toLocaleUpperCase()}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categories