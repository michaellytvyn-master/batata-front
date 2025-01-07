import { Option, Select } from "@material-tailwind/react"
import React, { useEffect, useState } from "react"

const TradingPairSelect = ({ formData, handleSelectChange }) => {
  const [tradingPairs, setTradingPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trading pairs from Bybit
  useEffect(() => {
    const fetchTradingPairs = async () => {
      try {
        const response = await fetch(
          "https://api.bybit.com/v5/market/instruments-info?category=linear"
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        const pairs = data.result.list
          .filter(
            (pair) => pair.status === "Trading" && pair.symbol.endsWith("USDT") // Include only active pairs with USDT
          )
          .map((pair) => ({
            symbol: pair.symbol,
            iconUrl: `/crypto-icons/${pair.symbol
              .replace("USDT", "")
              .toLowerCase()}.svg`, // Generate icon URL dynamically
          }));

        setTradingPairs(pairs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTradingPairs();
  }, []);

  // Handle value change
  const handleChange = (value) => {
    handleSelectChange("tradingPair", value); // Update parent state
  };

  return (
    <div className="mb-6">
      {loading ? (
        <p className="text-gray-500">Loading trading pairs...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
          <Select
            label="Trading Pair"
            value={formData.tradingPair}
            onChange={handleChange}
          >
            {tradingPairs.map((pair) => (
              <Option key={pair.symbol} value={pair.symbol}>
                <div className="flex items-center gap-2">
                  <img
                    src={pair.iconUrl}
                    className="w-5 h-5"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = "/crypto-icons/default.svg"; // Fallback to default SVG
                    }}
                  />
                  {pair.symbol}
                </div>
              </Option>
            ))}
          </Select>
        </>
      )}
    </div>
  );
};

export default TradingPairSelect;
