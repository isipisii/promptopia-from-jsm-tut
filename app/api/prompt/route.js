import { connectToDb } from "@/utils/database";
import Prompt from "@/models/prompt";

// get the prompt model associated with the user mode
export const GET = async (request) => {
  try {
    await connectToDb();
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompts", { status: 500 });
  }
};
