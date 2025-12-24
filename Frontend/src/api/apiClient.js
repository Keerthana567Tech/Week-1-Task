const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function sendChatQuery(query) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        status: response.status,
        message: errorData.message || "Server error"
      };
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
