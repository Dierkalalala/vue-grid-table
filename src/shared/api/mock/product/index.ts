import type {
    MockProduct,
    ProductDTO,
    ProductFetchPayload
} from "@/shared/types/product";

function randomize(): boolean {
    return Boolean(Math.random() < 0.5 ? 0 : 1);
}

function getRandomize() {
    return Math.random() < 0.5 ? 0 : 1;
}

function getRandomPrice() {
    return +(Math.random() * 15).toFixed(2);
}

export default function getProduct(){
    const products: MockProduct[] = [];

    for (let i = 0; i < 10000; i++) {
        products.push({
            id: i + 1,
            name: `product ${i}`,
            isNew: randomize(),
            price: getRandomPrice()
        })
    }

    return {
        result: products,
        error: false
    };
}

const asyncData: ProductDTO[] = Array.from({ length: 10000 })
    .fill(null)
    .map((_, index) => {
        return {
            id: index + 1,
            name: `product ${index}`,
            isNew: getRandomize(),
            price: getRandomPrice(),
            randomField: 'string'
        }
    })

export function getPaginatedProducts(
    {
        pageNumber = 1,
        pageSize = 50,
        sortBy,
        sortOrder = 'ascend',
        filters = {},
        searchString
    }: ProductFetchPayload = {}
): { data: ProductDTO[]; total: number; pageNumber: number; pageSize: number } {
    let result = [...asyncData]

    for (const [key, value] of Object.entries(filters)) {
        result = result.filter((item) => {
            const itemValue = item[key as keyof ProductDTO]

            if (Array.isArray(value)) {
                return value.includes(itemValue as string | number)
            }

            if (typeof itemValue === 'string') {
                return itemValue.toUpperCase().includes(String(value).toUpperCase())
            }

            return itemValue === value
        })
    }

    if (searchString) {
        const lowerSearch = searchString.toUpperCase()
        result = result.filter((item) =>
            Object.entries(item).some(([_key, val]) => {
                return (
                    typeof val === 'string' &&
                    val.toUpperCase().includes(lowerSearch)
                )
            })
        )
    }

    if (sortBy) {
        result.sort((a, b) => {
            const aVal = a[sortBy]
            const bVal = b[sortBy]

            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return sortOrder === 'ascend'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal)
            }

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortOrder === 'ascend' ? aVal - bVal : bVal - aVal
            }

            return 0
        })
    }

    const total = Math.ceil(result.length / pageSize)
    const start = (pageNumber - 1) * pageSize
    const end = start + pageSize
    const paginated = result.slice(start, end)
    return {
        data: paginated,
        total,
        pageNumber,
        pageSize
    }
}