import { createProduct, updateProduct, deleteProduct, fetchProductDetails, listProducts } from '../services/product.service.js';
import { publishProductCreated, publishProductUpdated, publishProductDeleted } from '../mq/producer.js';

const createProductController = async( req, res) => {
    try{
        const {name, description, price, category, stock} = req.body;

        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({message: 'All fields are required'});
        }
        
        const product = await createProduct(req.body);

        await publishProductCreated(product);

        return res.status(201).json({message: 'Product created successfully', product: product});

    }catch(err){
        
        return res.status(500).json({message: 'Internal server error'});

    }
}


const updateProductController = async(req, res) => {
    
        try{

            const updatedProduct = await updateProduct(req.params.id, req.body);

            if(!updatedProduct){
                return res.status(404).json({message: 'Product not found'});
            }

            await publishProductUpdated(updatedProduct);

            return res.status(200).json({message: 'Product updated successfully', product: updatedProduct});

        }catch(err){
            console.error(err); // add this
            return res.status(500).json({message: 'Internal server error'});
        } 


}


const deleteProductController = async( req, res) => {
    try{
        const deletedProduct = await deleteProduct(req.params.id);

        if(!deletedProduct){
            return res.status(404).json({message: 'Product not found'});
        }

        await publishProductDeleted(deletedProduct);

        return res.status(200).json({message: 'Product deleted successfully', product: deletedProduct});

    }catch(err){
        return res.status(500).json({message: 'Internal server error'});
    }
}


const fetchProductDetailsController = async( req, res) => {
    try{
        const product = await fetchProductDetails(req.params.id);

        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }

        return res.status(200).json({message: 'Product fetched successfully', product: product});

    }catch(err){
        return res.status(500).json({message: 'Internal server error'});
    }
}


const listProductsController = async(req, res) => {
    try{
        
        const products = await listProducts(req.query);

        return res.status(200).json({message: 'Products fetched successfully', products: products});

    }catch(err){
        return res.status(500).json({message: 'Internal server error'});
    }

}

export { createProductController, updateProductController, deleteProductController, fetchProductDetailsController, listProductsController };