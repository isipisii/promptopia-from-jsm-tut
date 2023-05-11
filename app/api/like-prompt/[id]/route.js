import Prompt from "@/models/prompt";
import { connectToDb } from "@/utils/database";

export const POST = async (request, { params }) => {
  const { id } = params;
  try {
    await connectToDb();
    const promptPost = await Prompt.findById(id);

    if (!promptPost) {
      return new Response("Prompt not found", { status: 404 });
    }

    promptPost.like += 1;
    await promptPost.save();

    return new Response(JSON.stringify(promptPost), { status: 200 });
  } catch (error) {
    return new Response("Failed to add like", { status: 500 });
  }
};
