"use client";

import { Heading, Grid, Flex, Link, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Divider from "./components/Divider";
import Input from "./components/Input";
import logo from "./public/1.svg";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { signUp } from "./service/auth";

export default function Signup() {
  const router = useRouter();
  const [isInverted, setIsInverted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Trigger the color inversion transition
    setIsInverted(true);
  }, []);

  const handleSignup = async () => {
    try {
      await signUp(email, password, name);
      // Additional logic to save the user's name can be added here, if needed
      router.push("/"); // Redirect to Login after signup
    } catch (error) {
      console.error("Error signing up:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid
        as="main"
        height="100vh"
        templateColumns="1fr 480px 480px 1fr"
        templateRows="1fr 480px 1fr"
        templateAreas="
        '. . . .'
        '. form logo .'
        '. . . .'
      "
        justifyContent="center"
        alignItems="center"
        bg={isInverted ? "brand.polynesian-blue" : "brand.alice-blue"}
        transition="background-color 0.5s ease"
      >
        <Flex
          gridArea="form"
          height="100%"
          backgroundColor={
            isInverted ? "brand.alice-blue" : "brand.polynesian-blue"
          }
          borderRadius="md"
          flexDir="column"
          alignItems="stretch"
          padding={16}
          boxShadow="md"
          transition="background-color 0.5s ease"
        >
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            backgroundColor="white"
            color={isInverted ? "brand.polynesian-blue" : "brand.alice-blue"}
            focusBorderColor="brand.alice-blue"
            _placeholder={{ color: "gray.400" }}
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            marginTop={2}
            backgroundColor="white"
            color={isInverted ? "brand.polynesian-blue" : "brand.alice-blue"}
            focusBorderColor="brand.alice-blue"
            _placeholder={{ color: "gray.400" }}
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            marginTop={2}
            backgroundColor="white"
            color={isInverted ? "brand.polynesian-blue" : "brand.alice-blue"}
            focusBorderColor="brand.alice-blue"
            _placeholder={{ color: "gray.400" }}
          />

          <Button
            backgroundColor="brand.polynesian-blue"
            color="brand.alice-blue"
            height="50px"
            borderRadius="sm"
            marginTop={6}
            onClick={handleSignup}
            _hover={{
              backgroundColor: "brand.bright-pink-crayola",
              color: "white",
            }}
          >
            SIGN UP
          </Button>

          <Text
            textAlign="center"
            fontSize="sm"
            color="brand.polynesian-blue"
            marginTop={6}
          >
            Already have an account?{" "}
            <Link
              color="brand.polynesian-blue"
              fontWeight="bold"
              _hover={{
                color: "brand.bright-pink-crayola",
                textDecoration: "underline",
              }}
              onClick={() => router.push("/login")}
            >
              Log In
            </Link>
          </Text>

          <Divider
            color={isInverted ? "brand.alice-blue" : "brand.polynesian-blue"}
          />
        </Flex>

        <Flex gridArea="logo" flexDir="column" alignItems="flex-end">
          <img src={logo.src} alt="Piffy" width={350} />
          <Heading
            size="2xl"
            lineHeight="shorter"
            marginTop={16}
            color={isInverted ? "brand.alice-blue" : "brand.polynesian-blue"}
          >
            Sign up to the <br /> platform
          </Heading>
        </Flex>
      </Grid>
    </motion.div>
  );
}
