"use client";

import Profile from "@/components/Profile";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const OtherUserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const [otherUserPosts, setOtherUSerPosts] = useState([]);

  useEffect(() => {
    async function getOtherUserPosts() {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json();
        setOtherUSerPosts(data);
    }
    if(params?.id) getOtherUserPosts();
  }, [params.id]);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personal profile page`}
      data={otherUserPosts}
    />
  );
};

export default OtherUserProfile;
