import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'
import Featured from '../components/Featured'
import ProductList from '../components/ProductList'
import ByCategory from '../components/ByCategory'
import Error from 'next/error';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import queryString from 'query-string';
import { useState, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CategoryCard from '../components/CategoryCard'
import { isAuthenticated } from '../actions/auth'

const Home = ({errorCode, productsList, byCategories, categories}) => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

	const handleChange = e => {
		setSearch(e.target.value)
	}

	const handleSubmit = async (e) => {
    e.preventDefault();
		
    router.push(`/products?search=${search}`);

	}

  const handleRoute = (cat) => {
    router.push(`/products?search=${cat}`)
  }

  console.log(isAuthenticated())

  return (
    <div className={styles.container}>
      <Head>
        <title>Diab Shopping</title>
        <meta name="description" content="Diab shopping cart" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

      <Layout/>
      <Featured/>

      {/* SEARCH BAR */}
      <form onSubmit={handleSubmit} className={styles.item}>
				<input 
					type='text' 
					placeholder='بحث'
					name='search'
					value={search}
					onChange={handleChange}
					className={styles.input}
				/>
				<SearchIcon onClick={handleSubmit} fontSize='large' className={styles.searchIcon} sx={{
					color: 'gray',
					cursor: 'pointer'
				}} />
			</form>
      {/* END SEARCH BAR */}
        <div className={styles.categoriesContainer}>
          {categories.map(category => {
            console.log(category.main)
            return(
              <div key={category._id} onClick={() => handleRoute(category.main)}>
                <CategoryCard category={category} />
              </div>
          )})}
        </div>
      {/* {!loaded && <ProductList search={false} products={productsList}/>}
      {loaded && (
        <Fragment>
          
          <ProductList search={true} products={products}/>
          
        </Fragment>
      )} */}
      {byCategories.map((category, i) => <ByCategory key={i} category={category}/>)}
      {/* <Footer/> */}
    </div>
  )
}


export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req.cookies;
  const url = 'https://diabshopping.com/api';
  // const url = 'http://localhost:8000/api';
  const res = await axios.get(`${url}/posts/home`);
  const byCategories = await axios.get(`${url}/posts/byCategories`);
  const categories = await axios.get(`${url}/categories`);

  console.log(byCategories.data)

  return {
    props: {
      productsList: res.data,
      byCategories: byCategories.data,
      categories: categories.data
    }
  }
}

export default Home;