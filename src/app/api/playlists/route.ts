import { NextResponse } from 'next/server';
import { connectDB } from '@/dbConfig/db';
import Playlist from '@/models/playlist.models';

connectDB();

export async function GET() {
  try {
    const allCourses = await Playlist.find();
    // console.log(allCourses)
    return NextResponse.json(
      { success: true, data: allCourses },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error while fetching all courses:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
