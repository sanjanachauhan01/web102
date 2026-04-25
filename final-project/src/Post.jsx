import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabase.js'
import { timeAgo } from './utils.js'
import './Post.css'

function Post({ id, postName, username, description, link, likes: initialLikes = 0, createdAt }) {
  const navigate = useNavigate()
  const [likeCount, setLikeCount] = useState(initialLikes)

  async function handleLike(e) {
    e.stopPropagation()
    const newCount = likeCount + 1
    setLikeCount(newCount)
    await supabase
      .from('post-table')
      .update({ likes: newCount })
      .eq('id', id)
  }

  return (
    <div
      className="post-card"
      onClick={() => navigate(`/post/${id}`, { state: { postName, username, description, link, likes: likeCount } })}
    >
      <div className="post-header">
        <div className="post-avatar">{username?.[0]?.toUpperCase()}</div>
        <div className="post-header-info">
          <span className="username">@{username}</span>
          {createdAt && <span className="post-time">{timeAgo(createdAt)}</span>}
        </div>
      </div>

      <h3 className="post-title">{postName}</h3>

      <div className="post-body">
        <p className="description">{description}</p>
        {link && (
          <a
            className="playlist-link"
            href={link}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
          >
            🎵 {link}
          </a>
        )}
      </div>

      <div className="post-actions">
        <button className="like-btn" onClick={handleLike}>
          🤍
          <span className="like-count">{likeCount}</span>
        </button>
      </div>
    </div>
  )
}

export default Post
