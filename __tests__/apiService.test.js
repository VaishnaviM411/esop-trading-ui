import CreateOrderAPIService from "../src/script/apiService.js"


describe("Create Order Tests", () => {
    let createOrderService = new CreateOrderAPIService()

    it("should return error given insufficient amount in wallet", async () => {
        let response = await createOrderService.placeOrderAPI(
            JSON.stringify({
                "type": "BUY",
                "quantity": 10,
                "price": 10
            })
            , "harsh")

        expect(response).toEqual({ "error": ["insufficient wallet funds"] })
    })

    it("should return error if user does not exist", async () => {
        let response = await createOrderService.placeOrderAPI(
            JSON.stringify({
                "type": "BUY",
                "quantity": 10,
                "price": 10
            })
            , "john")

        expect(response).toEqual({ "error": ["user does not exists"] })
    })

    it("should place order", async () => {
        let response = await createOrderService.placeOrderAPI(
            JSON.stringify({
                "type": "BUY",
                "quantity": 10,
                "price": 10
            })
            , "vaishnavi")

        expect(response.status).toEqual("PLACED")
    })

})