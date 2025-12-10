import { useEffect, useState } from 'react';

const Banner = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[60vh] overflow-hidden bg-gray-900 flex items-center justify-center -z-10">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop")',
          transform: `translateY(${offset * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div
        className="relative z-10 text-center text-white p-4"
        style={{ transform: `translateY(${offset * 0.2}px)` }}
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-2">Ideas</h1>
        <p className="text-lg md:text-xl">Where all our great things begin</p>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-24 bg-white"
        style={{
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'
        }}
      ></div>
    </div>
  );
};

export default Banner;
