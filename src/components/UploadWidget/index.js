import { useState, useEffect, useRef } from 'react';

export default function UploadWidget(props) {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dkuq7bvia',
            uploadPreset: 'e8akbvsl'
        }, function(error, result) {
            // console.log(result);
            if (result.event === 'success') {
                props.setPicture(result.info.url)
            }
        })
    }, [])

    function handleOnClick(e) {
        e.preventDefault();
        widgetRef.current.open();
    }

    return (
        <button className='profile-create-btn m-2' type='click' onClick={handleOnClick}>
            Upload
        </button>
    )
}