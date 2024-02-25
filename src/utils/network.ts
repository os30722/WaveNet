import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const BASE_URL = 'http://192.168.0.102:3000/'

const axiosClient = axios.create({
    baseURL: BASE_URL,
});

export const useAxiosQuery = <T, >(url: string, keys: string[]) => {
    const query = useQuery({
        queryKey: [...keys],
        queryFn: () => {
            return axiosClient.get(url).then((response) => {
                return response.data
            });
        }
    });

    return query;   
}

export const useAxioMutation = <T, >(url: string) => {
    const mutation = useMutation({
        mutationFn: (formData: FormData) => {
            console.log(formData)
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

