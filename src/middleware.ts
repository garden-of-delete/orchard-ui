import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// TODO: move to config
const SECRET_KEY = 'your_secret_key';
const REDIRECT_URL = 'https://www.google.com'
const USE_AUTH = true
const JWT_NAME = 'KEYCLOAK_IDENTITY'
const JWT_DOMAIN = ''
const JWT_PATH = '/auth/realms/orchard-ui'

const config = {

}
export function middleware(req) {

    if (USE_AUTH) {
        const token = req.cookies.get(JWT_NAME);

        if (token) {
            try {
                // Verify the token with your secret key
                jwt.verify(token, SECRET_KEY);
                // TODO: add best practice validations to the above

                // Token is valid, proceed with the request
                return NextResponse.next();
            } catch (error) {
                // Token validation failed, redirect
                return NextResponse.redirect(REDIRECT_URL);
            }
        } else {
            // No token found, redirect
            return NextResponse.redirect(REDIRECT_URL);
        }
    }
}
