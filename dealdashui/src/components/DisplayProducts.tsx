import Link from "next/link";
import Image from "next/image";

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
		<ul className="flex flex-col gap-4 my-6">
			{products.map(product => (
				<li className="flex flex-col gap-1">
					<Image
						src={`https://source.unsplash.com/random/500x250?random=${product.id}`}
						width={500}
						height={250}
						alt={product.productName}
					/>
					<h3 className="text-xl font-bold">
						<Link
							href={`${product.categories}/${product.id}`}
							className="text-blue-800 underline"
						>
							{product.productName}
						</Link>
					</h3>
					<p className="font-medium">
						Rs. {product.price} ({product.discount}% Off)
					</p>
					<p className="font-medium">Availability: {product.availability}</p>
					<p>
						{product.categories} | {product.company}
					</p>
				</li>
			))}
		</ul>
	);
}
