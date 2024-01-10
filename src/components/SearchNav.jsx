import React, { useState } from 'react';

const SearchNav = ({searchText,search,setSearch,filterProductsByStatus,status,setStatus}) => {
    const filterProducts = (filterStatus)=>{
        setStatus(filterStatus);
    }
    return (
        <>
            <div className="">
                <form method='post' onSubmit={(e) => searchText(e)} className='my-2 flex justify-center items-center gap-1 md:gap-2'>
                    <input type="text" placeholder='Name' value={search} onChange={(e) => setSearch(e.target.value,status)} />
                    <div className="flex gap-1 md:gap-2">
                        <button onClick={() => filterProducts('active')} className={`${status == 'active' ? 'bg-yellow-500 text-white' : 'bg-white text-black'} border border-yellow-400 p-2 rounded`}>Active</button>
                        <button onClick={() => filterProducts('inactive')} className={`${status == 'inactive' ? 'bg-yellow-500 text-white' : 'bg-white text-black'} border border-yellow-400 mr-1 p-2 rounded`}>Inactive</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SearchNav;