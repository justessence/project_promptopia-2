"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import Loading from "@app/loading";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16  prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [ searchText, setSearchText ] = useState('');
  const [ searchedPosts, setSearchedPosts ] = useState([]);
  const [ searchTimeOut, setSearchTimeout ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ posts, setPosts ] = useState([]);

  function handleSearchChange(e){
    setIsLoading(true);

    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const filteredPosts = filterPosts(e.target.value);
        setSearchedPosts(filteredPosts);
        setIsLoading(false);
      }, 500)
    )
  }

  function handleTagClick(searchTag){
    const filteredPosts = filterPosts(searchTag);
    setSearchedPosts(filteredPosts);
    setSearchText(searchTag);
  }

  function filterPosts(searchText){
    const regex = new RegExp(searchText, "i");

    const filteredPosts = posts.filter((post) => 
    (
       regex.test(post.prompt) || 
       regex.test(post.tag) || 
       regex.test(post.creator.username)
    ))
    return filteredPosts;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    
    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or a username" 
          value={searchText} 
          onChange={(e) => handleSearchChange(e)}
          className="search_input peer"
          />
      </form>
        {searchText ? (
          isLoading ? <Loading /> : <PromptCardList data={searchedPosts} handleTagClick={handleTagClick}/>
          ) : (
          <PromptCardList data={posts} handleTagClick={handleTagClick} />
        )}
    </section>
  )
}

export default Feed