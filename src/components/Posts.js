import React, { PropTypes } from 'react'

const Posts = ({posts}) => (
  <ul>
    {posts.map((post, i) =>
      <li key={i}>
        <img src={ post.image } alt={post.name} />
        <h3>{ post.name }</h3>
        <h4>{ post.company }</h4>
      </li>
      
    )}
  </ul>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
