import express, { Router } from "express"
import request from "supertest"
import { applyMiddleware, applyRoutes } from "../../utils"
import middleware from "../../middleware"
import errorHandlers from "../../middleware/errorHandlers"
import routes from "../../services/order/routes"
import database from '../../utils/database'
import {orderModel} from '../../services/order/models'
import { Order, Items } from "./interfaces"
import { updateOrder } from "./OrderController"

describe("routes", () => {
  let testOrder = <Order>{
    restaurentId: '5df6923c69b82d1e3ce06bb4',
    userId: '5df6923c69b82d1e3ce06bb4',
    items: [{
      name: 'fake-item',
      quantity: 6
    }],
    totalAmount: '2500',
    orderDate: new Date('2019-12-15'),
    orderStatus: 'In-Progress'
  }
  let fakeOrder = < Order & Document>{}
  let router: Router
  database.connect()

  beforeEach( async () => {
    process.env.MONGODB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/test-db'
    router = express()
    applyMiddleware(middleware, router)
    applyRoutes(routes, router)
    applyMiddleware(errorHandlers, router)
    await orderModel.deleteMany({})
  })

  test("expect response status code to be 200", async () => {
    new orderModel(testOrder).save()
    const response = await request(router).get("/api/v1/order?date=2019-12-15&restaurentId=5df6923c69b82d1e3ce06bb4")
    expect(response.status).toEqual(200)
  })



  test("a non-existing api method", async () => {
    const response = await request(router).get("/api/v11/search")
    expect(response.status).toEqual(404)
  })

  test("expect to return 404 when no orders found", async () => {
    const response = await request(router).get("/api/v1/order?userId=fakeid")
    expect(response.status).toEqual(404)
  })

  test('expect to cancell the order', async()=>{
    const order = await new orderModel(testOrder).save()
    const response = await request(router).patch(`/api/v1/order/${order._id}`)
    const updatedOrder = response.body as Order
    expect(updatedOrder.orderStatus).toEqual('cancelled')
    expect(response.status).toEqual(200)
  })

  test('expect to update order', async () => {
    const order = await new orderModel(testOrder).save()
    order.totalAmount = '3000'
    const  response = await request(router).put(`/api/v1/order/${order._id}`).send(order)
    const updatedOrder = response.body as Order
    expect(updatedOrder.totalAmount).toEqual('3000')
  })

  test('expect to throw error when cancelling order which does not exist', async ()=>{
    const response = await request(router).patch(`/api/v1/order/5df6923c69b82d1e3ce06bb4`)
    expect(response.status).toEqual(404)
  })

  test('expect to thow error when trying to update order which does not exist',async ()=>{
    const  response = await request(router).put(`/api/v1/order/5df6923c69b82d1e3ce06bb4`).send(testOrder)
    expect(response.status).toEqual(500)
  })

  test('expect to insert record', async ()=>{
    const response = await request(router).post(`/api/v1/order`).send(testOrder)
    expect(response.status).toEqual(200)
  })

  test('expect to throw error while inserting incorrect data', async ()=>{
    testOrder.restaurentId = '48324727'
    const response = await request(router).post(`/api/v1/order`).send(testOrder)
    expect(response.status).toEqual(500)
  })

})
