
// This file is no longer used as we reverted to client-side Supabase calls.
// You can delete this file or keep it for reference.

export default async function handler(_req: any, res: any) {
  res.status(200).json({ message: "Endpoint deprecated. Use Supabase client." });
}