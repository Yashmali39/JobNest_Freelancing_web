import React from 'react';
import Navbar from './Navbar';
import myImage from '../assets/myImage.png';
import Createac from '../assets/Createac.svg';
import Searchw from '../assets/Searchw.svg';
import Saveapp from '../assets/Saveapp.svg';
import second from '../assets/second.png';
import Slider from './Slider';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row bg-[#abcbf9] justify-evenly items-center">
        <img src={myImage} alt="Description" className="w-[90%] lg:w-[600px] h-auto object-cover mb-8 lg:mb-0" />
        <section className="bg-[#abcbf9] text-black py-10 px-6 lg:py-20 min-h-[60vh] flex items-center">
          <div className="flex flex-col gap-5">
            <div className="lg:w-[500px] text-left">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4 leading-snug">Are you looking for Freelancers?</h2>
              <p className="text-lg lg:text-xl text-[gray] mb-8">Hire Great Freelancers, Fast. Spacelance helps you hire elite freelancers at a moment's notice</p>
            </div>
            <div>
              <button className="bg-white text-blue-600 font-medium px-6 py-3 rounded-full shadow hover:bg-gray-100">
                Get Started
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 w-[90%] lg:w-[80vw] shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-12 mt-4">How It Works?</h2>
          <div className="flex flex-col lg:flex-row justify-evenly gap-8">
            <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-center items-center gap-4">
              <img src={Createac} alt="Description2" className="w-28 h-28 object-cover" />
              <h3 className="text-xl font-bold">Create Account</h3>
              <p className="text-center">First, you have to create an account here.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-center items-center gap-4">
              <img src={Searchw} alt="Description3" className="w-28 h-28 object-cover" />
              <h3 className="text-xl font-bold">Search Work</h3>
              <p className="text-center">Search the best freelance work here.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-center items-center gap-4">
              <img src={Saveapp} alt="Description3" className="w-28 h-28 object-cover" />
              <h3 className="text-xl font-bold">Save and Apply</h3>
              <p className="text-center">Apply or save and start your work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-6 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-evenly items-center gap-12">
          <img src={second} alt="Description" className="w-[90%] lg:w-[600px] h-auto object-cover scale-x-[-1]" />
          <div className="lg:w-[450px]">
            <h2 className="text-3xl lg:text-5xl leading-snug mb-4">Find The Best <span className="text-blue-600">Freelancers</span> Here</h2>
            <p className="text-[gray]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat bibendum ornare urna, cursus eget convallis. Feugiat imperdiet posuere justo, ultrices interdum sed orci nunc, mattis. Ipsum viverra viverra neque adipiscing arcu, quam dictum. Dui mi viverra dui, sit accumsan, tincidunt massa. Dui cras magnis.</p>
          </div>
        </div>
      </section>

      {/* Recent Works Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Recently Posted Works</h2>
          <div className="flex justify-center">
            <div className="w-[90%] lg:w-[500px] shadow-2xl">
              <Slider />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-slate-800 py-12">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6">Get the latest freelance work and projects directly in your inbox.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <input
              type="email"
              className="w-full md:w-1/3 rounded-lg px-4 py-2"
              placeholder="Enter your email address"
            />
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 JobNest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
