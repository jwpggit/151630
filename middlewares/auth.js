const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    // read the token from header or url
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    console.log('headers:', req.headers);
    console.log('token:', token);

    if (token && token.startsWith('Bearer')) {
        token = token.slice(7,token.length);
        console.log ('token22222', token) 
    }

    // token does not exist
    if (!token) {
        console.log ('토큰없엉..') 
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, jwtSecret, (err, decoded) => {
                if(err) reject(err,token)
                resolve(decoded)
            })
        }
    )

    // 확인에 실패한 경우 오류 메시지가 반환됩니다.
    const onError = (error,token) => {
        res.status(403).json({
            success: false,
            message: error.message,
        })
       console.log ('에러의 내용 error', error)    
    }

    // process the promise
    p.then((decoded)=>{
        console.log ('decoded', decoded) 
        req.decoded = decoded
        next()
    }).catch(onError)
}

module.exports = authMiddleware;