var {
    validationResult
} = require('express-validator');

exports.home_page_get = [
    (req, res, next) => {
        // Save errors from validating, if any.
        const errors = validationResult(req)

        // Check if there were errors from the form.
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        res.json({
            authorised: true,
            msg: "welcome to the home page"
        })
    },
]