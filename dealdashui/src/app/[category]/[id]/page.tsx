export default async function page({
	params: { category, id },
}: {
	params: { category: string; id: string };
}) {
	const productResponse = await fetch(
		`http://localhost:8000/categories/${category}/products/${id}/`,
		{
			method: "GET",
			cache: "no-cache",
		}
	);
	const product = await productResponse.json();

	return (
		<div>
			<h1>{product.productName}</h1>
			<p>
				Rs. {product.price} (Discount: {product.discount})
			</p>
			<p>Availability: {product.availability}</p>
			<p>
				{product.categories} | {product.company}
			</p>
		</div>
	);
}
