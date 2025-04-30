import ApiRequest from "@/shared/api/requests";
import type {
    ProductDTO,
    ProductFetchPayload
} from "@/shared/types/product";
import type { ResponseData } from "@/shared/types/common";
import { ProductEndpoints } from "@/shared/api/endpoints";

export const fetchTableList = async (
    params: ProductFetchPayload
) => {
    return await ApiRequest.get<
        ProductFetchPayload,
        ResponseData<ProductDTO>
    >(
        ProductEndpoints.get,
        params
    )
}