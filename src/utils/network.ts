import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Page } from '../common/types/posts';

export const BASE_URL = 'http://192.168.0.102:3000/'

export const axiosClient = axios.create({
    baseURL: BASE_URL,
});

export const useAxiosQuery = <T, >(url: string, keys: string[]) => {
    const query = useQuery({
        queryKey: [...keys],
        queryFn: async () => {
            const resp = await axiosClient.get(url);
            return resp.data;
        }
    });

    return query;   
}

export const useAxiosInfinite = <T, >(url: string, keys: string[],
    nextPageParam: (lastPage: T[], pages: T[][]) => any, query: Record<string,string> = {}, pageSize = 10) => {
    return useInfiniteQuery({
        initialPageParam: 0,
        queryKey: [...keys],
        queryFn: async ({ pageParam }) => {
            let queryStr = '?'
            for (const prop in query) {
                queryStr += `${prop}=${query[prop]}&`
            }
            queryStr += `pagesize=${pageSize}&cursor=${pageParam}`;
            const resp = await axiosClient.get<Page<T>>(url + queryStr);
            return resp.data.items;
        },
        getNextPageParam: nextPageParam,
    });

}

export const useAxiosMutation = <T, >(url: string, onSuccess?: (data: any) => void) => {
    const mutation = useMutation({
        mutationFn: (data: any = {}) => {
            return axiosClient.post(url, data)
            .then((repsponse) =>  {
                return repsponse.data;
            }).catch(err => console.log(err.request))
        },
        onSuccess: onSuccess
    });

    return mutation;
}

export const useAxiosFormMutation = <T, >(url: string) => {
    const mutation = useMutation({
        mutationFn: (formData: FormData) => {
            return axiosClient.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((repsponse) =>  {
                return repsponse.data;
            }).catch(err => console.log(err.request))
        }
    });

    return mutation;
}

