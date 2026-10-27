export async function GET() {
  return Response.json({
    message: "Notes fetched successfully",
  });
}

export async function POST(prev, { request }) {
  return Response.json({
    success: true,
    title: "Learning Next.js",
    content: "Today I learned Route Handlers",
  });
}
