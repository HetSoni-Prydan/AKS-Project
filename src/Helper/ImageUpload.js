const multer = require('multer');
const path = require('path');


var UserImage  = multer.diskStorage({
    destination: function(req, file, cd)
    {
        cd(null, "./src/IMG/profile"); 
    },
    filename: function(res, file, cd)
    {
        cd(null, file.originalname);
    },
});

var UserImageUpload = multer({storage:UserImage}).single("profile");

module.exports = {UserImageUpload};