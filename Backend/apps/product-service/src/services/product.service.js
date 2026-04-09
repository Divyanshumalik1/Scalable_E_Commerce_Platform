import prisma from  '../config/db.js';


/*

    id             
    name        
    description 
    price       
    category    
    stock       

*/

const createProduct = async (productData) => {
    // Implementation for creating a product

    try {

        const { name, description, price, category, stock } = productData;

        if (!name || !description || price == null || stock == null) {
            throw new Error('Required fields missing');
        }

        const product = await prisma.product.create({
            data: {
                name: name,
                description: description,
                price: price,
                category: category,
                stock: stock
            }
        });

        return product;

    } catch (err) {
        throw new Error('Error creating product: ' + err.message);
    }

};


const updateProduct = async (productId, updateData) => {

    try {
        const { name, description, price, category, stock } = updateData;

        const updatedData = {};

        if (name !== undefined) updatedData.name = name;
        if (description !== undefined) updatedData.description = description;
        if (price !== undefined) updatedData.price = price;
        if (category !== undefined) updatedData.category = category;
        if (stock !== undefined) updatedData.stock = stock;

        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(productId) },
            data: updatedData
        })

        return updatedProduct;

    } catch (err) {
        console.error('UPDATE ERROR:', err.message); // add this
        throw new Error('Error updating product: ' + err.message);
    }

};

const deleteProduct = async (productId) => {
    try {
        const deletedProduct = await prisma.product.delete({
            where: { id: parseInt(productId) }
        });
        return deletedProduct;
    } catch (err) {
         console.error('DELETE ERROR:', err.message); // add this
        throw new Error('Error deleting product: ' + err.message);
    }
};

const fetchProductDetails = async (productId) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(productId) }
        });
        return product;
    } catch (err) {
         console.error('FETCH ERROR:', err.message); // add this
        throw new Error('Error fetching product details: ' + err.message);
    }
};

const listProducts = async (productQuery) => {

    try {

        const { page = 1, limit = 10, category, minPrice, maxPrice } = productQuery;

        const filters = {};

        if (category) filters.category = category;
        if (minPrice) filters.price = { gte: parseFloat(minPrice) };
        if (maxPrice) filters.price = { lte: parseFloat(maxPrice) };
        if (Object.keys(priceFilter).length > 0) filters.price = priceFilter;

        const products = await prisma.product.findMany({
            where: filters,
            skip: (page - 1) * limit,
            take: parseInt(limit)
        });

        return products;

    } catch (err) {
        throw new Error('Error listing products: ' + err.message);
    }

};


export { createProduct, updateProduct, deleteProduct, fetchProductDetails, listProducts };