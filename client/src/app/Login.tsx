"use client";

import { useState } from "react";
import { Box, Flex, Heading, Link, Button, Text, VStack, InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signIn } from "./service/auth.ts"; // Adjust import if needed
import Image from "next/image";
import logo from "./public/1.svg"; // Adjust if needed
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.push("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <Flex minH="100vh">
      {/* Left Section - Dark Blue */}
      <Box
        flex={1}
        bg="blue.900"
        color="white"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={8}
      >
        {/* Logo */}
        <Image src={logo} alt="Course PAiLOT Logo" width={500} height={500} />

        {/* Title & Description */}
        <Heading size="xl" fontWeight="bold" mt={4}>
          
        </Heading>
        <Text fontSize="23pt" mt={7} textAlign="center">
          Navigate your academic journey with AI-powered course assistance.
        </Text>

        {/* Quote */}
        <Text fontSize="10pt" mt={8} opacity={0.8} textAlign="center" w="80%">
          "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
        </Text>
        <Text fontSize="10pt" fontWeight="bold" mt={2}>
          — Malcolm X
        </Text>
      </Box>

      {/* Right Section - Login Form */}
      <Box flex={1} display="flex" alignItems="center" justifyContent="center" p={8}>
        <Box w={{ base: "100%", sm: "400px" }} bg="white" p={8} borderRadius="md">
          {/* Heading */}
          <Heading size="lg" fontWeight="bold" color="gray.800">
            Welcome Back
          </Heading>
          <Text fontSize="sm" color="gray.500" mt={2}>
            Please sign in to continue
          </Text>

          {/* Input Fields */}
          <VStack spacing={4} mt={6}>
            <Input
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.100"
              focusBorderColor="blue.500"
              _placeholder={{ color: "gray.500" }}
            />

            {/* Password with Eye Icon */}
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="gray.100"
                focusBorderColor="blue.500"
                _placeholder={{ color: "gray.500" }}
              />
              <InputRightElement>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>

          {/* Forgot Password Link */}
          <Flex justify="flex-end" mt={2}>
            <Link fontSize="sm" color="blue.500" fontWeight="medium" _hover={{ textDecoration: "underline" }}>
              Forgot password?
            </Link>
          </Flex>

          {/* Login Button */}
          <Button
            w="full"
            mt={6}
            bg="blue.900"
            color="white"
            size="lg"
            onClick={handleLogin}
            _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
          >
            Sign In
          </Button>

          {/* Divider */}
          <Flex align="center" my={4}>
            <Box flex={1} borderBottom="1px solid" borderColor="gray.300" />
            <Text mx={2} color="gray.500" fontSize="sm">
              OR
            </Text>
            <Box flex={1} borderBottom="1px solid" borderColor="gray.300" />
          </Flex>

          {/* Register Link */}
          <Text fontSize="sm" color="gray.600" textAlign="center">
            Don't have an account?{" "}
            <Link
              color="blue.500"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
              onClick={() => router.push("/signup")} // Correct path
              cursor="pointer"
            >
              Create Account
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
