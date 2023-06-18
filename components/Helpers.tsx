import ProductCard from "./ProductCard";

export const ProductCardList = ({data, handleDelete}:any) => {
    return (
        <div>
            <div className="grid justify-items-center grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 mt-10">
                {data.map((product: any) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        handleDelete={() => handleDelete && handleDelete(product)}
                    />
                ))}
            </div>
        </div>
    )
};