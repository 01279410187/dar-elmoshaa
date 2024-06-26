import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../../../../../apis/recipes/recipeCategoryParent';
import DynamicForm from '../../../../../components/shared/form/Form';

const AddRecipe = () => {
    const navigate = useNavigate()
    const handleSubmit = (formData) => {
        console.log(formData);
        addRecipe(formData.name, formData.description, formData.image)
        navigate('/warehouse/recipes/show-recipes')

    };

    const fields = [
        { type: 'text', name: 'name', placeholder: 'يجب عليك ادخال الاسم', required: true },
        { type: 'text', name: 'description', placeholder: 'يجب عليك ادخال الوصف', required: true },
        { type: 'image', name: 'image', placeholder: 'يجب عليك ادخال الصوره' },
    ];

    return (
        <div>
            <h1>ادخال تصنيف رئيسى</h1>
            <DynamicForm fields={fields} onSubmit={handleSubmit} />
        </div>
    );
};

export default AddRecipe;
