import { useRef, useState } from "react";

import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Update the image state
      setImage(file);

      // Generate a preview URL
      const preview = URL.createObjectURL(file);
      if (preview) {
        setPreviewUrl(preview);
      }
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);

    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    // <div className="flex flex-col items-center">
    //   <label htmlFor="profile-photo" className="cursor-pointer">
    //     {selectedImage ? (
    //       <img
    //         src={selectedImage}
    //         alt="Profile"
    //         className="w-24 h-24 rounded-full object-cover mb-2"
    //       />
    //     ) : (
    //       <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
    //         <span className="text-gray-500">No Image</span>
    //       </div>
    //     )}
    //     <input
    //       type="file"
    //       id="profile-photo"
    //       accept="image/*"
    //       onChange={handleImageChange}
    //       className="hidden"
    //     />
    //   </label>
    //   {error && <p className="text-red-500 text-xs">{error}</p>}
    // </div>

    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className="w-20 h-20 items-center justify-center bg-pruple-50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-purple-500" />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-linear-to-r from-purple-500/85 to-purple-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 right-1 cursor-pointer"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfilePhotoSelector;
