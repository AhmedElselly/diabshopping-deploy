import styles from '../styles/Container.module.css';
import OurMap from './OurMap';

const Container = props => {
	return(
		<div className={styles.container}>
			<div className={styles.left}></div>
			<div className={styles.right}>
				{props.children}
			</div>
		</div>
	)
}

export default Container;