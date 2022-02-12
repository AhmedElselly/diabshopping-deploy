import { useState, Fragment, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/Product.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {addProduct} from '../../../redux/cartSlice';
import { Markup } from 'react-render-markup';
import Alert from '../../../components/Alert';
import ByCategory from '../../../components/ByCategory';
import ImageContainer from '../../../components/ImageContainer';

const Product = ({product, categories}) => {
	const [size, setSize] = useState(0);
	const [basicImage, setBasicImage] = useState(product.image[0]);
	const [showImage, setShowImage] = useState(false);
	const [price, setPrice] = useState(product.price);
	const [extras, setExtras] = useState([]);
	const [qty, setQty] = useState(1);
	const [successMessage, setSuccessMessage] = useState('');
	const [success, setSuccess] = useState(false);
	const dispatch = useDispatch();

	const changePrice = number => {
		setPrice(price + number);
	}

	useEffect(() => {
		setBasicImage(product.image[0]);
	}, [product.image[0]]);


	useEffect(() => {
		if(success){
			setTimeout(() => {
				setSuccess(false)
			}, 3000);			
		}
	}, [success]);

	// useEffect(async () => {
		// const res = await axios.get(`http://localhost:3000/api/products/related`);
		// console.log(res.data)
	// }, []);

	const handleChange = (e, option) => {
		const checked = e.target.checked;
		if(checked){
			changePrice(option.price)
			setExtras(prev => [...prev, option]);
		} else {
			changePrice(-option.price);
			setExtras(extras.filter(extra => extra._id !== option._id));
		}
	}

	const handleQty = e => {
		setQty(e.target.value);
	}

	const handleAddToCart = () => {
		dispatch(addProduct({...product, extras, price, qty}));
		setSuccess(true)
		setSuccessMessage('تم الإضافة في السلة');
	}

	const showImageContainer = () => {
		setShowImage(true);
	}

	const handleImage = image => {
		setBasicImage(image)
	}

	return(
		<Fragment>
			<Head>
				<title>{product.title}</title>
				<meta name="description" content="Best products shop in town" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
		<div className={styles.container}>
			<div className={successMessage ? styles.alert : styles.none}>
				{success && (
					<Alert message={successMessage} />
				)}
			</div>
			<div className={styles.left}>
				<div onFocus={showImageContainer} tabIndex={0} onBlur={()=> setShowImage(false)} className={styles.imgContainer}>
					<img src={basicImage} alt={product.title} className={styles.img} />
				</div>
			</div>
			<div className={styles.right}>
				<h1 className={styles.title}>{product.title}</h1>
				<div>
					<Markup markup={product.desc} />
				</div>
				<span className={styles.price}>{price}جـ.م</span>

				{product.image.length <= 4 && (
					<Fragment>
						<div className={styles.additionalImagesContainer}>
							{product.image.map(image => (
								<img onClick={() => handleImage(image)} className={styles.additionalImage} src={image} alt={product.title} />	
							))}
						</div>
					</Fragment>
				)}
				
				<div className={styles.add}>
					<label style={{
						marginLeft: 5,
						fontWeight: 'bold'
					}}>الكمية المطلوبة:</label>
					<input type='number' onChange={handleQty} defaultValue={1} className={styles.qty} />
					<button onClick={handleAddToCart} className={styles.btn}>أضف للعربة</button>
				</div>
			</div>
		</div>
		
		<div className={showImage ? styles.imageMagnifiedBlock : styles.imageMagnifiedNone}>
			<ImageContainer image={basicImage} title={product.title} />
		</div>
		
		{categories.map((category, i) => <ByCategory key={i} category={category}/>)}
		</Fragment>
	)
}

export const getServerSideProps = async (ctx) => {
  const url = 'https://api-diabshopping.herokuapp.com/api/posts';
  // const url = 'http://localhost:8000/api/posts';
  const res = await axios.get(`${url}/product/${ctx.params.id}`);
	console.log(res.data)
	const categories = await axios.get(`${url}/byCategories`);
  return {
    props: {
      product: res.data,
			categories: categories.data
    }
  }
}

export default Product;