import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eidtRecipe, getRecipeById } from '../../../../../apis/recipes/recipeCategoryParent';
import DynamicForm from '../../../../../components/shared/form/Form';

const EditRecipe = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null); // Initialize data as null
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipeData = await getRecipeById(id);
                setData(recipeData);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData(); // Call fetchData when component mounts
    }, [id]); // useEffect dependency on id

    const handleSubmit = (formData) => {
        console.log(formData);
        eidtRecipe(formData.name, formData.description, formData.image, id);
        navigate('/warehouse/recipes/show-recipes');
    };

    const fields = [
        { type: 'text', name: 'name', placeholder: 'يجب عليك ادخال الاسم', required: true },
        { type: 'text', name: 'description', placeholder: 'يجب عليك ادخال الوصف', required: true },
        { type: 'image', name: 'image', placeholder: 'يجب عليك ادخال الصوره' },
    ];

    return (
        <div>
            <h1>تعديل تصنيف رئيسى</h1>
            {data && <DynamicForm fields={fields} initialValues={data} onSubmit={handleSubmit} />} {/* Pass initial values if data is available */}
        </div>
    );
};

export default EditRecipe;