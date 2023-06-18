import { connectToDB } from "@utils/database";
import Product from "@models/product";

export const GET = async (req: Request, {params}:any) => {

    try {
        await connectToDB();

        const products = await Product.find({
            creator: params.id
        }).populate("creator");
       
        
        return new Response(JSON.stringify(products), {status: 200});
    }
    catch (error) {
        // return an error response
        return new Response("Failed to fetch all products", {status: 500});
        
    }
}