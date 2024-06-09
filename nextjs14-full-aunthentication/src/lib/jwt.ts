import { JwtPayload } from "jsonwebtoken";

interface SignOption {
    expiresIn:string | number;
}

const DEFAULT_SIGN_OPTION: SignOption ={
    expiresIn:"1d"
}

export function signJwt( payload:  JwtPayload, option = DEFAULT_SIGN_OPTION ) {
    const secretKey = process.env.JWT_USER_ID_SECRET;
}