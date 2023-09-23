import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import {
  CategoryTable,
  CategoryModal,
  ConfirmDeleteModal,
} from "../../Organism";
import { Pagination, SearchBar } from "../../Moleluces";

interface Category {
  id: number;
  name: string;
  is_active: boolean;
}

const authToken: string = localStorage.getItem("token") || "";

function DashboardTemplateModular() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(
    null
  );

  const [formValues, setFormValues] = useState<{
    name: string;
    is_active: boolean;
  }>({
    name: "",
    is_active: true,
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = `https://mock-api.arikmpt.com/api/category?page=${currentPage}&name=${searchTerm}`;
      const res = await fetch(url, {
        headers: { Authorization: authToken },
        method: "GET",
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
      const existingCategory = data.find(
        (item) => item.name === formValues.name
      );
      if (
        existingCategory &&
        (!currentCategory || existingCategory.id !== currentCategory.id)
      ) {
        throw new Error("Category name already exists");
      }
      if (currentCategory) {
        await fetch(`https://mock-api.arikmpt.com/api/category/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
          body: JSON.stringify({
            id: currentCategory.id,
            name: formValues.name,
            is_active: formValues.is_active,
          }),
        });
      } else {
        await fetch("https://mock-api.arikmpt.com/api/category/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
          body: JSON.stringify({
            name: formValues.name,
            is_active: formValues.is_active,
          }),
        });
      }
      showNotification("Category created/updated successfully");
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
    setFormValues({ name: "", is_active: true });
  };

  const handleDelete = (id: number) => {
    setCategoryIdToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryIdToDelete !== null) {
      try {
        await fetch(
          `https://mock-api.arikmpt.com/api/category/${categoryIdToDelete}`,
          {
            method: "DELETE",
            headers: { Authorization: authToken },
          }
        );
        showNotification("Category deleted successfully");
        fetchData();
      } catch (e) {
        showNotification("Deletion failed");
      }
    }
    setIsConfirmModalOpen(false);
    setCategoryIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
    setCategoryIdToDelete(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setFormValues({ name: category.name, is_active: category.is_active });
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <SearchBar onSearchTermChange={setSearchTerm} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>

      {notification && (
        <div className="mb-4 text-green-500">{notification}</div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          <CategoryTable
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Fragment>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleCancel}
        onOk={handleOk}
        currentCategory={currentCategory}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default DashboardTemplateModular;
