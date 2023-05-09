"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, searchText, searchedPosts }) => {
  return (
    <div className="mt-16 prompt_layout">
      {(searchText ? searchedPosts : data).map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>

  );
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  
  function handleSearchChange(e){
    e.preventDefault();
    setSearchText(e.target.value);
    filterSearch();
  }

  // filter the posts based on the search text
  function filterSearch(){
    const filteredPosts = posts.filter((post) => {
      return post.tag.toLowerCase().includes(searchText.toLowerCase()) || 
      post.creator.username.toLowerCase().includes(searchText.toLowerCase()) || post.prompt.toLowerCase().includes(searchText.toLowerCase());
    });
    setSearchedPosts(filteredPosts);
  }

  // filtering the tag when clicked
  function handleTagClick(tag){
    setSearchText(tag);
    const filteredTag = posts.filter((post) => post.tag.toLowerCase().includes(tag.toLowerCase()));
    setSearchedPosts(filteredTag);
  }


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);
  
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
          data={posts}
          searchedPosts= {searchedPosts}
          searchText={searchText}
          handleTagClick={handleTagClick}
       />
    </section>
  );
};

export default Feed;
