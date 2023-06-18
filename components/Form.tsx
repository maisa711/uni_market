import CustomDropdown from "./CustomDropdown";
import { categories } from '@utils/utilFuncs'

const Form = ({ type, product, setProduct, submitting, handleSubmit, handleCancel }: any) => {
  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
      <section className="w-full max-w-full flex justify-start flex-col">
        <h1 className="mb-5">
          <span className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400">
            {type} Post
          </span>
        </h1>

        <form
          className="flex flex-col w-full max-w-2xl gap-4"
          onSubmit={handleSubmit}
        >

          <label className='text-main-text' htmlFor="productTitle">Your product title</label>

          <input
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            required
            placeholder="Write your title here..."
            id="productTitle"
            className="rounded-full bg-product-card-bg backdrop-blur-md w-5/6 lg:w-3/4 h-10 px-4 text-main-text shadow-lg outline-none focus:outline-none focus:ring-2 focus:ring-primary-btn focus:ring-opacity-50"
          ></input>

          <label className='text-main-text' htmlFor="productDesc">Your Product Description</label>

          <textarea
            value={product.description}
            rows={10}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            required
            placeholder="Write your description here..."
            id="productDesc"
            className="rounded-lg py-2 bg-product-card-bg backdrop-blur-md w-5/6 lg:w-3/4 h-10 px-4 text-main-text shadow-lg outline-none focus:outline-none focus:ring-2 focus:ring-primary-btn focus:ring-opacity-50"
          ></textarea>
          <label className='text-main-text' htmlFor="productCategories">Categories</label>
          <CustomDropdown dropDownValue={product.category} onChangeDropDown={(e) => setProduct({ ...product, category: e.name })} dropDownList={categories} name={'Category'} />

          <label className='text-main-text' htmlFor="productPrice">Price</label>
          <input
            value={product.price}
            type='number'
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
            placeholder="Write your title here..."
            id="productPrice"
            className="rounded-full bg-product-card-bg backdrop-blur-md w-5/6 lg:w-3/4 h-10 px-4 text-main-text shadow-lg outline-none focus:outline-none focus:ring-2 focus:ring-primary-btn focus:ring-opacity-50"
          ></input>

          <div className="flex justify-end mx-3 mb-5 gap-4 mt-3">
            <button className='bg-red-500 hover:bg-red-400  text-black py-2 px-4 rounded-full flex-row gap-2' onClick={handleCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary-btn hover:bg-primary-btn-hover  text-black py-2 px-4 rounded-full flex-row gap-2"
              disabled={submitting}>
              {submitting ? `${type}...` : `${type}`}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Form;
