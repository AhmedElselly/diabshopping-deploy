import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, Fragment, useRef, useEffect } from 'react';
import styles from '../styles/Create.module.css';
import Head from 'next/head';
import { Editor } from '@tinymce/tinymce-react';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// import { useQuill } from 'react-quilljs';
const url = 'http://diabshopping.com/api/categories';

const Create = props => {
	// const [editorState, setEditorState] = useState(
  //   () => EditorState.createEmpty(),
  // );
	// const { quill, quillRef } = useQuill();
	const editorRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [alert, setAlert] = useState('يجب أﻻ يتعدى عدد الصور إلى 4 صور');
	const [files, setFiles] = useState([]);
	const [values, setValues] = useState({
		title: '',
		subtitle: '',
		price: '',
		image: [],
	});
	const [category, setCategory] = useState('');
	const [subCategory, setSubCategory] = useState('');
	const [categories, setCategories] = useState([]);
	const [allSubCategory, setAllSubCategory] = useState([]);
	const router = useRouter();

	const {
		title,
		subtitle,
		desc,
		price,
		image,
		file,
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
		console.log(allSubCategory)
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

	const handleChange = e => {
		if(e.target.name === 'category'){
			setCategory(prev => e.target.value);
		}
		console.log('cat', category)
		if(e.target.name === 'subCategory'){
			setSubCategory(e.target.value)
			console.log('subCategory update', subCategory)
		}
		// let value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
		// console.log([e.target.name],value)
		setValues({...values, [e.target.name]: e.target.value});
	}


	const handleClick = async () => {
		desc = editorRef.current.getContent();
		
		const formData = new FormData();
		for(let i = 0; i < files.length; i++){
			formData.append('image', files[i]);
			console.log('files', files[i])
		}

		// let images = image.length + (files.length - selected.length);
		let total = 4;
		// console.log(images)
		if(files.length > total){
			setOpen(true);
			return;
		}
		
		formData.append('title', title);
		formData.append('subtitle', subtitle);
		formData.append('price', price);
		formData.append('desc', desc);
		formData.append('category', category);
		formData.append('subCategory', subCategory);
		
		
		const urlCreate = 'http://diabshopping.com/api/posts/create';
		// const urlCreate = 'http://localhost:8000/api/posts/create';
		console.log(formData)
		const res = await axios.post(`${urlCreate}`, formData);
		

		router.push(`/products/${res.data._id}`);
	}

	

	return(
		<Fragment>
			<Head>
				<title>Create Ordering App</title>
				<meta name="description" content="Diab shopping cart for home accessories" />
				<link rel="icon" href="/favicon.ico" />			
			</Head>
		
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1 className={styles.title}>إنشاء منتج</h1>
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
						<label className={styles.label}>
							أسفل الاسم
						</label>
						<input 
							className={styles.input}
							type='text' 
							name='subtitle'
							value={subtitle}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.item}>
						<label className={styles.label}>الصورة</label>
						<input 
							className={styles.input}
							type='file' 
							onChange={(e) => setFiles(e.target.files)}
							multiple
						/>
					</div>
					<div className={styles.item}>
						<label className={styles.label}>الوصف</label>
						{/* <div style={{ width: '100%', height: 200, marginBottom: 100 }}>
							<div ref={quillRef} />
						</div> */}
						{/* <input 
							className={styles.input}
							type='text' 
							name='desc'
							value={desc}
							onChange={handleChange}
						/> */}
						<Editor
						apiKey='0xzgp06wpyy2lrtsevxwhxcuasz3cs4rlxdjul1tzo810e78'
							onInit={(evt, editor) => editorRef.current = editor}
							initialValue={desc ? "" : desc}
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
					
					<button onClick={handleClick} className={styles.btn}>إدخال</button>

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
	try {
		const myCookie = ctx.req.cookies
		console.log(JSON.parse(myCookie.token).admin)
		
	} catch(err){
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}
	return {
		props: {
			admin: ''
		}
	}
	
}

export default Create;