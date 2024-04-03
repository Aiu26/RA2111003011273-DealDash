"use client";
import { useState, useCallback } from "react";

export default function SearchForm({
	setProducts,
}: {
	setProducts: React.Dispatch<React.SetStateAction<never[]>>;
}) {
	const [n, setN] = useState(10);
	const [minPrice, setMinPrice] = useState(10);
	const [maxPrice, setMaxPrice] = useState(10000);
	const [companyname, setCompanyname] = useState("AMZ");
	const [category, setCategory] = useState("Phone");

	const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
		async e => {
			e.preventDefault();

			const response = await fetch(
				`http://localhost:8000/categories/${category}/products?n=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}&companyname=${companyname}/`,
				{
					method: "GET",
					cache: "no-cache",
				}
			);
			const data = await response.json();

			setProducts(data);
		},
		[category, n, minPrice, maxPrice, companyname, setProducts]
	);

	return (
		<form onSubmit={onSubmit}>
			<div>
				<label htmlFor="numberOfProducts">Number of products</label>
				<input
					value={n}
					onChange={e => setN(parseInt(e.currentTarget.value))}
					id="numberOfProducts"
					type="number"
					placeholder="Enter number of products"
				/>
			</div>
			<div>
				<label htmlFor="minPrice">Minimum Price</label>
				<input
					value={minPrice}
					onChange={e => setMinPrice(parseInt(e.currentTarget.value))}
					id="minPrice"
					type="number"
					placeholder="Enter minimum price"
				/>
			</div>
			<div>
				<label htmlFor="maxPrice">Maximum Price</label>
				<input
					value={maxPrice}
					onChange={e => setMaxPrice(parseInt(e.currentTarget.value))}
					id="maxPrice"
					type="number"
					placeholder="Enter maximum price"
				/>
			</div>
			<div>
				<label htmlFor="company">Select Company</label>
				<select
					value={companyname}
					onChange={e => setCompanyname(e.currentTarget.value)}
					id="company"
				>
					<option value="AMZ">Amazon</option>
					<option value="FLP">Flipkart</option>
					<option value="SNP">Snapdeal</option>
					<option value="MYN">Myntra</option>
					<option value="AZO">AZO</option>
				</select>
			</div>
			<div>
				<label htmlFor="category">Select Category</label>
				<select
					value={category}
					onChange={e => setCategory(e.currentTarget.value)}
					id="category"
				>
					<option value="Phone">Phone</option>
					<option value="Phone">Computer</option>
					<option value="TV">TV</option>
					<option value="Charger">Charger</option>
					<option value="Mouse">Mouse</option>
					<option value="Keypad">Keypad</option>
					<option value="Bluetooth">Bluetooth</option>
					<option value="Pendrive">Pendrive</option>
					<option value="Remote">Remote</option>
					<option value="Speaker">Speaker</option>
					<option value="Headset">Headset</option>
					<option value="Laptop">Laptop</option>
					<option value="PC">PC</option>
				</select>
			</div>
			<input type="submit" value="Search" />
		</form>
	);
}
