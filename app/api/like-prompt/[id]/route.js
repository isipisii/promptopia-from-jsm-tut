import Prompt from "@/models/prompt";
import { connectToDb } from "@/utils/database";

export const POST = async (request, { params }) => {
  const { id } = params;
  const { userId } = request.body;

 try {
    await connectToDb();
    // will get the specific prompt post
    const promptPost = await Prompt.findById(id);

    if (!promptPost) {
      return new Response("Prompt not found", { status: 404 });
    }

    // accessing the likedBy property of the prompt post by destructring
    const { likedBy } = promptPost;

    // if the user includes in likedBy array the user will be able to dislike the post
    if (likedBy.includes(userId)) {
      promptPost.like -= 1;
      promptPost.likedBy = likedBy.filter((userId) => userId !== userId);
    } else {
      // if the user does not include in likedBy array the user will be able to like the post and push it inside the likedBy array
      promptPost.like += 1;
      promptPost.likedBy.push(userId);
    }

    await promptPost.save();

    return new Response(JSON.stringify(promptPost), { status: 200 });
  } catch (error) {
    return new Response("Failed to add like", { status: 500 });
  }
};
