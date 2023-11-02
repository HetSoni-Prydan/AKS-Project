function CorrectResponse(res, statusCode, data, message){
    res.status(statusCode).json({
        status: statusCode,
        data,
        message
    });
};

function ErrorOccur(res,msg) {
    res.status(400).json({
        status: 400,
        message: msg

    });
}

module.exports = { CorrectResponse , ErrorOccur};