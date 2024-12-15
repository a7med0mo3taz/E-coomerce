import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';

export default function SubCategories({ categoryId, selectedCategoryName }) {
    const [subCategories, setSubCategories] = useState([]);  // حالة لتخزين الـ subcategories
    const [loading, setLoading] = useState(false);  // حالة لتحميل البيانات
    const [error, setError] = useState(null);  // حالة لخطأ في تحميل البيانات

    // استخدام useEffect لجلب الـ subcategories عند تغيير categoryId
    useEffect(() => {
        if (categoryId) {
            console.log("Fetching subcategories for category ID:", categoryId);  // تحقق من الـ categoryId المستلم
            fetchSubCategories(categoryId);
        }
    }, [categoryId]);

    async function fetchSubCategories(categoryId) {
        try {
            setLoading(true);
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
            setSubCategories(response.data.data);  // تحديث الـ state بـ subcategories
            console.log("Subcategories fetched:", response.data.data);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            setError("Error fetching subcategories.");
        } finally {
            setLoading(false);
        }
    }

    // دالة لعرض الـ subcategories
    function renderSubCategories() {
        if (loading) {
            return <Loading />;
        }

        if (error) {
            return <p className="text-center text-red-500">{error}</p>;
        }

        if (subCategories.length === 0) {
            return <div className="sub-title my-6 text-gray-500 text-3xl m-6 flex justify-center items-center">
                No subcategories available for {selectedCategoryName}
            </div>;
        }

        return (
            <>
                {/* عرض عنوان الـ subcategories */}
                <div className="sub-title text-green-500 text-3xl m-6 flex justify-center items-center">
                    {selectedCategoryName} Subcategories
                </div>

                {/* عرض الـ subcategories */}
                <div className="mx-auto max-w-7xl my-10 gap-5 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {subCategories.map((item) => (
                        <div key={item._id} className="overflow-hidden card cursor-pointer border border-gray-200 rounded-lg">
                            <div className="p-1  col-span-1">
                                <h5 className="mb-2 text-3xl p-4 text-center border-spacing-1 tracking-tight text-gray-900">
                                    {item.name}
                                </h5>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return <div>{renderSubCategories()}</div>;
}
