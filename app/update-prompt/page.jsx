"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const EditPrompt = () => {
  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  // fetche prompt data base on its id and it should change whenevr the id changes
  useEffect(() => {
    const getPromptDetail = async () => {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    // if promptId is not null, get the prompt detail
    if (promptId) getPromptDetail();
  }, [promptId]);

  // submit updated prompt
  async function handleUpdatePrompt(e){
    e.preventDefault();
    setIsSubmitting(true);

    if(!promptId) alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      });

      if (response.ok) router.push("/");

    } catch (error) {
       console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleUpdatePrompt}
    />
  );
};

export default EditPrompt;
