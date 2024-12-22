/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'], // Allow images from Unsplash
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav)$/, // Match video/audio files
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'static/videos/',
          publicPath: '/_next/static/videos/',
        },
      },
    });

    return config;
  },
  // experimental: {
  //   turbo: true, // Enable Turbopack
  // },
};

export default nextConfig;
