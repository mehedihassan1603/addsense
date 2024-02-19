import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://manage.freesmsapps.com/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;