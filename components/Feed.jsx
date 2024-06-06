"use client"
import React, { useEffect, useState } from 'react'
import InfoCard from '@/components/InfoCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <>
      <div className='mt-16 prompt_layout'>
        {/* .filter(item => {
    if (searchText === '') {
      return item;
    } else if (item.post.toLowerCase().includes(searchText.toLowerCase())) {
      return item;
    }
    return false;
  }) */}
        {data.map(post => (
          <InfoCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      console.log(data);
      setPosts(data);
    }
    fetchPosts();
  }, [])

  useEffect(() => {
    const filteredPosts = posts.filter((item) => item.prompt.toLowerCase().includes(searchText) || item.tag.toLowerCase().includes(searchText) || item.creator.username.toLowerCase().includes(searchText.toLowerCase()));
    console.log(filteredPosts);
    setFiltered(filteredPosts);
  }, [searchText, posts]);

  const handleTagClick = (tag) => {
    const filtered = posts.filter(item => item.tag.includes(tag));
    setFiltered(filtered);
   // setSearchText('');
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
          placeholder='Search for a prompt, tag or username'
        />
      </form>

      <PromptCardList
        data={filtered ? filtered : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed
