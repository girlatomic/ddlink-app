import Local from "./Local";

class Api {
  /**
   * Get data for user with ID 'userId'
   */

  static async getUser(userId) {
    // Prepare URL and options
    let url = `/users/${userId}`;
    let options = { method: "GET", headers: {} };

    // Add JWT token (if it exists)
    let token = Local.getToken();
    console.log("tok", token);
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    // Fetch!
    let response;
    try {
      response = await fetch(url, options);
      if (response.ok) {
        response.data = await response.json();
      } else {
        response.error = `Error ${response.status}: ${response.statusText}`;
      }
    } catch (err) {
      response = { ok: false, error: err.message };
    }

    return response;
  }
}

export default Api;
