import axios from 'axios';

const url = 'http://diabshopping.com/api/orders';

export const getOrders = async () => {
    const res = await axios.get(`${url}`);
    return res;
}