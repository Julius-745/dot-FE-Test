import { useState } from "react";
import axios from "axios";
import { ICosts, IShowCost } from "@/type";
import { useToast } from "@chakra-ui/react";

export const UseShowCost = () => {
  const toast = useToast();
  const [primaryCost, setPrimaryCost] = useState<ICosts[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCost = async ({
    origin,
    destination,
    weight,
    courier,
  }: IShowCost) => {
    setLoading(true);

    if (!origin || !destination || !weight || !courier)
      return (
        toast({
          title: `Error`,
          status: "error",
          description: "Please Fill Data Correctly",
          isClosable: true,
        }),
        setLoading(false)
      );

    try {
      const { data: response } = await axios.post("/api/cost", {
        origin,
        destination,
        weight,
        courier,
      });
      if (response.rajaongkir.results[0].costs.length === 0) {
        toast({
          title: `Warning`,
          status: "warning",
          description: `${courier} not have this route`,
          isClosable: true,
        });
      } else {
        setPrimaryCost(response.rajaongkir.results[0].costs);
      }
    } catch (error) {
      console.error("Error fetching cost data:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    primaryCost,
    loading,
    fetchCost,
  };
};
