const express = require('express')
const router = module.exports = express.Router()
router.prefix = '/'

/**
 * GET /
 */
router.get('/', (req, res) => {
    if (!req.session.userinfo) {
        return res.redirect('account/login')
    }
    res.redirect('music/list')
})
