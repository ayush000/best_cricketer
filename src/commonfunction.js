/**
 * Parse json from Response object (returned by fetch call)
 * @param {object} response Response object
 * @returns {object} Returns promise of the response text parsed as JSON
 */
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
