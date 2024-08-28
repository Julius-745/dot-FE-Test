"use client";
import {
  Text,
  HStack,
  Stack,
  Select,
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  Center,
  Divider,
} from "@chakra-ui/react";
import { CardWrapper } from "@/_component";
import { useTranslations } from "next-intl";
import { useFetchData, UseShowCost } from "@/hooks";
import { ICity, IProvince, IShowCost } from "@/type";
import { useRef, useState, useEffect } from "react";
import { Courier } from "@/constant";

export default function Home() {
  const t = useTranslations("priceCalculator");
  const [selectedOrgProvince, setSelectedOrgProvince] = useState<string>("");
  const [selectedDestProvince, setSelectedDestProvince] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [selectedCourier, setSelectedCourier] = useState<string>("");
  const [selectedOrgCity, setSelectedOrgCity] = useState<string>("");
  const [selectedDestCity, setSelectedDestCity] = useState<string>("");

  const { data: provinceData, loading: provinceLoading } =
    useFetchData<IProvince>("province");

  const { primaryCost, loading, fetchCost } = UseShowCost();

  const resultsRef = useRef<HTMLDivElement>(null);

  const { data: orgCity, loading: orgLoading } = useFetchData<ICity>(
    "city",
    selectedOrgProvince
  );
  const { data: destCity, loading: destLoading } = useFetchData<ICity>(
    "city",
    selectedDestProvince
  );

  const handleProvinceChange = (id: string, type: "org" | "dest") => {
    if (type === "org") {
      setSelectedOrgProvince(id);
      setSelectedOrgCity("");
    } else {
      setSelectedDestProvince(id);
      setSelectedDestCity("");
    }
  };

  const handleCalculateCost = () => {
    const costData: IShowCost = {
      origin: selectedOrgCity,
      destination: selectedDestCity,
      weight: weight,
      courier: selectedCourier,
    };

    fetchCost(costData);
  };

  useEffect(() => {
    if (primaryCost.length > 0 && resultsRef.current) {
      // Scroll to the results section when primaryCost is not empty
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [primaryCost]);

  return (
    <Center w="100%" p={10}>
      <Stack>
        <Stack>
          <CardWrapper
            heading={t("title")}
            body={
              <Stack gap={10}>
                <Stack gap={5}>
                  <Text fontSize={"md"} fontWeight={"bold"} color={"black"}>
                    {t("originTitle")}
                  </Text>
                  <Select
                    borderColor={"black"}
                    color={"black"}
                    placeholder={t("orgProvPlaceholder")}
                    onChange={e => handleProvinceChange(e.target.value, "org")}
                  >
                    {!provinceLoading &&
                      provinceData.map((item, idx) => (
                        <option key={idx} value={item.province_id}>
                          {item.province}
                        </option>
                      ))}
                  </Select>
                  <Select
                    borderColor={"black"}
                    color={"black"}
                    placeholder={t("originPlaceholder")}
                    onChange={e => setSelectedOrgCity(e.target.value)}
                    isDisabled={!selectedOrgProvince || orgLoading}
                  >
                    {!orgLoading &&
                      orgCity.map((item, idx) => (
                        <option key={idx} value={item.city_id}>
                          {item.city_name}
                        </option>
                      ))}
                  </Select>
                </Stack>
                <Stack gap={5}>
                  <Text fontSize={"md"} fontWeight={"bold"} color={"black"}>
                    {t("destinationTitle")}
                  </Text>
                  <Select
                    borderColor={"black"}
                    color={"black"}
                    placeholder={t("destProvPlaceholder")}
                    onChange={e => handleProvinceChange(e.target.value, "dest")}
                  >
                    {!provinceLoading &&
                      provinceData.map((item, idx) => (
                        <option key={idx} value={item.province_id}>
                          {item.province}
                        </option>
                      ))}
                  </Select>
                  <Select
                    borderColor={"black"}
                    color={"black"}
                    placeholder={t("destinationPlaceholder")}
                    onChange={e => setSelectedDestCity(e.target.value)}
                    isDisabled={!selectedDestProvince || destLoading}
                  >
                    {!destLoading &&
                      destCity.map((item, idx) => (
                        <option key={idx} value={item.city_id}>
                          {item.city_name}
                        </option>
                      ))}
                  </Select>
                </Stack>
                <Stack gap={5}>
                  <Text fontSize={"md"} fontWeight={"bold"} color={"black"}>
                    {t("courierTitle")}
                  </Text>
                  <Select
                    borderColor={"black"}
                    color={"black"}
                    placeholder={t("courierPlaceholder")}
                    onChange={e => setSelectedCourier(e.target.value)}
                  >
                    {Courier.map((item, idx) => (
                      <option key={idx} value={item.courier_name}>
                        {item.courier_name}
                      </option>
                    ))}
                  </Select>
                </Stack>
                <Box>
                  <Text
                    fontSize={"md"}
                    fontWeight={"bold"}
                    color={"black"}
                    mb={5}
                  >
                    {t("weightTitle")}
                  </Text>
                  <InputGroup size="sm">
                    <Input
                      borderLeftRadius={5}
                      borderColor={"black"}
                      _placeholder={{ color: "gray" }}
                      placeholder="1"
                      color={"black"}
                      onChange={e => setWeight(e.target.value)}
                      value={weight}
                    />
                    <InputRightAddon
                      borderColor={"black"}
                      color={"black"}
                      borderRightRadius={5}
                      bgColor={"gray.300"}
                    >
                      KG
                    </InputRightAddon>
                  </InputGroup>
                </Box>
                <Button
                  _hover={{ bgColor: "gray", color: "black" }}
                  disabled={loading}
                  onClick={() => handleCalculateCost()}
                >
                  {t("button")}
                </Button>
              </Stack>
            }
          />
        </Stack>
        {!loading && primaryCost.length > 0 && (
          <Stack ref={resultsRef}>
            <CardWrapper
              heading={`Results ${selectedCourier.toUpperCase()}  Courier`}
              body={
                <Stack gap={5}>
                  {!loading &&
                    primaryCost.map((item, idx) => (
                      <>
                        <HStack
                          display={"flex"}
                          justifyContent={"space-between"}
                          key={idx}
                        >
                          <Box>
                            <Text
                              fontSize={"md"}
                              fontWeight={"bold"}
                              color={"black"}
                            >
                              {item.service}
                            </Text>
                            <Text fontSize={"md"} color={"black"}>
                              {item.description}
                            </Text>
                          </Box>
                          <Box textAlign={"right"}>
                            <Text
                              fontSize={"md"}
                              fontWeight={"bold"}
                              color={"black"}
                            >
                              {"Estimated Day"}
                            </Text>
                            <Text fontSize={"md"} color={"black"}>
                              {item.cost[0].etd}
                            </Text>
                          </Box>
                        </HStack>
                        <Box>
                          <HStack
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            <Text
                              fontSize={"md"}
                              fontWeight={"bold"}
                              color={"black"}
                            >
                              {"Shipping Prive"}
                            </Text>
                            <Text fontSize={"md"} color={"black"}>
                              {item.cost[0].value}
                            </Text>
                          </HStack>
                          <Text fontSize={"md"} color={"gray"}>
                            {item.cost[0].note}
                          </Text>
                        </Box>
                        <Divider borderColor={"gray"} borderWidth={"1px"} />
                      </>
                    ))}
                </Stack>
              }
            />
          </Stack>
        )}
      </Stack>
    </Center>
  );
}
