import SearchBar from "./SearchBar";
import { ProductCardList } from "./Helpers";
import { categories, sortByList} from '@utils/utilFuncs'
import CustomDropdown from "./CustomDropdown";

const Profile = ({ name, desc, data, handleDelete, searchQuery, setSearchQuery, category, setCategory, sortBy, setSortBy}: any) => {
    return (
        <section className="w-full max-w-full flex justify-start flex-col">
            <div className="p-5">
                <h1 className='text-3xl font-bold text-main-text mb-2'>{name} profile</h1>
                <p className='text-lg text-main-text'>{desc}</p>
            </div>

            <div className="flex flex-col gap-5 md:gap-0 md:flex-row place-items-center p-5">
                <SearchBar searchQuery={searchQuery} handleSearchChange={(e:any)=>{setSearchQuery(e.target.value)}} />
                <CustomDropdown dropDownValue={category} onChangeDropDown={(e) => setCategory( e.name )} dropDownList={categories} name={'Category'} />
                <CustomDropdown dropDownValue={sortBy} onChangeDropDown={(e) => setSortBy( e.name )} dropDownList={sortByList} name={'SortBy'} />
            </div>
           
            <ProductCardList
                data={data}
                handleDelete={handleDelete}
            />
        </section>
    )
}

export default Profile