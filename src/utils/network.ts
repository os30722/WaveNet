import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://192.168.106:3000/'

const axiosClient = axios.create({
    baseURL: BASE_URL,
});

export const useAxiosQuery = <T, >(url: string, keys: string[]) => {
    const query = useQuery({
        queryKey: [...keys],
        queryFn: () => {
            return axiosClient.get(url).then((response) => {
                console.log('dde' ,response.data)
                return response.data
            })
            .catch(err => console.log('frfr' ,err))
        }
    });

    return query;   
}

