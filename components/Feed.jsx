"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({
  data,
  handleTagClick,
  searchText,
  searchedPosts,
  addLike
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {(searchText ? searchedPosts : data).map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          addLike={addLike}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);

  console.log(posts);

  function handleSearchChange(e) {
    e.preventDefault();
    setSearchText(e.target.value);
    filterSearch();
  }

  async function addLike(post) {
    const response = await fetch(`/api/like-prompt/${post._id}`, {
      method: "POST",
    });
    console.log(response);
    if (response.ok) {
      alert("Post liked successfully");
    }
  }

  // filter the posts based on the search text
  function filterSearch() {
    const filteredPosts = posts.filter((post) => {
      return (
        post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
        post.creator.username
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        post.prompt.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setSearchedPosts(filteredPosts);
  }

  // filtering the tag when clicked
  function handleTagClick(tag) {
    setSearchText(tag);
    const filteredTag = posts.filter((post) =>
      post.tag.toLowerCase().includes(tag.toLowerCase())
    );
    setSearchedPosts(filteredTag);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [addLike]);

  return (
    <section className="feed">
      <form className="relative w-full flex flex-center">
        <input
          type="text"
          placeholder="Search for a tag, username, or prompt"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        addLike={addLike}
        data={posts}
        searchedPosts={searchedPosts}
        searchText={searchText}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
