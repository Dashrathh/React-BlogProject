import React, { useEffect, useState } from 'react';
import appwriteService from '../../appwrite/config'; // Ensure correct path and casing

import { Container, PostCard } from '../../components';

function Home() {
  const [posts, setPosts] = useState([]); // Fixed plural 'posts' for clarity

  useEffect(() => {
    // Fetch posts using appwriteService
    appwriteService.getPost().then((postResponse) => {
      if (postResponse) {
        setPosts(postResponse.documents); // Assuming posts are in 'documents'
      }
    });
  }, []); // Ensure useEffect only runs once when component mounts

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} /> {/* Spread the post object */}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
