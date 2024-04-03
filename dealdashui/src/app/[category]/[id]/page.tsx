import Image from "next/image";

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
		<main className="p-4 flex flex-col gap-1">
			<Image
				src={`https://source.unsplash.com/random/500x250?random=${product.id}`}
				width={500}
				height={250}
				alt={product.productName}
			/>
			<h1 className="text-xl font-bold">{product.productName}</h1>
			<p className="font-medium">
				Rs. {product.price} ({product.discount}% Off)
			</p>
			<p className="font-medium">Availability: {product.availability}</p>
			<p>
				{product.categories} | {product.company}
			</p>
		</main>
	);
}
