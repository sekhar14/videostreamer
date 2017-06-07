const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

router.get('/:videoname', (req, res) => {
    const {videoname} = req.params
    const videoFile = path.join(__dirname, `../videos/${videoname}.mp4`)
    fs.stat(videoFile, (err, stats) => {
        if (err) {
            console.log(err)
            return res.status(404).end(`<h1>${videoFile} not found!</h1>`)
        }else {
            const {range} = req.headers
            const {size} = stats
            const start = Number((range||'').replace(/bytes=/,'').split('-')[0])
            const end = size - 1
            const chunkSize = (end - start) + 1
            res.set({
                'Content-Range' : `bytes ${start}-${end}/${size}`,
                'Accept-Ranges' : 'bytes',
                'Content-Length' : chunkSize,
                'Content-Type' : 'video/mp4'
            })
            res.status(206)
            const stream = fs.createReadStream(videoFile, {start,end})
            stream.on('open', () => stream.pipe(res))
            stream.on('error', (err) => res.send(err))
        }
    })
})

module.exports = router