import { useState, useRef, useEffect, Fragment } from 'react';
import styles from '../../../styles/Create.module.css';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import {useRouter} from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const url = 'http://diabshopping.com/api/categories';

const UpdateCard = ({post}) => {
	const router = useRouter()
	const editorRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [files, setFiles] = useState('');
	const [category, setCategory] = useState(post.category);
	const [subCategory, setSubCategory] = useState(post.subCategory);
	const [categories, setCategories] = useState([]);
	const [allSubCategory, setAllSubCategory] = useState([]);
	const [selected, setSelected] = useState([]);
	const [alert, setAlert] = useState('يجب أﻻ يتعدى عدد الصور إلى 4 صور');
	console.log('sub', subCategory)
	const [values, setValues] = useState({
		_id: post._id,
		title: post.title,
		subtitle: post.subtitle,
		image: post.image,
		desc: post.desc,
		price: post.price,
		// category: post.category
	})

	const {
		_id,
		title,
		subtitle,
		image,
		price,
		desc,
		// category
	} = values;

	useEffect(() => {
		async function fetchData(){
			const res = await axios.get(`${url}`);
			setCategories(res.data);
			
			const subCat = await axios.get(`${url}/${category}`);
			console.log('subcategory', subCat.data);
			setAllSubCategory(subCat.data.subCategory);
		};
		fetchData();
	}, [category]);

	const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

	const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" sx={{mr: 5}} />
      </IconButton>
    </Fragment>
  );

	const handleChange = async e => {
		if(e.target.name === 'category'){
			setCategory(prev => e.target.value);
		}
		console.log('cat', category)
		if(e.target.name === 'subCategory'){
			setSubCategory(e.target.value)
			console.log('subCategory update', subCategory)
		}
		
		setValues({...values, [e.target.name]:e.target.value});
	}

	const handleClick = async () => {
		desc = editorRef.current.getContent();
		const formData = new FormData();
		
		for(let i = 0; i < files.length; i++){
			formData.append('image', files[i]);
			console.log('files', files[i])
		}

		let images = image.length + (files.length - selected.length);
		let total = 4;
		console.log(images)
		if(images > total){
			setOpen(true);
			return;
		}

		formData.append('title', title);
		formData.append('subtitle', subtitle);
		formData.append('price', price);
		formData.append('desc', desc);
		formData.append('category', category);
		formData.append('subCategory', subCategory);
		formData.append('selected', selected);
		
		
		const urlCreate = 'http://diabshopping.com/api/posts/product';
		// const urlCreate = 'http://localhost:8000/api/posts/product';
		const res = await axios.put(`${urlCreate}/${_id}/update`, formData);
		console.log(res.data)
		router.push(`/products/${res.data._id}`);
	}

	const marked = (i) => {
		
		// console.log(selected.indexOf(image[i]))
		if(selected.indexOf(image[i]) === -1){
			console.log(image[i]);
			setSelected(prev => [...prev, image[i]]);
		} else {
			setSelected(selected.filter(img => image[i] !== img))
		}
		
	}
	console.log(files)

	return(
		<Fragment>
			<Head>
        <title>تعديل {post.title}</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
		<div className={styles.container}>
			
			<div className={styles.wrapper}>
				<h3>تعديل {post.title}</h3>
				<div className={styles.item}>
						<label className={styles.label}>الاسم</label>
						<input 
							className={styles.input}
							type='text' 
							name='title'
							value={title}
							onChange={handleChange}
						/>
					</div>
				<div className={styles.item}>
						<label className={styles.label}>اسفل الاسم</label>
						<input 
							className={styles.input}
							type='text' 
							name='subtitle'
							value={subtitle}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.item}>
						<label className={styles.label}>الصور</label>
						<input 
							multiple
							className={styles.input}
							type='file' 
							onChange={e => setFiles(e.target.files)}
						/>
						<div className={styles.imageContainer}>
							{image.map((img, i) => (
								<div key={i} onClick={() => marked(i)}>
									<img width={100} style={{
										border: selected.indexOf(image[i]) === -1 ? 'none' : '1px solid red'
									}} height={100} src={img} alt={title} />
								</div>
							))}							
						</div>
					</div>
					<div className={styles.item}>
						<label className={styles.label}>الوصف</label>
						
						<Editor
						apiKey='0xzgp06wpyy2lrtsevxwhxcuasz3cs4rlxdjul1tzo810e78'
							onInit={(evt, editor) => editorRef.current = editor}
							initialValue={!desc ? "" : desc}
							
							// value={}
							// onChange={handleEditorChange}
							init={{
								height: 500,
								menubar: true,
								plugins: [
									'advlist autolink lists link image charmap print preview anchor',
									'searchreplace visualblocks code fullscreen',
									'insertdatetime media table paste code help wordcount'
								],
								toolbar: 'undo redo | formatselect | ' +
								'bold italic backcolor | alignleft aligncenter ' +
								'alignright alignjustify | bullist numlist outdent indent | ' +
								'removeformat | help',
								content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
							}}
						/>
					</div>
					<div className={styles.item}>
						<label className={styles.label}>السعر</label>
						<input 
							className={styles.input}
							type='number' 
							name='price'
							value={price}
							onChange={handleChange}
						/>
					</div>
					
					<div className={styles.item}>
						<label className={styles.label} htmlFor="category">التصنيف</label>
						<select onChange={handleChange} className={styles.input} name="category" value={category} id="category">
							{categories?.map(category => (
								<option  key={category._id} value={category.main}>{category.main}</option>
							))}							
						</select>
					</div>
					<div className={styles.item}>
						<label className={styles.label} htmlFor="category">تحت التصنيف</label>
						<select onChange={handleChange} className={styles.input} name="subCategory" value={subCategory} id="category">
							{allSubCategory?.map((category, i) => {
								// console.log('categpr', category)
							return <option  key={i} value={category}>{category}</option>
							})}							
						</select>
					</div>
					<button onClick={handleClick} className={styles.btn}>Submit</button>

			</div>
		</div>
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
			message={alert}
			action={action}
		/>
		</Fragment>
	)
}

export const getServerSideProps = async ctx => {
	const url = 'http://diabshopping.com/api/posts/product'
	const res = await axios.get(`${url}/${ctx.query.id}`);

	return {
		props: {
			post: res.data
		}
	}
}

export default UpdateCard;