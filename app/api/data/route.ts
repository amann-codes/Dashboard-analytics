import { NextResponse } from "next/server";
import data from '@/mock-data/mock-data';
const handler = async () => {
  return NextResponse.json(data, { status: 200 });
};

export { handler as GET };
