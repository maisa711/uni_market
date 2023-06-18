
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

export const sortByList = [
  { name: 'Sort By' },
  { name: 'A-Z'},
  { name: 'Z-A'},
  { name: 'Price: Low to High' },
  { name: 'Price: High to Low' },
  { name: 'Newest' },
  { name: 'Oldest' },
]

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
export const handleDelete = async (product: any, products: any, setProducts: any) => {
  const hasConfirmed = confirm("Are you sure you want to delete this product?");

  if (hasConfirmed) {
    try {
      await fetch(`/api/product/${product._id.toString()}`, {
        method: "DELETE",
      });

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
  if(product.category === categories[0].name) {
      alert('Please choose a category')
      return;
  }
  else {
      setSubmitting(true);
      try {
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
  if(!product._id) return alert("Product ID not found");

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