import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePasswords = (password:string, hash:string) => {
    return bcrypt.compare(password, hash);
}

export const hashPassword = (password:string) => {
    return bcrypt.hash(password,5);
}
export const createJWT = ( user:any ) => {
    const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET as jwt.Secret);
    return token;
}

export const protect = (req:any, res:any, next:any) => {
    console.log(process.env.JWT_SECRET);
    const bearer = req.headers.authorization;
    if(!bearer){
        res.status(401);
        res.json({ message: 'Not Authorized'});
        return;
    }

    const [_, token] = bearer.split(' ');
    if(!token){
        res.status(401);
        res.json({ message: 'Not Valid 1 token'});
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
        req.user = user;
        next();
    } catch (e) {
        res.status(401);
        res.json({ message: 'Not Valid token'});
        return;
    }


}