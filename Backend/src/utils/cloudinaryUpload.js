const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (fileBuffer, folder, format) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: format || 'auto' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    ).end(fileBuffer);
  });
};

module.exports = uploadToCloudinary;
