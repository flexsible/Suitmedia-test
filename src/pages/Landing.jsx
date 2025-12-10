import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import PostList from '../components/PostList';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Banner />
      <main className="flex-grow">
        <PostList />
      </main>
      <footer className="bg-gray-900 text-white text-center py-6 mt-12">
        &copy; {new Date().getFullYear()} Suitmedia
      </footer>
    </div>
  );
};

export default Landing;
