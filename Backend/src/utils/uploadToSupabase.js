const path = require('path');
const supabase = require('../../supabaseClient');
require('dotenv').config();

// Sanitize filename function
function sanitizeFileName(filename) {
  return filename
    .replace(/[^a-zA-Z0-9.\-_]/g, '-')  // sirf allowed characters rakhe: letters, numbers, dot, dash, underscore
    .replace(/-+/g, '-');               // multiple dashes ek dash me convert karo
}

const uploadToSupabase = async (file, folder) => {
  const fileExt = path.extname(file.originalname);
  const originalName = path.basename(file.originalname, fileExt);
  const cleanName = sanitizeFileName(originalName);
  const fileName = `${Date.now()}_${cleanName}${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET_NAME) // bucket name environment variable se
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(process.env.SUPABASE_BUCKET_NAME).getPublicUrl(filePath);
  return data.publicUrl;
};

module.exports = uploadToSupabase;
