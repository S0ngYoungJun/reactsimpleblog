import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      userId
      id
      title
      body
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($userId: Int!, $title: String!, $body: String!) {
    createPost(userId: $userId, title: $title, body: $body) {
      userId
      id
      title
      body
    }
  }
`;

const Blog: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_POSTS);
  const [createPost] = useMutation(CREATE_POST);

  const [newPost, setNewPost] = useState({
    userId: 1,
    title: '',
    body: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreatePost = async () => {
    try {
      await createPost({
        variables: {
          userId: newPost.userId,
          title: newPost.title,
          body: newPost.body,
        },
      });
      
      setNewPost({
        userId: 1,
        title: '',
        body: '',
      });

      // 새로운 포스트가 추가되었으므로 다시 데이터를 불러옴
      refetch();
      console.log('Post created successfully:')
    } catch (error) {
      console.error('Error creating post:',error);
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Blog Posts</h1>

      {/* 포스트 목록 표시 (이전 코드는 여기에 유지) */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <ul>
        {data?.posts.map((post: { id: number, title: string, body: string }) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      )}
      {/* 새로운 포스트 입력 폼 */}
      <div>
        <h2>Create New Post</h2>
        <div>
          <label>User ID: </label>
          <input type="number" name="userId" value={newPost.userId} onChange={handleInputChange} />
        </div>
        <div>
          <label>Title: </label>
          <input type="text" name="title" value={newPost.title} onChange={handleInputChange} />
        </div>
        <div>
          <label>Body: </label>
          <textarea name="body" value={newPost.body} onChange={handleInputChange} />
        </div>
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
    </div>
  );
};

export default Blog;