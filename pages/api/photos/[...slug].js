import { getPhoto } from '../../../api';

export default async function(req, res) {
    const { slug, force } = req.query;
    const [uid, download] = slug;
    let photo = null, fetchedData = null;

    // No download in URL path
    if (!download) {
        res.status(501);
        res.send('Unknown request');
        return;
    }

    try {
        photo = await getPhoto(null, uid);
        const fetchedRes = await fetch(photo?.url?.original);
        fetchedData = await fetchedRes.arrayBuffer();
    }
    catch (error) {
        console.log(error.toString());
        res.status(404);
        res.send('Cannot find image');
        return;
    }

    // No force in URL query string
    if (force !== 'true') {
        res.redirect(photo.url.original);
        return;
    }

    // Download
    const basedFilename = `${photo.user.displayName}-${photo.uid}-unsplash-cloned.jpg`;
    const filename = basedFilename.replace(' ', '-').toLowerCase();
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', fetchedData.byteLength);
    res.status(200);
    const imageBuffer = Buffer.from(fetchedData);
    res.send(imageBuffer);
}