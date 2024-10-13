"use client";

import { useState } from "react";
import { Heading, Grid, Flex, Link, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Divider from "./components/Divider";
import Input from "./components/Input";
import logo from "./public/image.png";
import { motion } from "framer-motion";
import { signIn } from "./service/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.push("/"); // Redirect to dashboard after successful login
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleRegister = () => {
    router.push("/signup");
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
        '. logo form .'
        '. . . .'
      "
        justifyContent="center"
        alignItems="center"
        bg="brand.alice-blue"
      >
        <Flex gridArea="logo" flexDir="column" alignItems="flex-start">
          <img src={logo.src} alt="Piffy" width={210} />

          <Heading
            size="2xl"
            lineHeight="shorter"
            marginTop={16}
            color="brand.polynesian-blue"
          >
            Log in to the <br /> platform
          </Heading>
        </Flex>

        <Flex
          gridArea="form"
          height="100%"
          backgroundColor="brand.polynesian-blue"
          borderRadius="md"
          flexDir="column"
          alignItems="stretch"
          padding={16}
          boxShadow="md"
        >
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            backgroundColor="white"
            color="brand.polynesian-blue"
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
            color="brand.polynesian-blue"
            focusBorderColor="brand.alice-blue"
            _placeholder={{ color: "gray.400" }}
          />

          <Link
            alignSelf="flex-start"
            marginTop={2}
            fontSize="sm"
            color="brand.alice-blue"
            fontWeight="bold"
            _hover={{
              color: "brand.bright-pink-crayola",
              textDecoration: "underline",
            }}
          >
            I forgot my password
          </Link>

          <Button
            backgroundColor="brand.alice-blue"
            color="brand.polynesian-blue"
            height="50px"
            borderRadius="sm"
            marginTop={6}
            onClick={handleLogin}
            _hover={{
              backgroundColor: "brand.bright-pink-crayola",
              color: "white",
            }}
          >
            LOGIN
          </Button>

          <Text textAlign="center" fontSize="sm" color="white" marginTop={6}>
            Don't have an account?{" "}
            <Link
              color="brand.alice-blue"
              onClick={handleRegister}
              fontWeight="bold"
              _hover={{
                color: "brand.bright-pink-crayola",
                textDecoration: "underline",
              }}
            >
              Register
            </Link>
          </Text>

          <Divider color={"brand.alice-blue"} />

          <Flex alignItems="center">
            <Text fontSize="sm" color="white">
              Or sign in with
            </Text>
            <Button
              height="50px"
              flex="1"
              backgroundColor="brand.alice-blue"
              color="brand.polynesian-blue"
              marginLeft={6}
              borderRadius="sm"
              _hover={{
                backgroundColor: "brand.bright-pink-crayola",
                color: "white",
              }}
            >
              FACEBOOK
            </Button>
          </Flex>
        </Flex>
      </Grid>
    </motion.div>
  );
}
