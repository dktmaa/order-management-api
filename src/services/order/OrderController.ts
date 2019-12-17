 import {orderModel} from './models'
import { Order, OrderSearchQuery, orderFilterQuery, Menu} from './interfaces'
import { HTTP404Error } from '../../utils/httpErrors'
import { getRestaurentById } from './Providers/restaurentApiSearch'

// Finding list of Orders with totalAmount
 export const getOrder = async (orderSearchQuery: OrderSearchQuery) => {
  const orderFilterQuery: orderFilterQuery = {}

  if(orderSearchQuery.date){
    orderFilterQuery.orderDate =  new Date(orderSearchQuery.date)
  }

  if(orderSearchQuery.restaurentId){
    orderFilterQuery.restaurentId = orderSearchQuery.restaurentId
  }

  const result = await orderModel.find(orderFilterQuery)

  if(!result || !result.length){
    throw new HTTP404Error('No Orders found in Db')
  }
  const results = result as Order[]
  return results
 }

 // Post Order 
 export const postOrder = async (order: Order) => {
  
    let totalAmount = 0
    const orderedItems = order.items

   // Getttign the list of restaurents by the restaurent Id
   const restaurents = await getRestaurentById(order.restaurentId)
   const menues = restaurents[0].menues 
   const availableItemsIds = menues.map(meneu => meneu._id)

   // Calculating total item by finding the value for the price of the item from restautrent meneue
   for(let orderedItem of orderedItems){
    if(!(availableItemsIds.indexOf(orderedItem.itemId) === -1)){
      const menue: Menu = menues.find(menue => menue._id === orderedItem.itemId) as Menu
      totalAmount = totalAmount + Number(menue.price) * orderedItem.quantity
    }else{
      throw new Error(`There is no item with itemId ${orderedItem.itemId} at Restaurent ${restaurents[0].name}`)
    }
   }

  // Setting the totalAmount value for the order by fetching the price of each item from restaurent item
    order.totalAmount = String(totalAmount)
    const newOrder =   await new orderModel(order).save()
    if(!newOrder){
      throw new Error('Unable to create record')
    }
    return newOrder
 }

 // cancelling order
 export const cancelOrder = async (orderId: string) => {
   const order = await orderModel.findById(orderId)
   if(!order){
     throw new HTTP404Error('No  Such Order Exists')
   }
   order.orderStatus = 'cancelled'
   const updatedOrder = await  new orderModel(order).save()
   return updatedOrder
 }

 // Updating Order
 export const updateOrder = async (orderId: string, order: Order) => {
  const result = await orderModel.findByIdAndUpdate(orderId, order, {new : true})
  if(!result){
    throw new Error('Unable to update the record')
  }
  return result
 }














