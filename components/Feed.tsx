'use client'

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { ProductCardList } from "./Helpers";
import { categories, handleDelete, sortByList, sortProducts } from '@utils/utilFuncs'
import Profile from "@components/Profile";
import CustomDropdown from "./CustomDropdown";

const Feed = ({ userid }: any) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState(categories[0].name);

  const [sortBy, setSortBy] = useState(sortByList[0].name);
  
  const userRes = userid ? `/api/users/${userid}/products` : "/api/product"

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(userRes);
      const data = await res.json();
      setProducts(data);
    };
    getProducts();
  }, [userid]);

  // Filter the products based on the search query
  let filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter the products based on the category
  if (category !== 'Choose Category') {
    filteredProducts = filteredProducts.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Sort the products based on the sort by 
  if (sortBy !== 'Sort By') {
    filteredProducts = sortProducts(filteredProducts, sortBy)
  }

  return (
    <>
      {userid ? (
        <>
        <Profile
            name=""
            desc="welcome to a profile page"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            data={filteredProducts}
            handleDelete={(product:any) => handleDelete(product, products, setProducts)}
            category={category}
            setCategory={setCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
        />
        </>
      ) : (
        <>
          <div className="">
            <div className="flex flex-col gap-5 md:gap-0 md:flex-row place-items-center p-5">
              <SearchBar searchQuery={searchQuery} handleSearchChange={(e: any) => { setSearchQuery(e.target.value) }} />
              <CustomDropdown dropDownValue={category} onChangeDropDown={(e) => setCategory( e.name )} dropDownList={categories} name={'Category'} />
              <CustomDropdown dropDownValue={sortBy} onChangeDropDown={(e) => setSortBy( e.name )} dropDownList={sortByList} name={'SortBy'} />
            </div>
            <ProductCardList
              data={filteredProducts}
            />
          </div>
        </>
      )}

    </>

  )
}

export default Feed