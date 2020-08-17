import https from 'https';
import { getPhoto } from '../../api';

export default async function(req, res) {
    const uid = 'ky5hr4t02f';
    let photo = null;
    let buffers = [];
    try {
        photo = await getPhoto(null, uid);
        https.get(photo.url.large, res34 => {
            res34.on('data', chunk => {
                buffers.push(chunk)
            })
            res34.on('end', () => {
                const image = Buffer.concat(buffers);
                res.setHeader("Content-Disposition", "attachment; filename=pikachu.jpg");
                res.setHeader('Content-Type', 'image/jpeg');
                res.setHeader('Content-Length', image.byteLength);
                res.status(200);
                res.send(image);
            })
        })
        // res.setHeader("Content-Disposition", "attachment; filename=pikachu.jpg");
        // res.setHeader('Content-Type', 'image/jpeg');
        // res.status(200);
    }
    catch (error) {
        console.log(error);
    }
    
    // res.end('2');
}