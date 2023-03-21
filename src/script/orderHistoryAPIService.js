export default class OrderHistoryAPIService {
    orderHistoryAPI = async (username) => {
        return await fetch(`http://localhost:8080/user/${username}/order`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json().then(res => {
            return res;
        }))
    }
}
