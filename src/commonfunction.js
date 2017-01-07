function parseJSON(response) {
    if (response.status >= 200 && response.status < 400) {
        return response.json();
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}


export { parseJSON };
