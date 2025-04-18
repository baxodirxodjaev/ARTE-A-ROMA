import Logo from './Logo';
import User from './User';
import searchIcon from '../../public/icons/search-8924.svg';
import { useAppContext } from '../context/AppContext';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const Header = () => {
  const { dispatch , state} = useAppContext();

  const handleSearchClick = () => {
    dispatch({ type: "TOGGLE_SEARCH" });
  };

  return (
    <header className="w-full flex flex-wrap items-center justify-between sm:justify-around px-6 py-[20px] mt-2 mb-6 z-50 rounded-md relative">
      
        {state.isSearchOpen ? (
          <>
            <div className='flex gap-4'>
                <SearchBar />
              <button 
                onClick={()=>{dispatch({ type: "CLOSE_SEARCH" });}}
                className='mx-3 cursor-pointer '>❌</button>
            </div>
            <div className='absolute top-10/12'>
              <SearchResults />
            </div>
          </>
        ) : (
          <>
          <div 
            onClick={handleSearchClick} className="cursor-pointer">
            <img className="size-[4rem]" src={searchIcon} alt="Search Icon" />
          </div>
          <Logo />
          </>     
        )
      }
      <User />
    </header>
  );
};

export default Header;
