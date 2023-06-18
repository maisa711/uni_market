// Get read
import { connectToDB } from "@utils/database";
import Product from "@models/product";

export const GET = async (req: Request, {params}:any) => {

    try {
        await connectToDB();

        const products = await Product.findById(params.id).populate("creator");

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
        await connectToDB();

        const productToUpdate = await Product.findById(params.id);

        if(!productToUpdate) return new Response("Product not found", {status: 404});

        productToUpdate.title = title;
        productToUpdate.description = description;
        productToUpdate.price = price;
        productToUpdate.category = category;

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
        await connectToDB();

        await Product.findByIdAndRemove(params.id);
        
        return new Response("Product deleted", {status: 200});
    }
    catch(error){
        return new Response("Failed to delete Product", {status: 500});
    }
}
