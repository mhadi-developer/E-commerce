import { useState } from "react";

export function usePost(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const postData = async (data, options = {}) => {
    setLoading(true);
      setError(null);
      setData(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials:'include',
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();


      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setData(result);
      return result;
    }
    catch (err) {
      setError(err.message || "something went wrong ");
      throw err;
    }
    finally {
      setLoading(false);
    }
  };

  return { postData, data, loading, error };
}
