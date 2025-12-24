export function handleApiError(error) {
  if (!error) return "Unknown error occurred";

  if (error.response) {
    if (error.response.status === 404) {
      return "Service not found. Please try again later.";
    }

    if (error.response.status === 500) {
      return "Server error. Please contact support.";
    }

    if (error.response.data?.status === "NO_CONTEXT") {
      return "I don’t know. The answer is not present in the SOP knowledge base.";
    }

    return error.response.data?.message || "Unexpected server error";
  }

  if (error.message?.includes("Network Error")) {
    return "Network error. Please check your internet connection.";
  }

  return error.message || "Something went wrong.";
}
