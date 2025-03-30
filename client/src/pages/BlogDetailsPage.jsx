import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetailsPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${code}`
        );
        setCountry(response.data[0]);
      } catch (err) {
        setError("Failed to fetch country details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchCountryDetails();
    }
  }, [code]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl">Loading country details...</p>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl text-red-600">{error || "Country not found"}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    name,
    flags,
    capital,
    population,
    area,
    region,
    subregion,
    languages,
    currencies,
    borders,
    timezones,
    continents,
    independent,
    unMember,
    startOfWeek,
    car,
    maps,
    flag,
  } = country;

  const languageList = languages ? Object.values(languages).join(", ") : "N/A";
  const currencyList = currencies
    ? Object.entries(currencies)
        .map(([code, curr]) => `${curr.name} (${curr.symbol || code})`)
        .join(", ")
    : "N/A";

  return (
    <div className="container mx-auto p-4">
      <button
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => navigate(-1)}
      >
        ← Back to Countries
      </button>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-4">
            <img
              src={flags.svg || flags.png}
              alt={`Flag of ${name.common}`}
              className="w-full h-auto object-cover rounded"
            />
            <div className="mt-4 text-center">
              <span className="text-6xl" title={name.common}>
                {flag}
              </span>
            </div>
          </div>

          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-2">{name.common}</h1>
            <h2 className="text-xl text-gray-700 mb-6">{name.official}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Basic Information
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Capital:</span>{" "}
                    {capital ? capital.join(", ") : "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Region:</span> {region}
                  </p>
                  <p>
                    <span className="font-semibold">Subregion:</span>{" "}
                    {subregion || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Population:</span>{" "}
                    {population.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Area:</span>{" "}
                    {area.toLocaleString()} km²
                  </p>
                  <p>
                    <span className="font-semibold">Continents:</span>{" "}
                    {continents.join(", ")}
                  </p>
                  <p>
                    <span className="font-semibold">Independent:</span>{" "}
                    {independent ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="font-semibold">UN Member:</span>{" "}
                    {unMember ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Additional Details
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Languages:</span>{" "}
                    {languageList}
                  </p>
                  <p>
                    <span className="font-semibold">Currencies:</span>{" "}
                    {currencyList}
                  </p>
                  <p>
                    <span className="font-semibold">Start of Week:</span>{" "}
                    {startOfWeek}
                  </p>
                  <p>
                    <span className="font-semibold">Timezones:</span>{" "}
                    {timezones.join(", ")}
                  </p>
                  <p>
                    <span className="font-semibold">Driving Side:</span>{" "}
                    {car?.side || "N/A"}
                  </p>
                  {borders && borders.length > 0 && (
                    <p>
                      <span className="font-semibold">Borders:</span>{" "}
                      {borders.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Maps</h3>
              <div className="space-y-2">
                <p>
                  <a
                    href={maps.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View on Google Maps
                  </a>
                </p>
                <p>
                  <a
                    href={maps.openStreetMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View on OpenStreetMap
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
