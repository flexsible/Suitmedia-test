import React from 'react';

const PostCard = ({ idea }) => {
  const { title, published_at, small_image, medium_image } = idea;

  const date = new Date(published_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  console.log(idea);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200 relative">
        <img
          src={medium_image?.[0]?.url || small_image?.[0]?.url || 'https://placehold.co/600x400'}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col bg-white">
        <span className="text-gray-500 text-sm font-medium mb-2 uppercase tracking-wider block">
          {date}
        </span>
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-3" title={title}>
          {title}
        </h3>
      </div>
    </div>
  );
};

export default PostCard;
