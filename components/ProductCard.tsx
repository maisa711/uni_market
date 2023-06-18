"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import ProfileInfo from "./ProfileInfo";
import ProductModal from "./ProductModal";


const shortenString = (str: string, maxLen = 50) => {
  if (str.length > maxLen) {
    return str.substring(0, maxLen) + "...";
  } else {
    return str;
  }
};

const ProductCard = ({ product, handleDelete }: any) => {
  const { data: session } = useSession();
  const pathN = usePathname();

  return (

    <div className=" sm:w-[350px] lg:w-[330px] xl:w-[400px] cardContainer text-main-text">
      <div className="card">
        <div className="side front bg-product-card-bg">
          <div className=" p-6 h-full w-auto flex flex-col gap-4">
            <Link
              href={`/product/${`${product._id}`}`}
              className="h-full w-auto flex flex-col gap-4"
            >
              <h2 className=" shrink font-bold text-lg xl:text-2xl mb-233">
                {product.title.length > 50
                  ? shortenString(product.title, 50)
                  : product.title}
              </h2>
              <span className="flex grow text-lg">
                <p>
                  {product.description.length > 240
                    ? shortenString(product.description, 240)
                    : product.description}
                </p>
              </span>

              <div className="grow-0 flex flex-col">
                <p className=" text-lg">Price: {product.price}</p>
                <p className=" text-lg">Category: {product.category}</p>
                <p className=" text-lg">
                  Timestamp: {new Date(product.timestamp).toLocaleDateString("en-US", {
                    hour: "numeric",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}

                </p>
              </div>
              </Link>
              <div className="flex flex-row items-center">
                <div className="grow flex flex-row items-center h-full">
                  {session?.user?.id === product.creator._id &&
                    pathN === `/profile/${session?.user?.id}` ? (
                    <div className="flex flex-row gap-4 flex-grow">
                        <ProductModal ExistingProduct={product} />
                        <p
                          onClick={handleDelete}
                          className="hover:underline text-red-400 cursor-pointer"
                        >
                          Delete
                        </p>

                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex flex-row items-center gap-4">

                  <ProfileInfo
                    profileId={product.creator._id}
                    image={product.creator.image}
                    user={product.creator.username}
                    classNameImage="h-10 w-10 rounded-full cursor-pointer"
                    classNameText="font-bold"
                    isImageFirst={false}
                  />

                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
