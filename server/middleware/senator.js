const senatorCheck = {
    checkSenator (req, res ,next) {
        const { name, phoneNumber, state, email } = req.body;

        if (phoneNumber.length < 11) {
            return res.status(400).json({
                status: 'error',
                error: 'Phone number must be 11 characters'
            })
        }

        if (name.length < 3) {
            return res.status(400).json({
                status: 'error',
                error: 'Name cannot be less than 3 characters'
            })
        }

        if ( state == '', state == undefined || state == null) {
            return res.status(400).json({
                status: 'error',
                error: 'State can not be empty'
            })
        }
        // check if email value has @(mail service).com
        if (!(/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(email))) {
            return res.status(400).json({
                status: 'error',
                error: 'invalid email format'
            })
        }
        next();
    }
}

// export senatorCheck to routes
module.exports = senatorCheck;
