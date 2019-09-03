var {
    validationResult,
    body
} = require('express-validator');
var jsonpatch = require('fast-json-patch')

// Apply json patch to json object and return patched object.
exports.patch_json_object = // Apply json patch to json object and return patched object.
    exports.patch_json_patch = [
        // Validate input fields. Trim spaces around username
        body('jsonObject', 'JSON object must not be empty.').isLength({
            min: 1
        }),
        body('jsonPatchObject', 'JSON patch object must not be empty.').isLength({
            min: 1
        }),

        // Process the request after validating.
        (req, res, next) => {
            // Save errors from validating, if any.
            const errors = validationResult(req)

            // Check if there were errors from the form.
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                })
            }
            try {
                // Save object-to-patch and patch-object from the request.
                var jsonObject = JSON.parse(req.body.jsonObject)
                var jsonPatchObject = JSON.parse(req.body.jsonPatchObject)
            } catch (e) {
                var jsonObject = req.body.jsonObject
                var jsonPatchObject = req.body.jsonPatchObject
                var err = e
            }
            // Save patch in new variable.
            const patchedObject = jsonpatch.applyPatch(jsonObject, jsonPatchObject).newDocument
            // res.json({user: req.user.username, patchedObject: patchedObject})
            res.json({
                patchedObject, err
            })
        },
    ]
