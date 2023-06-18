
// categories for the dropdown menu
export const categories = [
  { name: 'Choose Category' },
  { name: 'Electronics' },
  { name: 'Clothing, Shoes & Accessories' },
  { name: 'Collectibles & Art' },
  { name: 'Home & Garden' },
  { name: 'Sporting Goods & Equipment' },
  { name: 'Industrial & Scientific' },
  { name: 'Beauty & Personal Care' },
  { name: 'Games' },
  { name: 'Books' },
  { name: 'Other' },
]

// sort by options for the dropdown menu
export const sortByList = [
  { name: 'Sort By' },
  { name: 'A-Z'},
  { name: 'Z-A'},
  { name: 'Price: Low to High' },
  { name: 'Price: High to Low' },
  { name: 'Newest' },
  { name: 'Oldest' },
]

// this is a function to sort the products by the option selected
export const sortProducts = (products:any, option:any) => {
  switch (option) {
    case 'A-Z':
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    case 'Z-A':
      return [...products].sort((a, b) => b.title.localeCompare(a.title));
    case 'Price: Low to High':
      return [...products].sort((a, b) => a.price - b.price);
    case 'Price: High to Low':
      return [...products].sort((a, b) => b.price - a.price);
    case 'Newest':
      return [...products].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    case 'Oldest':
      return [...products].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    default:
      return products;
  }
}


// this is for Feed page to pass onto Profile
// delete product
export const handleDelete = async (product: any, products: any, setProducts: any) => {
  const hasConfirmed = confirm("Are you sure you want to delete this product?");

  if (hasConfirmed) {
    try {
      // delete product from database based on product id
      await fetch(`/api/product/${product._id.toString()}`, {
        method: "DELETE",
      });

      // filter out the deleted product from the products array
      const filteredPosts = products.filter((p: any) => p._id !== product._id);
      setProducts(filteredPosts);
    } catch (error) {
      console.error(error);
    }
  }

};

// this is for Product Modal Component
export const createProduct = async (e: any, product:any, setSubmitting:any, session:any,closeModal:any) => {
  e.preventDefault();
  // check if the user has selected a category
  if(product.category === categories[0].name) {
      alert('Please choose a category')
      return;
  }
  else {
      setSubmitting(true);
      try {
        // create a new product in the database based on the user input
          const response = await fetch("/api/product/new", {
              method: "POST",
              body: JSON.stringify({
                  title: product.title,
                  userId: session?.user?.id,
                  description: product.description,
                  price: product.price,
                  category: product.category,
                  timestamp: Date.now(),
              }),
          });

          if (response.ok) {
              closeModal();

          }
      } catch (error) {
          console.error(error);
      } finally {
          setSubmitting(false);
          window.location.reload()
      }
  }
};

export const updateProduct = async (e: any, product:any, setSubmitting:any,closeModal:any) => {
  e.preventDefault();
  setSubmitting(true);
  // check if the product exists
  if(!product._id) return alert("Product ID not found");

  // update the product in the database based on the user input
  try {
      const response = await fetch(`/api/product/${product._id}`, {
          method: "PATCH",
          body: JSON.stringify({
              title: product.title,
              description: product.description,
              price: product.price,
              category: product.category,
          }),
      });

      if (response.ok) {
          closeModal()
      }
  }catch (error) {
      console.error(error);
  }finally {
      setSubmitting(false);
      window.location.reload()
  }
};