import mongoose  from 'mongoose'
import { Order, Items } from './interfaces'
const { Schema, model } = mongoose


const itemsSchema = new Schema<Items>({
    itemId: {
        type: Schema.Types.String,
        required: true
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    quantity: {
        type: Schema.Types.Number,
        required: true
    },

},{_id: false})

const orderSchema = new Schema<Order>({
    items: [itemsSchema],
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    restaurentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    totalAmount: {
        type: Schema.Types.String,
    },
    orderDate: {
        type: Schema.Types.Date,
        required: true
    },
    orderStatus: {
        type: Schema.Types.String,
        enum: ['open', 'In-Progress', 'Completed', 'cancelled'],
        default: 'open'
    },
},  {
    timestamps : true
})


export const orderModel = model<Order & mongoose.Document>('orders', orderSchema)




