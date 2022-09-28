export type { property };

interface property {
	_id: string;
	title: string;
	images: Array<string>;
	subtitle: string;
	category: string;
	description: {
		property_type: string;
		bedrooms: number;
		beds: number;
		bathrooms: number;
		desribe: string;
	};
	coordination: Array<number>;
	zone: string;
	price: number;
	discount: number;
	branch_id: string;
	created_by: string;
	create_at: string;
	status: number;
	like: Array<string>;
}
