import { Types } from 'mongoose'

export type orderStatus = 'In-Progress' | 'open' | 'cancelled' | 'completed'

export interface Order{
    userId: string | Types.ObjectId
    items:  Items[],
    restaurentId: string,
    orderDate: Date,
    orderStatus: orderStatus
    totalAmount?: string
}
export interface Items{
    itemId: string | Types.ObjectId
    name: string
    quantity: number, 
}


export interface OrderSearchQuery{
    restaurentId?: string | Types.ObjectId,
    date?: string,
}

export interface orderFilterQuery{
    restaurentId?: string | Types.ObjectId,
    orderDate?: Date
}


export interface Restaurent {
    _id: string | Types.ObjectId
    location: {
        type: string,
        coordinates: [number]
    },
    city: string,
    name: string,
    restaurentPhone: string,
    menues: [Menu],
    cousines: [string],

}


export interface Menu {
    _id?: string |  Types.ObjectId
    name: string,
    price: string,
    isAvailable: boolean
}