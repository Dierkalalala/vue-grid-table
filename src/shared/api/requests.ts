import api from './instance'

export default class ApiRequest {
    static async get<
        Params extends object,
        Response,
        MappedResponse = Response,
    >(
        url: string,
        params?: Params,
        mapper?: (item: Response) => MappedResponse
    ): Promise<Response | MappedResponse> {
        const { data } = await api
            .get(url, { params });

        if (mapper) {
            return {
                ...data,
                items: data.items.map(mapper)
            };
        }

        return {
            ...data
        };
    }

    static generateUrl(
        rawUrl: string,
        payload: Record<string, string | number>
    ): string {
        let formattedUrl = rawUrl;

        Object.keys(payload)
            .sort((a, b) => b.length - a.length)
            .forEach(key => {
                const regExpKey = new RegExp(`:${key}`, 'g');
                formattedUrl = formattedUrl.replace(
                    regExpKey,
                    encodeURIComponent(payload[key])
                );
            });

        return formattedUrl;
    }
}