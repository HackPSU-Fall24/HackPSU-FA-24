"use client";

import { useState } from "react";
import { Box, Flex, Heading, Link, Button, Text, VStack, InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signUp } from "@/app/service/auth"; // ✅ Fixed import
import Image from "next/image";
import logo from "/Users/ishitasinha/Documents/GitHub/HackPSU-FA-24/1.svg"; // ✅ Fixed image import
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Signup() {
  const router = useRouter();
  const [name, setName]= useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async () => {
    setErrors({ name: "", email: "", password: "", confirmPassword: "" });
  
    let isValid = true;

    if (!name.trim()){
      setErrors((prev) => ({ ...prev, name: "Full name is required" }));
      isValid = false;
    }
  
    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }));
      isValid = false;
    }
  
    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      isValid = false;
    } else if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters" }));
      isValid = false;
    }
  
    if (password !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
      isValid = false;
    }
  
    if (!isValid) return;
  
    try {
      console.log("Trying to sign up with:", {name, email});
      
      const userCredential = await signUp(email, password,name);
      
      console.log("✅ Sign up successful:", userCredential);
      
      router.push("/");
    } catch (error) {
      console.error("Error signing up:", error);
      setErrors((prev) => ({ ...prev, email: error.message }));
    }
  };
  

  return (
    <Flex minH="100vh">
      {/* Left Section - Sign Up Form */}
      <Box flex={1} display="flex" alignItems="center" justifyContent="center" p={8}>
        <Box w={{ base: "100%", sm: "400px" }} bg="white" p={8} borderRadius="md">
          {/* Heading */}
          <Heading size="lg" fontWeight="bold" color="gray.800">
            Create Account
          </Heading>
          <Text fontSize="sm" color="gray.500" mt={2}>
            Join us to begin your academic journey
          </Text>

          {/* Input Fields */}
          <VStack spacing={4} mt={6} align="stretch">
            {/* Name Input ✅ */}
            <Box>
              <Input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                bg="gray.100"
                focusBorderColor="blue.500"
                _placeholder={{ color: "gray.500" }}
              />
              {errors.name && <Text color="red.500" fontSize="sm" mt={1}>{errors.name}</Text>}
            </Box>
            
            {/* Email Input */}
            <Box>
              <Input
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="gray.100"
                focusBorderColor="blue.500"
                _placeholder={{ color: "gray.500" }}
              />
              {errors.email && <Text color="red.500" fontSize="sm" mt={1}>{errors.email}</Text>}
            </Box>

            {/* Password Input */}
            <Box>
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
              {errors.password && <Text color="red.500" fontSize="sm" mt={1}>{errors.password}</Text>}
            </Box>

            {/* Confirm Password Input */}
            <Box>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  bg="gray.100"
                  focusBorderColor="blue.500"
                  _placeholder={{ color: "gray.500" }}
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword && <Text color="red.500" fontSize="sm" mt={1}>{errors.confirmPassword}</Text>}
            </Box>
          </VStack>

          {/* Signup Button */}
          <Button
            w="full"
            mt={6}
            bg="blue.900"
            color="white"
            size="lg"
            onClick={handleSignup}
            _hover={{ transform: "scale(1.05)", transition: "0.2s" }}
          >
            Create Account
          </Button>

          {/* Divider */}
          <Flex align="center" my={4}>
            <Box flex={1} borderBottom="1px solid" borderColor="gray.300" />
            <Text mx={2} color="gray.500" fontSize="sm">
              OR
            </Text>
            <Box flex={1} borderBottom="1px solid" borderColor="gray.300" />
          </Flex>

          {/* Login Link */}
          <Text fontSize="sm" color="gray.600" textAlign="center">
            Already have an account?{" "}
            <Link
              color="blue.500"
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
              onClick={() => router.push("/login")}
              cursor="pointer"
            >
              Sign In
            </Link>
          </Text>
        </Box>
      </Box>

      {/* Right Section - Dark Blue with Logo */}
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
    </Flex>
  );
}
