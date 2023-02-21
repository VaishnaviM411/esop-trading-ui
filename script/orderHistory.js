(async function () {

    const queryString = window.location.search;

    const username = new URLSearchParams(queryString).get('username')

    const response = await fetch(`http://localhost:8080/user/${username}/order`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    handleResponse(response)

})()

async function handleResponse(response) {
    const data = await response.json()
    if (response.status == 200) {
        displayHistory(data)
    } else {
        alert("404 not found")
    }
}

function displayHistory(response) {

}


