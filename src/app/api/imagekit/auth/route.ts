import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
    const token = request.headers.get('token') ?? crypto.randomBytes(16).toString('hex');
    const expire = Math.floor(Date.now() / 1000) + (60 * 5); // 5 minutes from now
    
    if (!process.env.IMAGEKIT_PRIVATE_KEY) {
        return NextResponse.json({ error: 'ImageKit private key not configured' }, { status: 500 });
    }

    const signature = crypto.createHmac('sha1', process.env.IMAGEKIT_PRIVATE_KEY)
        .update(token + expire)
        .digest('hex');

    return NextResponse.json({ token, expire, signature });
}
