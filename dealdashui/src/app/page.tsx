"use client";

import SearchForm from "@/components/SearchForm";
import DisplayProducts from "@/components/DisplayProducts";
import { useState } from "react";

export default function Home() {
	const [products, setProducts] = useState([]);

	return (
		<main>
			<SearchForm setProducts={setProducts} />
			<DisplayProducts products={products} />
		</main>
	);
}
