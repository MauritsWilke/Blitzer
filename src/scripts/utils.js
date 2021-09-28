function storeApiKey(input) {
	console.log(input)
	localStorage.setItem("API_KEY", document.getElementById(input).value)
}