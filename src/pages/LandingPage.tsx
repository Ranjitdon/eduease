import React, { useRef } from 'react';
import { Button } from '@/components/ui/button'; // Ensure this import is correct
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Facebook, Instagram, Twitter } from 'lucide-react'; // Ensure this import is correct

export default function LandingPage() {
  // Create refs for the slider and about sections
  const sliderRef = useRef(null);
  const aboutRef = useRef(null);

  // Scroll to the slider section
  const scrollToSlider = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  // Scroll to the about section
  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  // Redirect to the login page
  const redirectToLogin = () => {
    window.location.href = '/SignIn'; // Change this path as necessary
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4 md:px-8">
          <a href="/" className="flex items-center space-x-2">
            <img src="public/logo.png" alt="Logo" className="h-8 w-8" /> {/* Ensure this image exists */}
          </a>
          <nav className="flex-1 flex justify-center items-center space-x-8 text-sm font-medium">
            <a href="#about" onClick={scrollToAbout} className="hover:text-gray-800">About</a> {/* Updated link */}
            <a href="#services" onClick={scrollToSlider} className="hover:text-gray-800">Services</a>
            <a href="#about" onClick={scrollToAbout} className="hover:text-gray-800">Contact</a> {/* Updated link */}
          </nav>
          <div className="flex items-center space-x-4">
            <a href="/SignIn" className="text-sm font-medium hover:text-gray-800">Login</a>
            <a href="/SignUp" className="text-sm font-medium hover:text-gray-800">Sign Up</a>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8">
        {/* Hero Section */}
        <section className="container flex flex-col items-center text-center gap-6 pb-8 pt-6 md:py-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to EduEase
          </h1>
          <p className="max-w-[700px] text-lg text-gray-600 sm:text-xl">
            We provide innovative solutions for your Educational needs. Our products are designed to streamline your workflow and boost productivity.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row mt-4">
            <Button size="lg" className="text-lg px-6 py-3" onClick={redirectToLogin}>Get Started</Button>
            <Button size="lg" variant="outline" className="text-lg px-6 py-3" onClick={scrollToSlider}>
              Learn More
            </Button>
          </div>
          <div className="flex items-center justify-center mt-8">
          <img
  src="public/logo.png" // Ensure this image exists
  alt="Hero Image"
  className="rounded-lg object-contain w-[150px] h-auto" // Adjust width, height auto
/>

          </div>
        </section>

        {/* Photo Slider Section */}
        <section ref={sliderRef} className="container py-8 md:py-12 lg:py-24 flex justify-center">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            loop
            className="max-w-xl w-full"
          >
            <SwiperSlide>
            <div className="flex flex-col items-center justify-center text-center p-6">
  <img
    src="public/dashboard.png" // Replace with actual image paths
    alt="EduEase Dashboard"
    className="mb-4 w-full h-auto"
  />
  <h2 className="text-2xl font-semibold">EduEase Dashboard</h2>
  <p className="mt-2 text-gray-600">
    Access your courses, manage assignments, and track academic progress seamlessly all in one place.
  </p>
</div>

            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col items-center justify-center text-center p-6">
                <img
                  src="public/submission.png" // Replace with actual image paths
                  alt="Acme Inc Product 2"
                  className="mb-4 w-full h-auto"
                />
                <h2 className="text-2xl font-semibold">Assignment Submission</h2>
  <p className="mt-2 text-gray-600">
    Easily submit and manage your assignments, track deadlines, and receive feedback from your instructors.
  </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col items-center justify-center text-center p-6">
                <img
                  src="public/whiteboard.png" // Replace with actual image paths
                  alt="whiteboard"
                  className="mb-4 w-full h-auto"
                />
                <h2 className="text-2xl font-semibold">Digital Whiteboard</h2>
  <p className="mt-2 text-gray-600">
    An interactive digital whiteboard where students can practice, rehearse, and save their work for future reference.
  </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="container py-8 md:py-12 lg:py-24 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold">About Us</h2>
          <p className="max-w-[700px] mt-4 text-lg text-gray-600">
            EduEase is dedicated to providing top-notch solutions that help Education thrive. Our team of experts is committed to innovation and excellence.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-8 w-full">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:ml-4 px-8 md:flex-row md:gap-2 md:px-0"> {/* Added md:ml-4 for margin-left */}
  <img src="public/logo.png" alt="Logo" className="h-8 w-8" /> {/* Ensure this image exists */}
  <p className="text-center text-sm text-gray-500 md:text-left">
    &copy; {new Date().getFullYear()} EduEase. All rights reserved. Unauthorized use is prohibited.
  </p>
</div>

          <div className="flex" style={{ gap: '35px' }}> {/* Custom gap using inline style */}
  <a href="https://twitter.com" target="_blank" rel="noreferrer">
    <Twitter className="h-5 w-5" />
    <span className="sr-only">Twitter</span>
  </a>
  <a href="https://instagram.com" target="_blank" rel="noreferrer">
    <Instagram className="h-5 w-5" />
    <span className="sr-only">Instagram</span>
  </a>
  <a href="https://facebook.com" target="_blank" rel="noreferrer">
    <Facebook className="h-5 w-5" />
    <span className="sr-only">Facebook</span>
  </a>
</div>
        </div>
      </footer>
    </div>
  );
}
