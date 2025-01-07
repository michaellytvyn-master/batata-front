import { TrashIcon } from "@heroicons/react/24/outline"
import {
	Button,
	Card,
	IconButton,
	Input,
	Option,
	Select,
	Switch,
	Typography,
} from "@material-tailwind/react"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import TradingPairSelect from './TradingPairSelect'

const stopLossOptions = [
	// Range 0.05% to 1.00% with step 0.05%
	...Array.from({ length: Math.ceil((1 - 0.05) / 0.05) + 1 }, (_, index) => {
			const value = ((0.05 + index * 0.05).toFixed(2));
			return { value, label: value }; // Create an object with value and label
	}),

	// Range 1% to 99% with step 1%
	...Array.from({ length: 99 - 1 + 1 }, (_, index) => {
			const value = (1 + index).toFixed(2);
			return { value, label: value }; // Create an object with value and label
	}),
];

const profitOptions = [
	// Range 0.2% to 1% with step 0.05%
	...Array.from({ length: Math.ceil((1 - 0.2) / 0.05) + 1 }, (_, index) => {
			const value = ((0.2 + index * 0.05).toFixed(2));
			return { value, label: value }; // Create an object with value and label
	}),

	// Range 1% to 2% with step 0.05%
	...Array.from({ length: Math.ceil((2 - 1) / 0.05) + 1 }, (_, index) => {
			const value = ((1 + index * 0.05).toFixed(2));
			return { value, label: value }; // Create an object with value and label
	}),

	// Larger values with custom steps
	...[2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((value) => {
			value = value.toFixed(2);
			return { value, label: value };
	}),
];


export default function BotForm({ botId, newBot }) {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		isActive: false,
		exchange: "Bybit Futures",
		apiKey: "",
		algorithm: "long",
		tradingPair: "",
		deposit: 100,
		leverage: 10, // Default value for leverage
		marginType: "Cross",
		overlap: 25, // Перекрытие
		gridOrders: 15, // Сетка ордеров
		martingale: 5, // Mартингейл
		partialGridOrders: 3, // Частичное выставление сетки ордеров
		stopLoss: '0.05',
		stopLossOn: false,
		stopAfterTrades: false,
		stopAfterStopLoss: false,
		profit: '0.60',
		profitCurrency: "USDT",
		filtersMode: "Conservative",
		filters: [
			{ id: 1, type: "RSI", interval: '1', condition: "Less", value: 50 },
		],
	});
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	useEffect(() => {
  const fetchBotDetails = async () => {
    if (!botId) return; // Exit if botId is not provided

    if (!user) {
      setError("User is not authenticated");
      return;
    }

    try {
      const token = await user.getIdToken(); // Retrieve token dynamically
      if (!token) {
        throw new Error("Failed to retrieve token");
      }

      const response = await fetch(`http://localhost:5001/api/bot/get-bot/${botId}`, {
        method: "GET", // Use GET for fetching details
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
						setFormData(data.bot)
      // setSuccess(data.message || "Bot fetched successfully");
      setError(null); // Clear any previous errors


    } catch (err) {
      console.error("Error fetching bot details:", err.message);
      setError(err.message);
    } 
  };

  fetchBotDetails();
}, [botId, user]);

	// Handle input changes
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	// Handle select changes
	const handleSelectChange = (name, value) => {
		setFormData({ ...formData, [name]: value });
	};

	// Handle filter updates
	const handleFilterChange = (index, field, value) => {
		const updatedFilters = [...formData.filters];
		updatedFilters[index][field] = value;
		setFormData({ ...formData, filters: updatedFilters });
	};

	// Add a new filter
	const addFilter = () => {
		const newFilter = {
			id: Date.now(),
			type: "RSI",
			interval: '1',
			condition: "Less",
			value: 50,
		};
		setFormData({ ...formData, filters: [...formData.filters, newFilter] });
	};

	// Remove a filter
	const removeFilter = (id) => {
		const updatedFilters = formData.filters.filter((filter) => filter.id !== id);
		setFormData({ ...formData, filters: updatedFilters });
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!user) {
			setError("User is not authenticated");
			return;
		}

		try {
			const token = await user.getIdToken();
			const response = await fetch(
				`http://localhost:5001/api/bot/${newBot ? "create-bot" : `update-bot/${botId}`}`,
				{
					method: newBot ? "POST" : "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Something went wrong");
			}

			const data = await response.json();
			setSuccess(data.message);
			setError(null);
			navigate("/bots");
		} catch (err) {
			setError(err.message);
		}
	};

	const overlapOptions = [
  // Range 0.5 to 1 with step 0.05
  ...Array.from({ length: Math.ceil((1 - 0.5) / 0.05) + 1 }, (_, index) => {
    const value = (0.5 + index * 0.05).toFixed(2);
    return { value, label: value }; // Create an object with value and label
  }),

  // Range 1 to 3 with step 0.1
  ...Array.from({ length: Math.ceil((3 - 1) / 0.1) + 1 }, (_, index) => {
    const value = (1 + index * 0.1).toFixed(1);
    return { value, label: value };
  }),

  // Range 3 to 99 with step 1
  ...Array.from({ length: 99 - 3 + 1 }, (_, index) => {
    const value = (3 + index).toString();
    return { value, label: value };
  }),
];


	return (
		<Card color="transparent" shadow={false}>
			<Typography variant="h4" color="blue-gray" className="mb-6">
				{newBot ? "Create" : "Edit"} Bot "{formData.name || ""}"
			</Typography>
			<form className="mt-8 mb-2 w-full max-w-screen-lg" onSubmit={handleSubmit}>

			<div className='mb-4'>
			<Typography variant="h5" color="blue-gray">
					General Settings
			</Typography>
			</div>

			<div className='mb-4'>
						<Typography variant="h6" color="blue-gray">
							<div className="flex">
								<div className="mr-4">Active</div> 	
								<Switch onChange={() => handleSelectChange("isActive", !formData.isActive)} checked={formData.isActive}
									/>
							</div>
						</Typography>
				</div>

				<div className="mb-6">
					<Select
						label="Exchange"
						value={formData.exchange}
						onChange={(value) => handleSelectChange("exchange", value)}
					>
						<Option value="Bybit Futures">Bybit Futures</Option>
					</Select>
				</div>
				<div className="mb-6">
					<Input
						label="API Key"
						name="apiKey"
						value={formData.apiKey}
						onChange={handleChange}
					/>
				</div>


				<div className="mb-6">
					<Input
						label="Bot Name"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>

				<div className="mb-6">
					<Input
						label="Description"
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
				</div>

							{/* Algorithm */}

				<div className="flex gap-4 mb-6">
					<Button
					color="green"
						variant={formData.algorithm === "long" ? "gradient" : "outlined"}
						onClick={() => handleSelectChange("algorithm", "long")}
					>
						Long
					</Button>
					<Button
					color="red"
						variant={formData.algorithm === "short" ? "gradient" : "outlined"}
						onClick={() => handleSelectChange("algorithm", "short")}
					>
						Short
					</Button>
				</div>

				<div className='mb-6'>
					<Typography variant="h5" color="blue-gray">
					Trading Settings
					</Typography>
			</div>


				<div className="mb-6">
					<TradingPairSelect formData={formData} handleSelectChange={handleSelectChange}/>
				</div>
				<div className="mb-6">
					<Input
						label="Deposit"
						type="number"
						name="deposit"
						value={formData.deposit}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-6">
					<Typography variant="small" color="blue-gray">
						Leverage: {formData.leverage}x
					</Typography>
 
					<input
						type="range"
						min="1"
						max="50"
						step="1"
						value={formData.leverage}
						onChange={(e) =>
							setFormData({ ...formData, leverage: Number(e.target.value) })
						}
						className="w-full"
					/>



				</div>
				<div className="mb-6">
					<Select
						label="Margin Type"
						value={formData.marginType}
						onChange={(value) => handleSelectChange("marginType", value)}
					>
						<Option value="Cross">Cross</Option>
						<Option value="Isolated">Isolated</Option>
					</Select>
				</div>


				<div className='mb-6'>
					<Typography variant="h5" color="blue-gray">
					Trading mode 
					</Typography>
			</div>

				<div className="mb-6">
					<Select
							label="Overlap (%)"
								value={`${formData.overlap}`}
								onChange={(value) => handleSelectChange("overlap", value)}
						>
							 {overlapOptions.map((pair) => (
											<Option key={pair.value} value={pair.value}>
													{pair.label}%
											</Option>
									))}
						</Select>
				</div>
				<div className="mb-6">			
					<Select
								label="Grid Orders"
								value={`${formData.gridOrders}`}
								onChange={(value) => handleSelectChange("gridOrders", value)}
						>
							 {Array.from({ length: 59 }, (_, index) => (
											<Option key={index + 2} value={`${index + 2}`}>
													{index + 2}
											</Option>
									))}

						</Select>

				</div>
				<div className="mb-6">
						<Select
								label="Martingale (%)"
								value={`${formData.martingale}`}
								onChange={(value) => handleSelectChange("martingale", value)}
						>
							 {Array.from({ length: 500 }, (_, index) => (
									<Option key={index} value={`${index + 1}`}>
		          {index + 1}%
										</Option>
      ))}
						</Select>
				</div>


				<div className="mb-6">
					<Typography variant="small" color="blue-gray">
						Partial Grid Orders: {formData.partialGridOrders}
					</Typography>
					<input
						type="range"
						min="1"
						max="10"
						step="1"
						value={formData.partialGridOrders}
						onChange={(e) =>
							setFormData({
								...formData,
								partialGridOrders: Number(e.target.value),
							})
						}
						className="w-full"
					/>
				</div>

				{/* Stop Loss and Profit */}
				<div className="mb-6">
				
						<div className='mb-4'>
						<Typography variant="h6" color="blue-gray">
							<div className="flex">
								<div className="mr-4">Stop Loss</div> 	<Switch onChange={() => handleSelectChange("stopLossOn", !formData.stopLossOn)} checked={formData.stopLossOn} />
							</div>
						</Typography>
						</div>

						<Select
								label="Stop Loss (%)"
								value={`${formData.stopLoss}`} 
								onChange={(value) => handleSelectChange("stopLoss", value)}
						>	
								{stopLossOptions.map((item, index) => (
											<Option key={index} value={item.value}>
													{item.label}%
											</Option>
									))}
						</Select>

			
			<div className='mb-4 mt-4'>
			<Typography variant="h6" color="blue-gray">
				<div className="flex">
					<div className="mr-4">Stop after Stop Loss</div> 	<Switch onChange={() => handleSelectChange("stopAfterStopLoss", !formData.stopAfterStopLoss)} 
					checked={formData.stopAfterStopLoss}
						/>
				</div>
			</Typography>
			</div>
	 
				
				</div>

				<div className="mb-6">
						<Select
								label="Profit (%)"
								value={`${formData.profit}`} // Convert to string
								onChange={(value) => handleSelectChange("profit", value)} // Convert back to number
						>
								{profitOptions.map((profit, index) => (
										<Option key={index} value={profit.value}>
												{profit.label}%
										</Option>
								))}
						</Select>
				</div>

			<div className='mb-6'>
			<Typography variant="h6" color="blue-gray">
				<div className="flex">
					<div className="mr-4">Stop after Trades</div> 	<Switch onChange={() => handleSelectChange("stopAfterTrades", !formData.stopAfterTrades)} 
					checked={formData.stopAfterTrades}
						/>
				</div>
			</Typography>
			</div>

				<div className="mb-6">
					<Select
						label="Profit Currency"
						value={formData.profitCurrency}
						onChange={(value) => handleSelectChange("profitCurrency", value)}
					>
						<Option value="USDT">USDT</Option>
					</Select>
				</div>

				<div className="mb-6">
				<Typography variant="h5" color="blue-gray">
				Filters for starting the bot
					</Typography>
				</div>

				<div className="mb-6">
					{formData.filters.map((filter, index) => (
						<div key={filter.id} className="flex items-center gap-4 mb-4">
							<Select
								label="Type"
								value={filter.type}
								onChange={(value) =>
									handleFilterChange(index, "type", value)
								}
							>
								<Option value="RSI">RSI</Option>
								<Option value="CCI">CCI</Option>
							</Select>
							<Select
								label="Interval"
								value={`${filter.interval}`}
								onChange={(value) =>
									handleFilterChange(index, "interval", value)
								}
							>
								<Option value={'1'}>1 min</Option>
								<Option value={'5'}>5 min</Option>
								<Option value={'30'}>30 min</Option>
								<Option value={'60'}>1 hour</Option>

							</Select>
							<Select
								label="Condition"
								value={filter.condition}
								onChange={(value) =>
									handleFilterChange(index, "condition", value)
								}
							>
								<Option value="Less">Less</Option>
								<Option value="More">More</Option>
							</Select>
							<Input
									label="Value"
									type="number"
									value={filter.value}
									onChange={(e) => handleFilterChange(index, "value", parseFloat(e.target.value))}
									// Ensure value is stored as a number in formData.filters
							/>
							<IconButton
								color="red"
								variant="text"
								onClick={() => removeFilter(filter.id)}
							>
								<TrashIcon className="h-5 w-5" />
							</IconButton>
						</div>
					))}
					<Button type="button" variant="outlined" onClick={addFilter}>
						Add Filter
					</Button>
				</div>

				<div className="mt-6">
				<Button type="submit" className="max-w-64" fullWidth>
					{newBot ? "Create Bot" : "Update Bot"}
				</Button>
				</div>

				{success && <Typography color="green" className="mt-4 text-center">{success}</Typography>}
				{error && <Typography color="red" className="mt-4 text-center">{error}</Typography>}
			</form>
		</Card>
	);
}
