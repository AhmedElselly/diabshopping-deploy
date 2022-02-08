import axios from 'axios';

const url = 'https://api-diabshopping.herokuapp.com/api/orders';

export const getOrders = async () => {
    const res = await axios.get(`${url}`);
    return res;
}