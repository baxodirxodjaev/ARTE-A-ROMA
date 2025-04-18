import { useAppContext } from '../context/AppContext';




const SearchBar = () => {

  const { state, dispatch } = useAppContext();

  return (
    <input
      type="text"
      value={state.searchQuery}
      onChange={(e) => dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })}
      placeholder="Search..."
      className="border border-gray-300 rounded-md p-2 "
    />
  )
}

export default SearchBar