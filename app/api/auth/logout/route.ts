import { NextResponse } from "next/server";
import { signOut } from "next-auth/react";

export async function GET() {
  return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL || "http://localhost:3000"));
}
