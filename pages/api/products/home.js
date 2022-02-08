import dbConnect from '../../../utils/mongo';
import Product from '../../../models/Product';


const handler = async (req, res) => {
	const {method} = req;
	await dbConnect();
	if(method === 'GET'){
		try{
			const products = await Product.find().limit(6).sort('-createdAt');
			return res.status(200).json(products);
		} catch(err){
			res.status(400).json(err);
		}
	}
}

export default handler;