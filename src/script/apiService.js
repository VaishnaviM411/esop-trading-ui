export default class CreateOrderAPIService {
    placeOrderAPI = async (body, username) => {
        return await fetch(`http://localhost:8080/user/${username}/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then(response => response.json().then(res => {
            return res;
        }))
    }
}