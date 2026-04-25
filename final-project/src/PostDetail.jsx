import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from './supabase.js'
import { UsernameContext } from './App.jsx'
import { timeAgo } from './utils.js'
import './PostDetail.css'

function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const username = useContext(UsernameContext) || 'anonymous'

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [commentError, setCommentError] = useState(null)

  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState({ postName: '', description: '', link: '' })

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase
        .from('post-table')
        .select('*')
        .eq('id', id)
        .single()
      if (data) {
        setPost(data)
        setEditData({ postName: data.postName, description: data.description, link: data.link })
      }
    }

    async function fetchComments() {
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: true })
      if (data) setComments(data)
    }

    fetchPost()
    fetchComments()
  }, [id])

  const isOwner = post && username === post.username

  async function handleLike() {
    if (!post) return
    const newLikes = post.likes + 1
    setPost(prev => ({ ...prev, likes: newLikes }))
    await supabase.from('post-table').update({ likes: newLikes }).eq('id', id)
  }

  async function handleSave(e) {
    e.preventDefault()
    const { data, error } = await supabase
      .from('post-table')
      .update(editData)
      .eq('id', id)
      .select()
      .single()
    if (!error && data) {
      setPost(data)
      setEditing(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete this post? This cannot be undone.')) return
    await supabase.from('post-table').delete().eq('id', id)
    navigate('/')
  }

  async function handleComment(e) {
    e.preventDefault()
    if (!commentText.trim()) return
    setCommentError(null)
    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id: Number(id), text: commentText.trim(), username }])
      .select()
    if (error) {
      setCommentError(error.message)
    } else if (data) {
      setComments(prev => [...prev, data[0]])
      setCommentText('')
    }
  }

  if (!post) return <main><p>Loading...</p></main>

  return (
    <main>
      <div className="post-detail-card">
        <div className="post-header">
          <div className="post-avatar">{post.username?.[0]?.toUpperCase()}</div>
          <div className="post-header-info">
            <span className="username">@{post.username}</span>
            {post.created_at && <span className="post-time">{timeAgo(post.created_at)}</span>}
          </div>
          {isOwner && !editing && (
            <div className="owner-actions">
              <button className="edit-btn" onClick={() => setEditing(true)}>Edit</button>
              <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>

        {editing ? (
          <form className="edit-form" onSubmit={handleSave}>
            <label>Post Title</label>
            <input
              type="text"
              value={editData.postName}
              onChange={e => setEditData(prev => ({ ...prev, postName: e.target.value }))}
              required
            />
            <label>Description</label>
            <textarea
              value={editData.description}
              onChange={e => setEditData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
            <label>Playlist Link</label>
            <input
              type="url"
              value={editData.link}
              onChange={e => setEditData(prev => ({ ...prev, link: e.target.value }))}
            />
            <div className="edit-form-actions">
              <button type="submit" className="save-btn">Save</button>
              <button type="button" className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <h3 className="post-title">{post.postName}</h3>
            <div className="post-body">
              {post.description && <p className="description">{post.description}</p>}
              {post.link && (
                <a className="playlist-link" href={post.link} target="_blank" rel="noreferrer">
                  🎵 {post.link}
                </a>
              )}
            </div>
          </>
        )}

        <div className="post-actions">
          <button className="like-btn" onClick={handleLike}>
            🤍
            <span className="like-count">{post.likes}</span>
          </button>
        </div>
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        <form className="comment-form" onSubmit={handleComment}>
          <input
            type="text"
            placeholder={`Comment as @${username}...`}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>
        {commentError && (
          <p style={{ color: '#FF3CAC', fontSize: '0.85rem', marginTop: '0.4rem' }}>
            {commentError}
          </p>
        )}

        <div className="comment-list">
          {comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be the first!</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-avatar" />
                <div className="comment-bubble">
                  <span className="comment-username">@{comment.username ?? 'anonymous'}</span>
                  {comment.text}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}

export default PostDetail
