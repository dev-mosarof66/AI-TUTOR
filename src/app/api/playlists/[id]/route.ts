import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/dbConfig/db';
import Playlist from '@/models/playlist.models';

connectDB();

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    try {
        const playlist = await Playlist.findOne({ _id: id })
        return NextResponse.json(
            { success: true, data: playlist },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error while fetching playlist:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch this playlist' },
            { status: 500 }
        );
    }
}
