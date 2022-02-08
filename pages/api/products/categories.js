import dbConnect from '../../../utils/mongo';
import Product from '../../../models/Product';

const handler = async (req, res) => {
	const {method} = req;
	await dbConnect();
	if(method === 'GET'){
		
		const products = await Product.distinct('category');
		return res.json(products);
	
	}

	
}

export default handler;