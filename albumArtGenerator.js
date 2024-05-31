import { createCanvas, loadImage } from 'canvas';

async function generateAlbumArt(artists) {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext('2d');

  // Draw background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 500, 500);

  // Draw artist names
  ctx.fillStyle = '#fff';
  ctx.font = '30px Arial';
  ctx.fillText('Playlist', 50, 50);
  artists.forEach((artist, index) => {
    ctx.fillText(artist.name, 50, 100 + index * 40);
  });

  return canvas.toDataURL();
}

export default generateAlbumArt;