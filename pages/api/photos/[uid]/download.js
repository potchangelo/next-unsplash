import { getPhoto } from 'z/fetchers/photos';

const sizes = [
  { title: 'small', width: '640' },
  { title: 'medium', width: '1080' },
  { title: 'large', width: '1920' },
];

export default async function (req, res) {
  // Data
  const { uid, force, w } = req.query;
  let photo = null,
    fetchedData = null;

  // Size option
  let sizeTitle = 'original';
  const sizeOption = sizes.find(size => size.width === w);
  if (!!sizeOption) {
    sizeTitle = sizeOption.title;
  }

  try {
    const resJson = await getPhoto(uid);
    photo = resJson?.photo;
    if (!photo) throw new Error('Photo not found');
    const fetchedRes = await fetch(photo.src[`${sizeTitle}`]);
    fetchedData = await fetchedRes.arrayBuffer();
  } catch (error) {
    console.log(error.toString());
    res.status(404);
    res.send('Photo not found');
    return;
  }

  // No force in URL query string
  if (force !== 'true') {
    res.redirect(photo.src?.original);
    return;
  }

  // Download
  const basedFilename = `${photo.user?.displayName}-${photo.uid}-${sizeTitle}-unsplash-cloned.jpg`;
  const filename = basedFilename.replace(' ', '-').toLowerCase();
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-Type', 'image/jpeg');
  res.setHeader('Content-Length', fetchedData.byteLength);
  res.status(200);
  res.send(Buffer.from(fetchedData));
}
