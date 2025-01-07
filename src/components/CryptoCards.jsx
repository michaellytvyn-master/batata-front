import { Button } from "@material-tailwind/react"
import React, { Suspense } from "react"
// charts import
const Chart = React.lazy(() => import("react-apexcharts"));

// @material-tailwind/react
import {
	Card,
	CardBody,
	Typography
} from "@material-tailwind/react"


// deepmerge
import merge from "deepmerge"

function AreaChart({
	height = 90,
	series,
	colors,
	options,
}) {
	const chartOptions = React.useMemo(
		() => ({
			colors,
			...merge(
				{
					chart: {
						height: height,
						type: "area",
						zoom: {
							enabled: false,
						},
						toolbar: {
							show: false,
						},
					},
					title: {
						show: "",
					},
					dataLabels: {
						enabled: false,
					},
					legend: {
						show: false,
					},
					markers: {
						size: 0,
						strokeWidth: 0,
						strokeColors: "transparent",
					},
					stroke: {
						curve: "smooth",
						width: 2,
					},
					grid: {
						show: false,
						xaxis: {
							lines: {
								show: false,
							},
						},
						padding: {
							top: 0,
							right: 0,
							left: 0,
							bottom: 0,
						},
					},
					tooltip: {
						theme: "light",
					},
					yaxis: {
						labels: {
							show: false,
						},
					},
					xaxis: {
						axisTicks: {
							show: false,
						},
						axisBorder: {
							show: false,
						},
						labels: {
							show: false,
						},
					},
					fill: {
						type: "gradient",
						gradient: {
							shadeIntensity: 1,
							opacityFrom: 0.4,
							opacityTo: 0.6,
							stops: [0, 100],
						},
					},
				},
				options ? options : {},
			),
		}),
		[height, colors, options],
	)

	return (
		<Suspense fallback={<div>Loading Chart...</div>}>
		<Chart
				type="area"
				height={height}
				series={series}
				options={chartOptions}
		/>
</Suspense>
	)
}

const TABLE_ROW = [
	{
		img: "https://www.material-tailwind.com/logos/btc.png",
		digitalAsset: "BTC",
		detail: "Bitcoin",
		price: "$46,727.30",
		change: "+2.92%",
		volume: "$45.31B",
		market: "$0.61B",
		color: "green",
		trend: 4,
	},
	{
		img: "https://www.material-tailwind.com/logos/eth.png",
		digitalAsset: "ETH",
		detail: "Ethereum",
		price: "$2,609.30",
		change: "+6.80%",
		volume: "$23.42B",
		market: "$0.58B",
		color: "green",
	},
	{
		img: "https://www.material-tailwind.com/logos/usdt.png",
		digitalAsset: "USDT",
		detail: "TetherUS",
		price: "$1.00",
		change: "-0.01%",
		volume: "$94.37B",
		market: "$1,600",
		color: "red",
	},
	{
		img: "https://www.material-tailwind.com/logos/sol.png",
		digitalAsset: "SOL",
		detail: "Solana",
		price: "$1.00",
		change: "+6.35%",
		volume: "$3.48B",
		market: "$0.26B",
		color: "green",
	},
	{
		img: "https://www.material-tailwind.com/logos/xrp.png",
		digitalAsset: "XRP",
		detail: "Ripple",
		price: "$100.19",
		change: "-0.95%",
		volume: "$1.81B",
		market: "$0.45B",
		color: "red",
	},
]

const TABLE_HEAD = [
	{
		head: "Digital Asset",
		customeStyle: "!text-left",
	},
	{
		head: "Price",
		customeStyle: "text-right",
	},
	{
		head: "Change",
		customeStyle: "text-right",
	},
	{
		head: "Volume",
		customeStyle: "text-right",
	},
	{
		head: "Market Cap",
		customeStyle: "text-right",
	},
	{
		head: "Trend",
		customeStyle: "text-right",
	},
	{
		head: "Actions",
		customeStyle: "text-right",
	},
]

export function CryptoCards() {
	return (
		<Card className="h-full w-full mb-16 pb-2">
		
			<CardBody className="overflow-scroll !px-0 py-2 pb-6">
				<div className="w-full min-w-max table-auto">
				
					<div className="flex  ">
						{TABLE_ROW.map(
							(
								{
									img,
									digitalAsset,
									detail,
									price,
									change,
									volume,
									market,
									color,
								},
								index,
							) => {
								const isLast = index === TABLE_ROW.length - 1
								const classes = isLast
									? "!p-4 border-b border-gray-300"
									: "!p-4 border-b border-gray-300"
								return (
									<div key={digitalAsset} className="w-[210px] flex flex-col mx-[10px] rounded-xl bg-white text-gray-700 shadow-md">
										<div className={classes}>
											<div className="flex items-center gap-4 text-left">
												<img
													src={img}
													alt={digitalAsset}
													className="h-10 w-10"
												/>
												<div>
													<Typography
														variant="small"
														color="blue-gray"
														className="!font-semibold"
													>
														{digitalAsset}
													</Typography>
													<Typography
														variant="small"
														className="!font-normal text-gray-600"
													>
														{detail}
													</Typography>
												</div>
											</div>
										</div>
										<div className={classes}>
											<Typography
												variant="small"
												className="text-left flex justify-between !font-normal text-gray-600"
											>
												<span>Min Deposit</span><span>{volume}</span>
											</Typography>
										</div>
										<div className={classes}>
											<Typography
												variant="small"
												className="text-left flex justify-between !font-normal text-gray-600"
											>
												<span>Risk</span><span>{market}</span>
											</Typography>
										</div>
										<div className={classes}>
											<div className="ml-auto h-12 max-w-[12rem] -translate-y-6">
												<AreaChart
													colors={["#2196F373"]}
													options={{}}
													series={[
														{
															name: "2023 Sales",
															data: [30, 40, 500, 420, 700, 350, 500, 330, 900],
														},
													]}
												/>
											</div>
											<div>
											<Typography
												variant="small"
												color={color}
												className="text-left !font-bold flex justify-between"
											>
												<span>PNL% (year)</span>
												<span>{change}</span>
											</Typography>
											</div>
										</div>
										<div className={'!p-4'}>
											<div className="flex justify-center gap-4">
													<Button>Select</Button>
											</div>
										</div>
									</div>
								)
							},
						)}
					</div>
				</div>
			</CardBody>
		</Card>
	)
}

export default CryptoCards