import type {MockProduct} from "@/shared/types/product.ts";

function randomize(): boolean {
    return Boolean(Math.random() < 0.5 ? 0 : 1);
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