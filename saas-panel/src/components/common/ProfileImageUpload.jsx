import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { Icon } from "@iconify/react";
import getCroppedImg from "../../utils/cropImage";
import { useColorContext } from "../../context/context";
import imageCompression from 'browser-image-compression';
import toast from "react-hot-toast";

const ProfileImageUpload = ({ value, onChange, previewUrl }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCrop, setShowCrop] = useState(false);
  const {color, darkColor, bgColor} = useColorContext();

  const onDrop = useCallback((acceptedFiles) => {
    setIsDragging(false);
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCrop(true);
      };
    }
  }, []);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    try {
      // First get the cropped image
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      
      // Convert base64 to blob
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      
      // Create a file from the blob
      const croppedFile = new File([blob], "cropped.jpg", { type: "image/jpeg" });
      const originalSize = croppedFile.size / 1024; // Size in KB
      
      // Compress the cropped image
      const options = {
        maxSizeMB: 0.2, // 200KB
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        initialQuality: 0.8
      };
      
      const compressedFile = await imageCompression(croppedFile, options);
      const compressedSize = compressedFile.size / 1024; // Size in KB
      
      // Create final file with compressed data
      const finalFile = new File([compressedFile], "compressed.jpg", {
        type: "image/jpeg",
        lastModified: Date.now(),
      });
      
      onChange(finalFile);
      setImageSrc(null);
      setShowCrop(false);
      
      // Show compression details in toast
      const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
      toast.success(`Image compressed successfully!\nOriginal: ${originalSize.toFixed(1)}KB\nCompressed: ${compressedSize.toFixed(1)}KB\nReduced by: ${compressionRatio}%`);
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Error processing image: ' + error.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/gif': ['.gif']
    },
    maxSize: 5 * 1024 * 1024, // Allow uploads up to 5MB
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    validator: (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            return {
                code: 'invalid-file-type',
                message: 'Only JPEG, PNG and GIF images are allowed'
            };
        }
        return null;
    }
  });

  const imagePreviewUrl = value instanceof File
    ? URL.createObjectURL(value)
    : previewUrl || null;

  return (
    <>
      {showCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-lg p-4 w-[90%] max-w-md">
            <div className="relative w-full h-64 bg-gray-100 shadow-sm rounded-lg overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" style={{background:bgColor,color,borderColor:color}} onClick={() => setShowCrop(false)} className="px-4 py-2 border cursor-pointer hover:scale-105 transition-all rounded-md font-semibold text-[14px]">Cancel</button>
              <button type="button" style={{background:darkColor}} onClick={handleCropSave} className="px-4 py-2 text-white rounded-md font-semibold cursor-pointer hover:scale-105 transition-all text-[14px] flex gap-1.5 items-center"><Icon icon="streamline:crop-selection-solid" width="14" height="14" /> Crop</button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:w-[350px] w-[90dvw] ml-3 md:ml-0 bg-white p-6 text-center pt-20 pb-10 px-12 drop-shadow-[2px_2px_6px_#f3f4f5] border border-gray-200/60  text-gray-900 relative z-0  rounded-[16px] transition-shadow duration-300 ease-in-out overflow-hidden">
        <div className="relative w-36 h-36 mx-auto cursor-pointer border border-gray-200 border-dashed overflow-hidden rounded-full">
          <div className="absolute z-20 inset-2 flex items-center justify-center hover:text-gray-400/80 transition text-gray-400 bg-gray-200/20 rounded-full"
            {...getRootProps()}>
            <input {...getInputProps()} />
            {imagePreviewUrl ? (
              <div className="relative w-full h-full overflow-hidden rounded-full">
                <img
                  src={imagePreviewUrl}
                  alt="Profile Preview"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 hover:opacity-75 text-white flex flex-col justify-center items-center rounded-full transition-opacity">
                  <Icon icon="tabler:camera-plus" width={32} height={32} />
                  <p className="text-xs mt-2">Change Photo</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <Icon icon="tabler:camera-plus" width={31} height={31} />
                <p className="text-xs mt-2">Upload Photo</p>
              </div>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">Allowed: *.jpeg, *.jpg, *.png, *.gif</p>
        <p className="text-xs text-gray-400">Upload up to 5 MB (Will be compressed to 200 KB)</p>
        <p className="text-sm bg-gray-50 border border-dashed border-gray-200 text-gray-400 py-4 rounded-xl font-medium mt-16 flex justify-center gap-2 items-center">
          <Icon icon="tabler:drag-drop" width="24" height="24" />
          Click to upload or drag & drop
        </p>
      </div>
    </>
  );
};

export default ProfileImageUpload;
