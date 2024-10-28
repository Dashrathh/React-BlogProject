import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../../components'; // Correct import path
import appwriteService from '../../appwrite/config'; // Appwrite service path

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPost().then((post) => {
      if (post) {
        setPosts(post.documents);
      }
    });
  }, []); // Ensure this runs only on component mount

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="py-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
