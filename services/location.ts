import axiosInstance from './instance'

const getStates = async (url:string) => {
    const response = await axiosInstance.get(`/states?${url}`)
    return response.data
}

const getCountries = async () => {
    const response = await axiosInstance.get('/countries')
    return response.data
}

const statesFetcher = (url:string) => getStates(url).then(res => res.result.states)
const countriesFetcher = () => getCountries().then(res => res.result.countries)

const locationService = {
    statesFetcher,
    countriesFetcher
}

export default locationService