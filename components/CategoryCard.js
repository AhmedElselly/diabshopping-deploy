import styles from '../styles/CategoryCard.module.css';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import CountertopsIcon from '@mui/icons-material/Countertops';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import BlenderIcon from '@mui/icons-material/Blender';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CoffeeIcon from '@mui/icons-material/Coffee';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useState, ReactDOM } from 'react';
import { useRouter } from 'next/router';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const CategoryCard = ({category, subCategory}) => {
	const router = useRouter();
	const [checked, setChecked] = useState(false);

	const handleClick = () => {
		setChecked(prev => !prev);
	}

	
	const handleUncheck = () => {
		setChecked(false);
	}

	const handleRoute = sub => {
		router.push(`/products?search=${sub}`);
		setChecked(false);
	}

	return(
		<ClickAwayListener onClickAway={handleUncheck}>
			<div onClick={handleClick} tabIndex={0} className={styles.container}>
				<div className={styles.iconContainer}>
					<MicrowaveIcon/>
				</div>
				<span>{category.main}</span>
				{subCategory && (
					<div style={{display: checked ? 'block' : 'none'}} className={styles.subCategory}>
						{subCategory.map((sub, i) => (
							<div key={i} onClick={() => handleRoute(sub)} className={styles.subText}>{sub}</div>
						))}
					</div>	
				)}			
			</div>
		</ClickAwayListener>
	)
}

export default CategoryCard;