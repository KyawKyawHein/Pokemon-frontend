import React from 'react';
import LoadingImg from "../assets/loading.gif"

const Loading = () => {
    return (
        <>
            <div className="flex w-full justify-center items-center">
                <img src={LoadingImg} className='w-30' alt="" />
            </div>
        </>
    );
}

export default Loading;