'use client'

import { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";

const ShowProduct = ({ id }: any) => {

    // empty product
    const prod = {
        creator: '',
        title: "",
        description: "",
        price: 0,
        category: '',
        timestamp: '',
    }

    const [product, setProduct] = useState(prod);

    // get the product details from the api and set the product to that
    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/product/${id}`);
            const data = await response.json();
            setProduct({
                creator: data.creator,
                title: data.title,
                description: data.description,
                price: data.price,
                category: data.category,
                timestamp: data.timestamp,
            });
        };

        if (id) getPromptDetails()
    }, [id]);



    return (
        <>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="flex flex-row items-center gap-4 mb-5">
                <ProfileInfo
                    profileId={product.creator._id} 
                    image={product.creator.image}
                    user={product.creator.username}
                    classNameImage="h-20 w-20 rounded-full cursor-pointer"
                    classNameText="text-main-text text-2xl font-bold mb-3"
                    isImageFirst={true}
                />

                </div>
                <div className="flex flex-col text-start h-full w-full gap-6">
                    <div>
                        <h1 className=" text-main-text text-3xl font-bold mb-3">Title</h1>
                        <p className="text-main-text text-xl">{product.title}</p>
                    </div>

                    <div>
                        <h1 className=" text-main-text text-3xl font-bold mb-2">Description</h1>
                        <p className="text-main-text text-xl">{product.description}</p>
                    </div>

                    <div>
                        <h1 className=" text-main-text text-3xl font-bold mb-2">Price</h1>
                        <p className="text-main-text text-xl">{product.price}</p>
                    </div>

                    <div>
                        <h1 className=" text-main-text text-3xl font-bold mb-2">Category</h1>
                        <p className="text-main-text text-xl">{product.category}</p>
                    </div>

                    <div>
                        <h1 className=" text-main-text text-3xl font-bold mb-2">Timestamp</h1>
                        <p className="text-main-text text-xl">{new Date(product.timestamp).toLocaleDateString("en-US", {
                            hour: "numeric",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}</p>
                    </div>






                </div>
            </div>
        </>
    )
}

export default ShowProduct