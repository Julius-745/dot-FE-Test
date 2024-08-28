"use client";
import { useState } from "react";
import { Button, Center, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "@/hooks";
import { useLocale } from "next-intl";
import { CardWrapper } from "@/_component";
import { useRouter } from "next/navigation";

export default function Login() {
  const user = localStorage.getItem("user");
  const route = useRouter();
  const locale = useLocale();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  if (user) {
    route.push(`/${locale}`);
  }

  return (
    <Center mt={"10%"} p={5}>
      <CardWrapper
        heading="Login"
        body={
          <Stack
            as="form"
            onSubmit={handleSubmit}
            spacing={3}
            maxW="400px"
            margin="auto"
          >
            <Input
              borderColor={"black"}
              color={"black"}
              _placeholder={{ color: "black" }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              isDisabled={loading}
            />
            <Input
              borderColor={"black"}
              color={"black"}
              _placeholder={{ color: "black" }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              isDisabled={loading}
            />
            {error && <Text color="red.500">{error}</Text>}
            <Button type="submit" isLoading={loading}>
              Login
            </Button>
          </Stack>
        }
      />
    </Center>
  );
}
