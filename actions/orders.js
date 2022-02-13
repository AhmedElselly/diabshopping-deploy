import axios from 'axios';

const url = 'https://diabshopping.com/api/orders';

export const getOrders = async () => {
    const res = await axios.get(`${url}`);
    return res;
}