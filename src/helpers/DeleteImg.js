const deleteImgControler = {};
const path = require('path');
const fs = require('fs');
const { promisify } = require('util')

deleteImgControler.deleteImg = async (nameImg) => {
    promisify(fs.unlink)(path.resolve(__dirname, "../storage/imgs",nameImg))   
};

module.exports = deleteImgControler;
