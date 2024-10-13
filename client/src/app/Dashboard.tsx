// pages/dashboard.tsx
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const Dashboard: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [quizStatus, setQuizStatus] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchQuizStatus = async () => {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setQuizStatus(docSnap.data().quiz_status);
            console.log(docSnap.data().quiz_status);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching quiz data:", error);
        }
        // Fetch the user's quiz_status from the database
      };
      fetchQuizStatus();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Rest of your dashboard content */}
      <div className="min-h-screen bg-gradient-to-br from-polynesian-blue via-celestial-blue to-bright-pink-crayola relative overflow-hidden text-alice-blue">
        {/* Floating Background Shapes */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-bright-pink-crayola rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-celestial-blue rounded-full filter blur-2xl animate-pulse"></div>
        </div>

        {/* Hero Section */}
        <header className="relative z-10 py-32 text-center">
          <h1 className="text-5xl font-extrabold mb-4 animate-bounce">
            Welcome to Your Dashboard
          </h1>
          <p className="text-2xl mb-8">
            Unleash your potential with a customized experience.
          </p>
          <Link
            href={quizStatus ? "/results" : "/quiz"}
            className="bg-alice-blue text-bright-pink-crayola px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transform transition"
          >
            {quizStatus ? "Get Quiz Results" : "Start Quiz"}
          </Link>
        </header>

        {/* Features Section */}
        <section className="relative z-10 py-20">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Take the Quiz", href: "/quiz", icon: "📊" },
              { title: "View Schedules", href: "/schedule", icon: "📅" },
              { title: "Profile", href: "/profile", icon: "👤" },
            ].map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="bg-alice-blue shadow-2xl p-8 rounded-2xl text-center text-smoky-black hover:bg-opacity-90 transform hover:-translate-y-2 transition duration-500 ease-in-out"
              >
                <span className="text-6xl mb-6 inline-block animate-pulse">
                  {feature.icon}
                </span>
                <h2 className="text-2xl font-bold">{feature.title}</h2>
              </Link>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative z-10 bg-alice-blue bg-opacity-10 backdrop-blur-md py-20">
          <div className="container mx-auto px-6 text-center text-smoky-black">
            <h2 className="text-4xl font-bold mb-8 text-polynesian-blue">
              About Us
            </h2>
            <div className="max-w-3xl mx-auto bg-alice-blue bg-opacity-90 p-6 rounded-lg shadow-lg text-lg text-smoky-black">
              <p>
                At COURSE PAiLOT, we believe that every student deserves a clear
                and confident start to their academic journey. Our mission is to
                transform the way students approach college planning by
                providing personalized, data-driven guidance that unlocks their
                potential and aligns with their dreams.
              </p>
              <p className="mt-4">
                We’re more than just a scheduling tool—we are a catalyst for
                student success. With cutting-edge technology and a passion for
                education, we empower students to explore their unique paths,
                make informed choices, and step into their futures with purpose
                and excitement.
              </p>
              <p className="mt-4">
                Together, we’re not just planning courses—we’re building the
                leaders, innovators, and visionaries of tomorrow. Let COURSE
                PAiLOT be your compass as you embark on this incredible journey,
                because every student deserves a future that’s as bold and
                bright as they are.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 bg-smoky-black py-10 text-center text-alice-blue">
          <p>&copy; 2024 Your Dashboard. All rights reserved.</p>
          <p>
            Follow us on{" "}
            <a href="#" className="text-bright-pink-crayola hover:underline">
              Twitter
            </a>{" "}
            and{" "}
            <a href="#" className="text-bright-pink-crayola hover:underline">
              LinkedIn
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
