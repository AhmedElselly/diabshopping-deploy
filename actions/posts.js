import axios from 'axios';

const url = 'https://diabshopping.com/api/posts';

export const featuredPosts = async () => {
    const res = await axios.get(`${url}/home`);
    return res;
}

export const getProducts = async () => {
    const res = await axios.get(`${url}/allProducts`);
    return res;
}

export const remove = async id => {
    const res = await axios.delete(`${url}/${id}`);
    return res;
}


export const update = async (id, title, desc, price, image, category) => {
    const res = await axios.put(`${url}/${id}`, {
        title,
        price,
        desc,
        category,
        image
    });
    return res;
}