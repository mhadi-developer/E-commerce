import { useState } from "react";

export function usePut(url) {
  const [updateData, setUpdateData] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateUserData = async (updateData, options = {}) => {
    setUpdateLoading(true);
      setUpdateError(null);
      setUpdateData(null);

    try {
      const response = await fetch(url, {
        method: "PUT",
       credentials:'include',
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(updateData),
      });

        const result = await response.json();
        console.log(result);
        

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setUpdateData(result);
      return result;
    }
    catch (err) {
      setUpdateError(err.message || "something went wrong ");
      throw err;
    }
    finally {
      setUpdateLoading(false);
    }
  };

  return { updateUserData, updateData, updateError, updateLoading };
}
