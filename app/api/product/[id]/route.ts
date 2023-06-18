// Get read
import { connectToDB } from "@utils/database";
import Product from "@models/product";

export const GET = async (req: Request, {params}:any) => {

    try {
        // connect to db
        await connectToDB();

        // fetch the product based on id
        const products = await Product.findById(params.id).populate("creator");

        // if the product is not found return an error response
        if(!products) return new Response("Product not found", {status: 404});


        return new Response(JSON.stringify(products), {status: 200});
    }
    catch (error) {
        // return an error response
        return new Response("Failed to fetch product", {status: 500});
        
    }
}
// PATCH update
export const PATCH = async (req: Request, {params}:any) => {
    const { title,description,price,category } = await req.json();
    try{
        // connect to db
        await connectToDB();

        // fetch the product based on id
        const productToUpdate = await Product.findById(params.id);

        // if the product is not found return an error response
        if(!productToUpdate) return new Response("Product not found", {status: 404});

        // update the product with the new data
        productToUpdate.title = title;
        productToUpdate.description = description;
        productToUpdate.price = price;
        productToUpdate.category = category;

        // save the updated product
        await productToUpdate.save();

        return new Response(JSON.stringify(productToUpdate), {status: 200});
    
    }
    catch(error){
        return new Response("Failed to update Product", {status: 500});
    }
}

// DELETE delete
export const DELETE = async (req: Request, {params}:any) => {
    try{
        // connect to db
        await connectToDB();

        // fetch the product based on id
        await Product.findByIdAndRemove(params.id);
        
        return new Response("Product deleted", {status: 200});
    }
    catch(error){
        return new Response("Failed to delete Product", {status: 500});
    }
}
