import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { fetchCountries } from "../services/api";

const BlogPage = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // search functionality add hori hai yahan
  const getSearchQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("search") || "";
  };

  const [searchQuery, setSearchQuery] = useState(getSearchQuery());

  // data idhar fetch horiya hai
  useEffect(() => {
    const getCountries = async () => {
      try {
        setLoading(true);
        const result = await fetchCountries();
        console.log("API Result:", result);

        const countriesData = result.data ? result.data : result;

        setCountries(countriesData);
        setFilteredCountries(countriesData);
      } catch (err) {
        setError("Failed to fetch countries data");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    const query = getSearchQuery();
    setSearchQuery(query);

    if (query && countries && countries.length > 0) {
      const filtered = countries.filter(
        (country) =>
          country.name?.common?.toLowerCase().includes(query.toLowerCase()) ||
          country.name?.official?.toLowerCase().includes(query.toLowerCase()) ||
          (country.capital &&
            country.capital[0] &&
            country.capital[0].toLowerCase().includes(query.toLowerCase())) ||
          country.region?.toLowerCase().includes(query.toLowerCase())
      );
      console.log("Filtered countries:", filtered);
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [location.search, countries]);

  const handleLocalSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query && countries && countries.length > 0) {
      const filtered = countries.filter(
        (country) =>
          country.name?.common?.toLowerCase().includes(query.toLowerCase()) ||
          country.name?.official?.toLowerCase().includes(query.toLowerCase()) ||
          (country.capital &&
            country.capital[0] &&
            country.capital[0].toLowerCase().includes(query.toLowerCase())) ||
          country.region?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl">Loading countries data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  console.log("Rendering with:", {
    countries: countries?.length,
    filteredCountries: filteredCountries?.length,
    searchQuery,
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Countries of the World
        </h1>

        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Filter countries..."
            value={searchQuery}
            onChange={handleLocalSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {searchQuery && (
          <p className="text-center mt-2">
            Showing {filteredCountries?.length || 0} results for "{searchQuery}"
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries && filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <BlogCard key={country.cca3 || index} country={country} />
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-xl text-gray-600">
              {searchQuery
                ? "No countries found matching your search."
                : "No countries data available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
