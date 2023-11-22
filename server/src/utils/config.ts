import dotenv from 'dotenv'

dotenv.config();


const node_env = process.env.NODE_ENV

let mongoUri = process.env.MONGO_URI_DEV || "test";


const port = parseInt(process.env.PORT || "5000", 10);

const jwt_secret = process.env.JWT_SECRET

const jwt_expire = process.env.JWT_EXPIRE

const jwt_cookie_expire = parseInt(process.env.JWT_COOKIE_EXPIRE)

const smtp_host = process.env.SMTP_HOST

const smtp_port = process.env.SMTP_PORT

const smtp_email = process.env.SMTP_USERNAME

const smtp_password = process.env.SMTP_PASSWORD

const from_email = process.env.FROM_EMAIL

const from_name = process.env.FROM_NAME

const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET

const refresh_token_expire = process.env.REFRESH_TOKEN_EXPIRE





export {
    mongoUri,
    node_env,
    port,
    jwt_secret,
    jwt_expire,
    jwt_cookie_expire,
    smtp_host,
    smtp_port,
    smtp_email,
    smtp_password,
    from_email,
    from_name,
    refresh_token_secret,
    refresh_token_expire
}