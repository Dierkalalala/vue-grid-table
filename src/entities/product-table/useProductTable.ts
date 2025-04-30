import {computed, onMounted, ref} from "vue";
import type { DataTableColumns } from 'naive-ui'
import type { MockProduct } from "@/shared/types/product";
import getProduct from "@/shared/api/mock/product";

export default function useProductTable() {
    const products = ref<MockProduct[]>([]);

    const searchString = ref<string>('');

    const filteredProducts = computed(() => {
        return products.value.filter((product) =>
            product.name.toLowerCase().includes(searchString.value.toLowerCase()));
    })
    const columns = computed<DataTableColumns<MockProduct>>(() => [
        {
            key: 'id',
            title: 'ID',
            defaultSortOrder: 'ascend',
            sorter: 'default'
        },
        {
            key: 'name',
            title: 'Name',
        },
        {
            title: 'Price',
            key: 'price',
            sorter: (row1, row2) => row1.price - row2.price
        },
        {
            title: 'New',
            key: 'isNew',
            filterOptions: [
                {
                    label: 'New',
                    value: 1
                },
                {
                    label: 'Used',
                    value: 0
                }
            ],
            filter(value, row) {
                return row.isNew === Boolean(value);
            },
            render: (product: MockProduct) =>
                product.isNew ? 'New' : 'Used'
        }
    ]);

    const fetchProducts = async () => {
        const {
            result,
            error
        } = await getProduct();

        if (error) {
            console.error('error fetching products');
            return;
        }

        products.value = result;
    }

    onMounted(fetchProducts)

    return {
        products,
        filteredProducts,
        columns,
        searchString
    }
}