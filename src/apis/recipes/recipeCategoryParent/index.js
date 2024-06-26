import axios from "axios";
import { API_ENDPOINT } from "../../../../config";
const domain = API_ENDPOINT;
export async function getRecipeCategoryParent(filteredValues = { name: "", page: "" }) {
    try {
        const { name, page } = filteredValues;

        const res = await axios.get(
            `${domain}/api/v1/store/recipe_category_parent`, {
            params: {
                name: name,
                page,
            },
        }
        );
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

export async function addRecipe(name, description, image) {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image[0].originFileObj
        ); // Only send the first image

        const res = await axios.post(
            `${domain}/api/v1/store/recipe_category_parent/create`,
            formData,
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log("Error fetching data:", error);
        throw error; // Rethrow the error to handle it in the calling code if necessary
    }
}
export async function eidtRecipe(name, description, image, id) {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        formData.append('image', image[0].originFileObj ? image[0].originFileObj : ""
        );
        formData.append('_method', "PUT"); // Only send the first image

        const res = await axios.post(
            `${domain}/api/v1/store/recipe_category_parent/update/${id}`,
            formData,
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        );
        return res.data;
    } catch (error) {
        console.log("Error fetching data:", error);
        throw error; // Rethrow the error to handle it in the calling code if necessary
    }
}
export async function getRecipeById(id) {
    try {
        const res = await axios.get(
            `${domain}/api/v1/store/recipe_category_parent/${id}`
        );
        console.log(res.data)
        return res.data.data
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}
// export async function addRecipe(name, description, image) {
//     try {
//         const res = await axios.post(
//             `${domain}/api/v1/store/recipe_category_parent/create`, {
//             name: name,
//             description: description,
//             image: image[0],
//         }
//         );
//         return res.data
//     } catch (error) {
//         console.log("Error fetching data:", error);
//     }
// }
// export async function getSubCategories({ id }) {
//     console.log(id)
//     try {
//         const res = await axios.get(
//             `${domain}/api/v1/store/sub_categories/filter_by_category/${id}`
//         );
//         return res.data
//     } catch (error) {
//         console.log("Error fetching data:", error);
//     }
// }
// export async function getCategoryById(id) {
//     try {
//         const res = await axios.get(
//             `${domain}/api/v1/store/categories/${id}`
//         );
//         return res.data
//     } catch (error) {
//         console.log("Error fetching data:", error);
//     }
// }
// export async function editCategory(name, phoneNumber, address, id) {
//     try {
//         const res = await axios.post(
//             `${domain}/api/v1/store/categories/update/${id}`, {
//             name: name,
//             phone: phoneNumber,
//             address: address,
//             _method: "PUT"
//         }
//         );
//         return res.data
//     } catch (error) {
//         console.log("Error fetching data:", error);
//     }
// }
// export async function deleteCategory(id) {
//     try {
//         const res = await axios.delete(
//             `${domain}/api/v1/store/categories/delete/${id}`

//         );
//         return res.data
//     } catch (error) {
//         console.log("Error fetching data:", error);
//     }
// }
// export async function addCategory(name, description, image) {
//     console.log(name, description, image)
//     try {
//         const res = await axios.post(
//             `${domain}/api/v1/store/categories/create`, {
//             name: name,
//             description: description,
//             image: image,
//         }
//         );
//         return res.data
//     } catch (error) {
//         console.log("Error fetching data:", error);
//     }
// }