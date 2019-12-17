import request from "request-promise"
import config from '../../../../config/config'
import { Restaurent } from "../interfaces"

const baseUrl = config.RESTAURENT_SEARCH_API

export const getRestaurentById = async (restaurentId: string) => {
    const requestUrl = `${baseUrl}/restaurent/search?restaurentId=${restaurentId}`
    const response = await request(requestUrl)
    return JSON.parse(response) as Restaurent[]
}