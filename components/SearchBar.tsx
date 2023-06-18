import React from 'react'

const SearchBar = ({searchQuery,handleSearchChange}:any) => {
  return (
    <form className="flex w-full justify-center ">
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="rounded-full bg-product-card-bg backdrop-blur-md w-5/6 lg:w-3/4 h-10 px-4 text-main-text shadow-lg outline-none focus:outline-none focus:ring-2 focus:ring-primary-btn focus:ring-opacity-50"
        />
      </form>
  )
}

export default SearchBar