import Link from "next/link";

interface Product {
	id: string;
	productName: string;
	price: number;
	discount: number;
	availability: string;
	categories: string;
	company: string;
}

export default function DisplayProducts({ products }: { products: Array<Product> }) {
	if (products.length === 0) return <></>;

	return (
		<ul>
			{products.map(product => (
				<li>
					<h3>
						<Link href={`${product.categories}/${product.id}`}>
							{product.productName}
						</Link>
					</h3>
					<p>
						Rs. {product.price} (Discount: {product.discount})
					</p>
					<p>Availability: {product.availability}</p>
					<p>
						{product.categories} | {product.company}
					</p>
				</li>
			))}
		</ul>
	);
}
