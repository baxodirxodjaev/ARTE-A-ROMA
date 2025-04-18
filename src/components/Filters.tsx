import { useAppContext } from "../context/AppContext";

const Filter = () => {
  const { dispatch } = useAppContext();

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_FILTER", payload: e.target.value });
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_AVAILABILITY", payload: e.target.value });
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_SORT_ORDER", payload: e.target.value });
  };

  return (
    <div className="flex  gap-3 w-full max-w-md  my-4">
      {/* filter by type */}
      <select onChange={handleTypeChange} className="border p-2 rounded-md">
        <option value="">All</option>
        <option value="tariff">Tariffs</option>
        <option value="event">Events</option>
      </select>

      {/* Фильтр по доступности */}
      <select onChange={handleAvailabilityChange} className="border p-2 rounded-md">
        <option value="all">Availability </option>
        <option value="active">Available now</option>
        <option value="inactive"> Not Active</option>
      </select>

      {/* Сортировка по цене */}
      <select onChange={handleSortOrderChange} className="border p-2 rounded-md">
        <option value="">Price</option>
        <option value="asc"> By ascending price</option>
        <option value="desc">  By descending price</option>
      </select>
    </div>
  );
};

export default Filter;
