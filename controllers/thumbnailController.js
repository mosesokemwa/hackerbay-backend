var sharp = require('sharp')
var download = require('image-downloader')
var { fileExtension } = require('../middleware/authMiddleware')

const imageExt = ['jpg', 'tif', 'gif', 'png', 'svg']

exports.create_thumbnail_post = (req, res, next) => {
    const { imageUrl } = req.body
    const imageUrlExt = fileExtension(imageUrl).toLowerCase()

    if (imageExt.includes(imageUrlExt)) {
        const options = {
            url: imageUrl,
            dest: './public/images/orig/',
        }
        var resizeFolder = './public/images/resize/'

        download.image(options)
            .then(({ filename }) => {
                sharp(filename)
                    .resize(50, 50)
                    .toFile(`${resizeFolder}output.${imageUrlExt}`, (err) => {
                        if (err) { return next(err) }
                        return res.json({
                            converted: true, user: req.user.username, success: 'Image has been resized', thumbnail: resizeFolder,
                        })
                    })
            })
            .catch(() => {
                res.status(400).json({ error: 'Oops something went wrong. Kindly check your image url and try again' })
            })
    } else {
        res.status(400).json({ error: `We only handle image files with extensions - ${[...imageExt]}` })
    }
}
