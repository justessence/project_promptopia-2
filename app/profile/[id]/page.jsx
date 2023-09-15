"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = ({params}) => {
   const [posts, setPosts] = useState([]);
   const searchParams = useSearchParams();
   const username = searchParams.get('name')

   useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params.id}/posts`);
        const data = await response.json();
         
        setPosts(data);
      }
      
      if(params.id) fetchPosts();
    }, [])

   return (
      <Profile
         name={username}
         desc={`Welcome to ${username} personalized profile page`}
         data={posts}
      />
   )
}

export default MyProfile;