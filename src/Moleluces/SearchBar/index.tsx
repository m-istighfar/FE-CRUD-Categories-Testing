import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface SearchBarProps {
    onSearchTermChange: (value: string) => void;
}

function SearchBar({ onSearchTermChange }: SearchBarProps) {
    return (
        <div className='relative text-gray-600'>
            <input
                type='search'
                name='serch'
                placeholder='Filter by category name'
                className='bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full'
                onChange={(e) => onSearchTermChange(e.target.value)}
            />
            <button type='submit' className='absolute right-0 top-0 mt-2 mr-4'>
                <MagnifyingGlassIcon className='h-6 w-6 text-gray-600' />
            </button>
        </div>
    );
}

export default SearchBar;
