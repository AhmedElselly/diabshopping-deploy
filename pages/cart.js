import { useState, useEffect, Fragment } from 'react';
import styles from '../styles/Cart.module.css';
import { useSelector, useDispatch } from 'react-redux';
import OrderDetailed from '../components/OrderDetailed';
import axios from 'axios';
import {useRouter} from 'next/router';
import Alert from '../components/Alert';
import Image from 'next/image';
import Head from 'next/head';

// import {
// 	PayPalScriptProvider,
// 	PayPalButtons,
// 	usePayPalScriptReducer
// } from '@paypal/react-paypal-js';

// const amount = '2';
// const currency = 'usd';


const Cart = props => {
	const dispatch = useDispatch();
	const router = useRouter();
	const cart = useSelector(state => state.cart);
	const [cash, setCash] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [success, setSuccess] = useState(false);


	useEffect(() => {
		if(success){
			setTimeout(() => {
				setSuccess(false)
			}, 3000);			
		}
	}, [success]);

	const url = 'https://api-diabshopping.herokuapp.com/api/orders/create';

	const createOrder = async data => {
		
		try {
			console.log('data', data)
			
			const res = await axios.post(`${url}`, data);
			console.log(res.data)
			setSuccess(true);
			setSuccessMessage('تم الطلب وسيتم التواصل معك قريبا')
			dispatch(reset());
			
		
		} catch(err) {

		}
	}

	const handleCash = (bool) => setCash(bool);

	return(
		<Fragment>
			<Head>
				<title>العربة</title>
				<meta name="description" content="العربة" />
				<link rel="icon" href="/favicon.ico" />
				
			</Head>
		<div className={styles.container}>
			<div className={successMessage ? styles.alert : styles.none}>
				{success && (
					<Alert message={successMessage} />
				)}
			</div>
			<div className={styles.left}>
				<table className={styles.table}>
					<tr className={styles.trTitle}>
						<th>المنتج</th>
						<th>الاسم</th>
						<th>السعر</th>
						<th>الكمية</th>
						<th>الاجمالي</th>
					</tr>
					{cart.products.map(product => (
						<tr className={styles.tr} key={product._id}>
							<td className={styles.td}>
								<div className={styles.imgContainer}>
									<Image 
										src={product.image[0]}
										alt={product.title}
										width={'100%'}
										height={'100%'}
										style={{objectFit: 'cover'}}
									/>
								</div>
							</td>
							<td className={styles.td}>
								<span className={styles.name} >{product.title}</span>
							</td>
							<td className={styles.td}>
								<span className={styles.price}>
									{product.price} جـ.م
								</span>
							</td>
							<td className={styles.td}>
								<span className={styles.qty}>
									{product.qty}
								</span>
							</td>
							<td className={styles.td}>
								<span className={styles.total}>
								{product.price * product.qty} جـ.م
								</span>
							</td>
						</tr>
					))}
					
				</table>
			</div>
			<div className={styles.right}>
				<div className={styles.wrapper}>
					<h2 className={styles.title}>إجمالي العربة</h2>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>الاجمالي قبل الخصم: </b>
						{cart.total} جـ.م
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>الخصم: </b>0.00 جـ.م
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>الاجمالي بعد الخصم: </b>
						{cart.total} جـ.م
					</div>
					<button onClick={() => setCash(true)} className={styles.btn}>أطلب</button>
				</div>
			</div>
			{cash && (
				<OrderDetailed total={cart.total} cart={cart} handleCashProp={handleCash} createOrder={createOrder} />
			)}
		</div>
		</Fragment>
	)
}

export default Cart;