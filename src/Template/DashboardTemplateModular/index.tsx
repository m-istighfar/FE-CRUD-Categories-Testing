import { useState, useEffect } from 'react';

import { CategoryModal2, CategoryTable, ConfirmDeleteModal } from '../../Organism';
import { SearchBar, Pagination } from '../../Moleluces';
import { PlusIcon } from '@heroicons/react/20/solid';

interface Category {
    id: number;
    name: string;
    is_active: boolean;
}

const authToken: string = localStorage.getItem('token') || '';

function DashboardTemplate2() {
    const [data, setData] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(null);
    const [formValues, setFormValues] = useState<{
        name: string;
        is_active: boolean;
    }>({
        name: '',
        is_active: true,
    });
    const [notification, setNotification] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 1000);
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const url = `https://mock-api.arikmpt.com/api/category?page=${currentPage}&name=${searchTerm}`;
            const res = await fetch(url, {
                headers: { Authorization: authToken },
                method: 'GET',
            });
            const result = await res.json();
            setData(result.data || []);
            setTotalPages(result.total_page || 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, currentPage]);

    const handleOk = async () => {
        try {
            const existingCategory = data.find((item) => item.name === formValues.name);
            if (
                existingCategory &&
                (!currentCategory || existingCategory.id !== currentCategory.id)
            ) {
                throw new Error('Category name already exists');
            }
            if (currentCategory) {
                await fetch(`https://mock-api.arikmpt.com/api/category/update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify({
                        id: currentCategory.id,
                        name: formValues.name,
                        is_active: formValues.is_active,
                    }),
                });
            } else {
                await fetch('https://mock-api.arikmpt.com/api/category/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify({
                        name: formValues.name,
                        is_active: formValues.is_active,
                    }),
                });
            }
            showNotification('Category created/updated successfully');
            fetchData();
            handleCancel();
        } catch (e) {
            if (e instanceof Error) {
                showNotification(e.message);
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setCurrentCategory(null);
        setFormValues({ name: '', is_active: true });
    };

    const handleDelete = (id: number) => {
        setCategoryIdToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (categoryIdToDelete !== null) {
            try {
                await fetch(`https://mock-api.arikmpt.com/api/category/${categoryIdToDelete}`, {
                    method: 'DELETE',
                    headers: { Authorization: authToken },
                });
                showNotification('Category deleted successfully');
                fetchData();
            } catch (e) {
                showNotification('Deletion failed');
            }
        }
        setIsConfirmModalOpen(false);
        setCategoryIdToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsConfirmModalOpen(false);
        setCategoryIdToDelete(null);
    };

    const handleEdit = (record: Category) => {
        setFormValues({ name: record.name, is_active: record.is_active });
        setCurrentCategory(record);
        setIsModalOpen(true);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className='flex flex-col mx-auto w-11/12'>
            <div className='flex justify-between items-center mb-6 mt-5'>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <button
                    onClick={() => setIsModalOpen(true)}
                    className='flex justify-center bg-blue-500  text-white text-sm rounded-md px-4 py-2 focus:outline-none hover:bg-blue-600'
                >
                    <PlusIcon className='h-5 w-5 mr-2' />
                    Create Category
                </button>
            </div>
            <CategoryTable
                data={data}
                loading={loading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
            <CategoryModal2
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                handleOk={handleOk}
                formValues={formValues}
                setFormValues={setFormValues}
                currentCategory={currentCategory}
            />

            <ConfirmDeleteModal
                isConfirmModalOpen={isConfirmModalOpen}
                handleConfirmDelete={handleConfirmDelete}
                handleCancelDelete={handleCancelDelete}
            />
            {notification && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='bg-green-500 text-white py-2 px-4 rounded-md shadow-md'>
                        {notification}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardTemplate2;
