import { computed, onMounted, ref } from "vue";
import type {
    ProductCache,
    ProductDTO,
    ProductFetchPayload
} from "@/shared/types/product";
import useTableRef from "@/shared/composables/useTableRef";
import type {
    DataTableColumns,
    DataTableSortState,
    DataTableFilterState
} from "naive-ui";
import { getPaginatedProducts } from "@/shared/api/mock/product";
import type { SortOrder } from "@/shared/types/common";
import { useDebounceFn } from '@vueuse/core';

export default function useAsyncProductList() {
    const { tableRef } = useTableRef()

    const cacheMaxSize = 20;
    const cache = new Map<string, ProductCache>()

    const products = ref<ProductDTO[]>([]);

    const searchString = ref<string>('');
    const sorterColumnKey = ref<keyof ProductDTO>();
    const sortOrder = ref<SortOrder>();
    const filters = ref<Partial<Record<keyof ProductDTO, string | number>>>();
    const isLoading = ref<boolean>(false);

    const columns = computed<DataTableColumns<ProductDTO>>(
        () => [
            {
                key: 'id',
                title: 'ID',
                sorter: true
            },
            {
                key: 'name',
                title: 'Name',
            },
            {
                title: 'Price',
                key: 'price',
                sorter: true
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
                filter: true,
                render: (product) =>
                    product.isNew ? 'New' : 'Used'
            },
        ]
    )

    const pagination = ref({
        page: 1,
        pageSize: 10,
        pageCount: 13,
        onChange: (page: number) => {
            pagination.value.page = page

            fetchProducts();
        },
        onUpdatePageSize: (updatedPageSize: number) => {
            pagination.value.pageSize = updatedPageSize

            fetchProducts()
        }
    })

    const prepareOptions = (): ProductFetchPayload => {
        return {
            searchString: searchString.value,
            pageNumber: pagination.value.page,
            pageSize: pagination.value.pageSize,
            sortBy: sorterColumnKey.value,
            sortOrder: sortOrder.value,
            filters: filters.value
        }
    }

    const sortProducts = (sorter: DataTableSortState) => {
        sorterColumnKey.value = sorter.columnKey as keyof ProductDTO;
        if (sorter.order) {
            sortOrder.value = sorter.order;
        }

        fetchProducts();
    }

    const filterProducts = (productFilters: DataTableFilterState) => {
        filters.value = productFilters;

        fetchProducts();
    }

    const filterProductsBySearch = (search: string) => {
        searchString.value = search;

        debouncedFetchProducts()
    }

    const setCache = (
        key: string,
        items: ProductDTO[],
        totalCount: number
    ) => {
        if (cache.size >= cacheMaxSize) {
            const firstKey = cache.keys().next().value;
            cache.delete(firstKey!)
        }

        cache.set(key, {
            result: items,
            totalPages: totalCount
        });
    }

    const extractFromCache = (cachedKey: string) => {
        const {
            totalPages,
            result
        } = cache.get(cachedKey)!

        products.value = result;
        pagination.value.pageCount = totalPages
    }

    const fetchProducts = async () => {
        isLoading.value = true;

        const payload = prepareOptions();

        const cachedKey = JSON.stringify(payload);

        if (cache.has(cachedKey)) {
            extractFromCache(cachedKey)

            return;
        }

        const response = getPaginatedProducts(payload);

        products.value = response.data;
        pagination.value.pageCount = response.total

        setCache(cachedKey, response.data, response.total)

        // try {
        //     const {
        //         items,
        //         totalPages
        //     } = await ApiProducts.fetchTableList(payload)
        //
        //     products.value = items;
        //     pageCount.value = totalPages
        // } catch (e) {
        //     console.error(e)
        // } finally {
        //     isLoading.value = true
        // }
    }

    const debouncedFetchProducts = useDebounceFn(
        fetchProducts, 1000
    )

    onMounted(fetchProducts)

    return {
        products,
        isLoading,
        tableRef,
        columns,
        searchString,
        pagination,
        sortProducts,
        filterProducts,
        filterProductsBySearch,
    }
}