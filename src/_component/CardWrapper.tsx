import { ICard } from "@/type";
import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";

export const CardWrapper = ({ heading, body }: ICard) => {
  return (
    <Card
      bgColor={"white"}
      borderColor={"gray"}
      borderWidth={"2px"}
      borderRadius={20}
      w={"40vh"}
    >
      <CardHeader bgColor={"gray"} borderTopRadius={15}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          {heading}
        </Text>
      </CardHeader>
      <CardBody>{body}</CardBody>
    </Card>
  );
};
