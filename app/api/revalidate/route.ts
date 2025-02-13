import { revalidatePath } from "next/cache";
import { z } from "zod";

const Payload = z.object({
  table: z.string(),
  schema: z.string(),
});

export async function POST(request: Request) {
  const { data: body } = Payload.safeParse(await request.json());
  if (!body || body.schema !== "public" || body.table !== "profiles")
    return new Response(null, { status: 400 });
  revalidatePath("/");
  return new Response(null);
}
