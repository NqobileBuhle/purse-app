import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";

interface Transaction {
	id: string;
	date: string;
	expense: string;
	description: string;
	category: string;
	categoryName: string;
	amount: number;
}

interface ReportFilteringProps {
	transactions: Transaction[];
	onFilterChange: (filtered: Transaction[]) => void;
}

const ReportFiltering: React.FC<ReportFilteringProps> = ({
	transactions,
	onFilterChange,
}) => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [category, setCategory] = useState<string>("All");
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		let filtered = transactions;

		if (category !== "All") {
			filtered = filtered.filter(
				(transaction) => transaction.category === category
			);
		}

		if (searchQuery !== "") {
			filtered = filtered.filter(
				(transaction) =>
					transaction.expense
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					transaction.description
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
			);
		}

		onFilterChange(filtered);
	}, [searchQuery, category, transactions, onFilterChange]);

	const handleSearch = (event: React.FormEvent) => {
		event.preventDefault();
		if (searchQuery.trim() === "") {
			inputRef.current?.focus();
			return;
		}
	};

	const handleCategoryChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setCategory(event.target.value);
	};

	return (
		<div className="flex flex-col md:flex-row justify-evenly mx-5 border mt-5 p-5 rounded-3xl">
			<div className="w-full md:w-1/2 mb-3 md:mb-0">
				<form className="flex w-full" onSubmit={handleSearch}>
					<div className="relative w-full">
						<input
							ref={inputRef}
							type="text"
							id="search"
							name="search"
							placeholder="Search Transaction"
							value={searchQuery}
							onChange={(event) => setSearchQuery(event.target.value)}
							className="w-full peer border border-gray-500 rounded-full focus:outline-none focus:border-orange-500 text-black h-10 p-2 pl-10 "
						/>
						<CiSearch
							size={30}
							className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500 peer-focus:text-orange-500 "
						/>
					</div>

					<button
						type="submit"
						className="border border-gray-500 px-5 ml-3 hover:bg-orange-500 hover:text-white hover:border-orange-500 rounded-full"
					>
						Search
					</button>
				</form>
			</div>

			<div className="w-full md:w-1/4">
				<label className="mr-2">Filter by Category:</label>
				<select
					value={category}
					onChange={handleCategoryChange}
					className="border rounded p-2 focus:border-orange-500 w-full"
				>
					<option value="All" className="hover:bg-orange-500">
						All
					</option>
					<option value="Housing" className="hover:bg-orange-500">
						Housing
					</option>
					<option value="Transportation" className="hover:bg-orange-500">
						Transportation
					</option>
					<option value="FoodDining" className="hover:bg-orange-500">
						Food & Dining
					</option>
					<option value="HealthWellness" className="hover:bg-orange-500">
						Health & Wellness
					</option>
					<option value="PersonalFamily" className="hover:bg-orange-500">
						Personal & Family
					</option>
					<option value="Entertainment" className="hover:bg-orange-500">
						Entertainment
					</option>
					<option value="FinancialObligations" className="hover:bg-orange-500">
						Financial Obligations
					</option>
					<option value="Miscellaneous" className="hover:bg-orange-500">
						Miscellaneous
					</option>
				</select>
			</div>
		</div>
	);
};

export default ReportFiltering;
