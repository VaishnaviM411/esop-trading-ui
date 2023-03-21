import OrderHistoryAPIService from "../src/script/orderHistoryAPIService"

describe("Order History Tests", () => {
    let orderHistoryService = new OrderHistoryAPIService()

    it("should return error if user does not exist", async () => {
        const mockUsername = "john"
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve({ "error": ["user does not exists"] })
        }))

        let response = await orderHistoryService.orderHistoryAPI(mockUsername)

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`http://localhost:8080/user/${mockUsername}/order`, { "headers": { "Content-Type": "application/json" }, "method": "GET" })
        expect(response).toEqual({ "error": ["user does not exists"] })

        global.fetch.mockRestore()
    })

    it("should return order history", async () => {
        const mockUsername = "vaishnavi"
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve([
                {
                    "orderId": "1",
                    "username": "vaishnavi",
                    "type": "BUY",
                    "quantity": 20,
                    "price": 10,
                    "esopType": "NON_PERFORMANCE",
                    "status": "PLACED",
                    "remainingQuantity": 20,
                    "createdAt": 1679399901997
                }
            ])
        }))

        let response = await orderHistoryService.orderHistoryAPI(mockUsername)

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`http://localhost:8080/user/${mockUsername}/order`, { "headers": { "Content-Type": "application/json" }, "method": "GET" })
        expect(response).toEqual([
            {
                "orderId": "1",
                "username": "vaishnavi",
                "type": "BUY",
                "quantity": 20,
                "price": 10,
                "esopType": "NON_PERFORMANCE",
                "status": "PLACED",
                "remainingQuantity": 20,
                "createdAt": 1679399901997
            }
        ])

        global.fetch.mockRestore()
    })
})