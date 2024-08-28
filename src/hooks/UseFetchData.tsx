"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchData = <T,>(endpoint: string, provinceId?: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!provinceId && endpoint.includes("city")) {
        setData([]);
        setLoading(false);
        return;
      }
      try {
        const url = provinceId
          ? `/api/${endpoint}?provinceId=${provinceId}`
          : `/api/${endpoint}`;
        const { data: response } = await axios.get(url);
        setData(response.rajaongkir.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [endpoint, provinceId]);

  return {
    data,
    loading,
  };
};
