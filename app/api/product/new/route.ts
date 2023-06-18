import { connectToDB } from "@utils/database";
import Product from "@models/product";

export const POST = async (req: Request) => {
    const { userId, title,description,price,category,timestamp} = await req.json();

    try {
        await connectToDB();
        const newProduct = new Product({
            creator: userId,
            title,
            description,
            price,
            category,
            timestamp
        });

        await newProduct.save();
        
        return new Response(JSON.stringify(newProduct), {status: 201});
    }
    catch (error) {
        // return an error response
        return new Response("Failed to create new Product", {status: 500});
        
    }
}