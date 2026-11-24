import jwt from 'jsonwebtoken';
export const signAccess = user => jwt.sign({sub:user._id.toString(),role:user.role},process.env.JWT_ACCESS_SECRET,{expiresIn:process.env.ACCESS_TOKEN_TTL||'15m'});
export const signRefresh = user => jwt.sign({sub:user._id.toString(),type:'refresh'},process.env.JWT_REFRESH_SECRET,{expiresIn:`${process.env.REFRESH_TOKEN_DAYS||7}d`});