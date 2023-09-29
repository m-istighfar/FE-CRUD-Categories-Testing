import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='w-1/3'>
            <div className='relative text-gray-600'>
                <input
                    type='search'
                    name='serch'
                    placeholder='Filter by category name'
                    className='bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type='submit' className='absolute right-0 top-0 mt-2 mr-4'>
                    <MagnifyingGlassIcon className='h-6 w-6 text-gray-600' />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
