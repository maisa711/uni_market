import { connectToDB } from "@utils/database";
import Product from "@models/product";

export const POST = async (req: Request) => {
    // get the product data from the request body
    const { userId, title,description,price,category,timestamp} = await req.json();

    try {
        // connect to db
        await connectToDB();

        // create a new product with the data
        const newProduct = new Product({
            creator: userId,
            title,
            description,
            price,
            category,
            timestamp
        });

        // save the product
        await newProduct.save();
        
        return new Response(JSON.stringify(newProduct), {status: 201});
    }
    catch (error) {
        // return an error response
        return new Response("Failed to create new Product", {status: 500});
        
    }
}