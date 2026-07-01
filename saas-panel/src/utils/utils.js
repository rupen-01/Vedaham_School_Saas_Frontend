export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Fixes CORS issues

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image from: ${url}`));

    // Ensure that the URL is properly assigned *after* event handlers
    img.src = url;
  });
