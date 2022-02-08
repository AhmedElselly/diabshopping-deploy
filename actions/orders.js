import axios from 'axios';

const url = 'https://diabshopping-deploy.vercel.app/api/orders';

export const getOrders = async () => {
    const res = await axios.get(`${url}`);
    return res;
}