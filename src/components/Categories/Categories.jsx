import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import SubCategories from '../SubCategories/SubCategories';  // استيراد كومبوننت SubCategories

export default function Categories() {
    const subCategoriesRef = useRef(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState(null); 

    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle('Categories');

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['categories'],
        queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/categories'),
        staleTime: 1000 * 60 * 15,
    });

    useEffect(() => {
        if (data) {
            console.log("Categories data:", data);
        }
    }, [data]);

    function handleCategoryClick(category) {
        setSelectedCategoryId(category._id);
        setSelectedCategoryName(category.name);

        // تحريك الشاشة إلى الـ subcategories
        // if (subCategoriesRef.current) {
        //     subCategoriesRef.current.scrollIntoView({ behavior: 'smooth' });
        // }
        if (subCategoriesRef.current) {
            // التحرك إلى بداية الـ subcategories
            subCategoriesRef.current.scrollIntoView({ behavior: 'smooth' });
    
            // الانتظار قليلاً ثم التحرك إلى نهاية الصفحة
            setTimeout(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth',
                });
            }, 500); // الانتظار نصف ثانية (يمكنك تعديله)
        }
    }
    function renderCategories() {
        return data.data.data.map((category) => (
            <div
                key={category._id}
                className="flex flex-col justify-center items-center card overflow-hidden cursor-pointer border border-gray-200 rounded-lg"
                onClick={() => {
                    setSelectedCategoryId(category._id);
                    setSelectedCategoryName(category.name);
                    handleCategoryClick(category)
                }}
            >
                <div className="w-full overflow-hidden flex flex-col justify-center items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img
                        className="h-[300px] w-full object-cover object-center"
                        src={category.image}
                        alt={category.name}
                    />
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900">
                            {category.name}
                        </h5>
                    </div>
                </div>
            </div>
        ));
    }

    function handleSubCategoriesLoaded() {
        // تحريك الشاشة إلى نهاية الصفحة
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }
    
    return (
        <>
            {isLoading && <Loading />}
            {isError && <div>Error: {error.message}</div>}
            {!isLoading && !isError && data?.data?.data.length > 0 ? (
                <div className="mx-auto max-w-7xl my-24 gap-5 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {renderCategories()}
                </div>
            ) : (
                <p className="text-center text-gray-500">No categories found.</p>
            )}
    
            {selectedCategoryName && (
                <SubCategories
                    categoryId={selectedCategoryId}
                    selectedCategoryName={selectedCategoryName}
                    onSubCategoriesLoaded={handleSubCategoriesLoaded} // تمرير الدالة هنا
                />
            )}
        </>
    );
    
}
