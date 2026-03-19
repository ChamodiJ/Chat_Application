import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedImg, setSelectedImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [name, setName] = useState(authUser?.fullName );
  const [bio, setBio] = useState(authUser?.bio);

  // Generate preview and clean up old object URLs
  useEffect(() => {
    if (!selectedImg) {
      setImgPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImg);
    setImgPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl); // cleanup
  }, [selectedImg]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImg) {
      // No image, just update name and bio
      await updateProfile({ fullName: name, bio });
      navigate('/');
      return;
    }

    // Convert selected image to base64
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);

    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ ProfilePic: base64Image, fullName: name, bio });
      navigate('/');
    };

    reader.onerror = () => {
      console.error("Failed to read image");
    };
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
          <h3 className="text-lg">Profile details</h3>

          <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={imgPreview || assets.avatar_icon}
              alt=""
              className={`w-12 h-12 ${selectedImg && 'rounded-full'}`}
            />
            Upload profile image
          </label>

          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <textarea
            placeholder="Write profile bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows={4}
          ></textarea>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Save
          </button>
        </form>

        <img className={`max-w-44 aspect-square rounded-full max-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`} src={assets.logo_icon} alt="" />
      </div>
    </div>
  );
};

export default ProfilePage;