import { getPhoto } from '../../api';

export default async function(req, res) {
    const uid = 'ky5hr4t02f14658';
    try {
        const photo = await getPhoto(null, uid);
        const fetchedRes = await fetch(photo?.url?.large);
        const fetchedData = await fetchedRes.arrayBuffer();
        const basedFilename = `${photo.user.displayName}-${photo.uid}-unsplash-cloned.jpg`;
        const filename = basedFilename.replace(' ', '-').toLowerCase();
        res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Length', fetchedData.byteLength);
        res.status(200);
        const imageBuffer = Buffer.from(fetchedData);
        res.send(imageBuffer);
    }
    catch (error) {
        console.log(error.toString());
        res.status(404);
        res.send('Cannot find image');
    }
}