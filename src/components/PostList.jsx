import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getIdeas } from '../api/ideas';
import PostCard from './PostCard';
import Pagination from './Pagination';

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = parseInt(searchParams.get('page')) || 1;
  const initialSize = parseInt(searchParams.get('size')) || 10;
  const initialSort = searchParams.get('sort') || '-published_at';

  const [ideas, setIdeas] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialSize);
  const [sort, setSort] = useState(initialSort);

  useEffect(() => {
    setSearchParams({ page, size: pageSize, sort });
  }, [page, pageSize, sort, setSearchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getIdeas(page, pageSize, sort);
        setIdeas(data.data || []);
        setMeta(data.meta || {});
      } catch (err) {
        setError('Failed to load ideas. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, sort]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const handleSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    document.getElementById('post-list-top')?.scrollIntoView({ behavior: 'smooth' });
  };

  const totalItems = meta?.total || 0;
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <div className="container mx-auto px-10 py-12" id="post-list-top">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="text-gray-600 mb-4 md:mb-0">
          Showing {startItem}-{endItem} of {totalItems}
        </div>

        <div className="flex space-x-4 items-center">
          <div className="flex items-center space-x-2">
            <label htmlFor="perPage" className="text-gray-700 font-medium">Show per page:</label>
            <div className="relative">
              <select
                id="perPage"
                value={pageSize}
                onChange={handleSizeChange}
                className="appearance-none border border-gray-300 px-4 py-2 pr-10 bg-white focus:outline-none focus:border-orange-500 hover:border-gray-400 transition-colors rounded-full cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="sortBy" className="text-gray-700 font-medium">Sort by:</label>
            <div className="relative">
              <select
                id="sortBy"
                value={sort}
                onChange={handleSortChange}
                className="appearance-none border border-gray-300 px-4 py-2 pr-10 bg-white focus:outline-none focus:border-orange-500 hover:border-gray-400 transition-colors rounded-full cursor-pointer"
              >
                <option value="-published_at">Newest</option>
                <option value="published_at">Oldest</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="text-red-500 text-center py-10">{error}</div>}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(pageSize)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ideas.map((idea) => (
              <PostCard key={idea.id} idea={idea} />
            ))}
          </div>

          {meta && (
            <Pagination
              currentPage={page}
              lastPage={Math.ceil(meta.total / pageSize)}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
