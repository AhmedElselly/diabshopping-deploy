import styles from '../styles/ImageContainer.module.css';
import Image from 'next/image';

const ImageContainer = ({image, title}) => {
	return(
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<img width={'100%'} height={'100%'} src={image} alt={title} />
			</div>
		</div>
	)
}

export default ImageContainer;