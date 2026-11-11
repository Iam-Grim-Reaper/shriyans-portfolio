import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, LockKeyhole, PenLine, Save } from 'lucide-react';
import './blog.css';

const OWNER = 'Iam-Grim-Reaper';
const REPO = 'shriyans-portfolio';
const CONTENT_PATH = 'public/blog-posts.json';
const API = 'https://api.github.com/repos/' + OWNER + '/' + REPO + '/contents/' + CONTENT_PATH;
const PUBLIC_FEED = '/blog-posts.json';

function formatDate(date) {
  if (!date) return '';
  return new Date(date + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

function slugify(input) {
  return (input || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 85);
}

function readableTime(text) {
  return Math.max(1, Math.ceil((text.trim().match(/\S+/g) || []).length / 220));
}

function asBytesToB64(input) {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  for (let index = 0; index < bytes.length; index += 8192) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 8192));
  }
  return btoa(binary);
}

function fromB64(b64) {
  const binary = atob(b64.replace(/\s/g, ''));
  return new TextDecoder().decode(Uint8Array.from(binary, (character) => character.charCodeAt(0)));
}

function isSafeLink(url) {
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' || parsed.protocol === 'mailto:';
  } catch { return false; }
}

function Inline({ text }) {
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
  const parts = [];
  let index = 0;
  let match;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > index) parts.push(text.slice(index, match.index));
    if (match[2] && isSafeLink(match[3])) {
      parts.push(<a key={parts.length} href={match[3]} target="_blank" rel="noopener noreferrer">{match[2]}</a>);
    } else if (match[4]) {
      parts.push(<strong key={parts.length}>{match[4]}</strong>);
    } else if (match[5]) {
      parts.push(<code key={parts.length}>{match[5]}</code>);
    } else {
      parts.push(match[0]);
    }
    index = pattern.lastIndex;
  }
  if (index < text.length) parts.push(text.slice(index));
  return <>{parts}</>;
}

export function MarkdownArticle({ content }) {
  const lines = (content || '').replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let paragraph = [];
  let list = [];
  let code = [];
  let codeMode = false;
  let codeLanguage = '';
  function flushParagraph() {
    if (paragraph.length) blocks.push(<p key={blocks.length}><Inline text={paragraph.join(' ')}/></p>);
    paragraph = [];
  }
  function flushList() {
    if (list.length) blocks.push(<ul key={blocks.length}>{list.map((line, i) => <li key={i}><Inline text={line}/></li>)}</ul>);
    list = [];
  }
  lines.forEach((line) => {
    if (line.startsWith('~~~')) {
      flushParagraph(); flushList();
      if (codeMode) {
        blocks.push(<pre key={blocks.length}><code>{code.join('\n')}</code></pre>);
        code = []; codeMode = false;
      } else {
        codeMode = true; codeLanguage = line.slice(3).trim();
      }
      return;
    }
    if (codeMode) { code.push(line); return; }
    if (!line.trim()) { flushParagraph(); flushList(); return; }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph(); flushList();
      const Tag = 'h' + (heading[1].length + 1);
      blocks.push(<Tag key={blocks.length}><Inline text={heading[2]}/></Tag>);
      return;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      flushParagraph(); list.push(line.replace(/^\s*[-*]\s+/, '')); return;
    }
    if (line.startsWith('> ')) {
      flushParagraph(); flushList();
      blocks.push(<blockquote key={blocks.length}><Inline text={line.slice(2)}/></blockquote>);
      return;
    }
    if (/^---+$/.test(line)) {
      flushParagraph(); flushList(); blocks.push(<hr key={blocks.length}/>); return;
    }
    flushList(); paragraph.push(line.trim());
  });
  flushParagraph(); flushList();
  if (code.length) blocks.push(<pre key={blocks.length}><code>{code.join('\n')}</code></pre>);
  return <div className="article-body">{blocks}</div>;
}

function usePosts() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading');
  useEffect(() => {
    let mounted = true;
    fetch(PUBLIC_FEED, { cache: 'no-cache' })
      .then((response) => { if (!response.ok) throw Error('Could not load articles'); return response.json(); })
      .then((data) => { if (mounted) { setPosts(Array.isArray(data) ? data.filter(p => p.published !== false) : []); setStatus('ready'); } })
      .catch(() => { if (mounted) setStatus('error'); });
    return () => { mounted = false; };
  }, []);
  return { posts: [...posts].sort((a,b) => String(b.date).localeCompare(String(a.date))), status };
}

function ArticleLink({ post }) {
  return <a href={'/blog/' + encodeURIComponent(post.slug)} className="writing-row">
    <div className="writing-row-copy">
      <div className="writing-meta">{post.category || 'Engineering notes'} <span>·</span> {formatDate(post.date)} <span>·</span> {post.readTime || readableTime(post.body || '')} min read</div>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </div>
    <ArrowUpRight aria-hidden="true" size={21}/>
  </a>;
}

export function BlogTeaser() {
  const { posts, status } = usePosts();
  return <section className="section wrap homepage-writing" id="writing">
    <div className="writing-section-title">
      <div><div className="kicker">04 / TECHNICAL WRITING</div><h2>Notes from the build.</h2><p>What I'm learning about AI systems, engineering decisions, and shipping software.</p></div>
      <a href="/blog" className="writing-all">All writing <ArrowUpRight size={17}/></a>
    </div>
    {posts.length ? <div className="writing-list">{posts.slice(0,3).map(p=><ArticleLink post={p} key={p.slug}/>)}</div>
      : <div className="writing-empty">{status === 'error' ? 'Articles could not be loaded right now.' : status === 'loading' ? 'Loading notes…' : 'The first article is on its way. Check back soon.'}</div>}
  </section>;
}

function BlogIndex() {
  const { posts, status } = usePosts();
  useEffect(() => { document.title = 'Writing | Shriyans Denis Swamy'; }, []);
  return <main className="wrap blog-layout" id="top">
    <div className="blog-intro"><div className="kicker">SHRIYANS / WRITING</div><h1>Writing<span className="blog-period">.</span></h1><p>Ideas, experiments, technical breakdowns, and lessons from building AI products. Written by me, shared here.</p></div>
    <div className="blog-list-heading"><span>ALL ARTICLES</span><span>{posts.length ? String(posts.length).padStart(2,'0') : '—'}</span></div>
    {posts.length ? <div className="writing-list">{posts.map(p=><ArticleLink post={p} key={p.slug}/>)}</div>
      : <div className="blog-empty"><BookOpen size={23}/><h2>No articles published yet.</h2><p>{status === 'error' ? 'Could not load the blog at the moment. Please check back.' : status === 'loading' ? 'Loading articles…' : 'I am working on the first post. Come back for notes on AI engineering and projects.'}</p></div>}
    <a className="blog-home-link" href="/"><ArrowLeft size={17}/> Back to portfolio</a>
  </main>;
}

function BlogArticle({ slug }) {
  const { posts, status } = usePosts();
  const article = posts.find(p => p.slug === slug);
  useEffect(() => { document.title = (article ? article.title + ' | ' : 'Writing | ') + 'Shriyans Denis Swamy'; }, [article]);
  if (!article) return <main className="wrap blog-article blog-loading" id="top"><a className="blog-home-link" href="/blog"><ArrowLeft size={17}/> All writing</a><p>{status === 'loading' ? 'Loading article…' : 'This article is not available.'}</p></main>;
  return <main className="wrap blog-article" id="top">
    <a href="/blog" className="blog-home-link"><ArrowLeft size={16}/> All writing</a>
    <div className="writing-meta">{article.category || 'Engineering notes'} <span>·</span> {formatDate(article.date)} <span>·</span> {article.readTime || readableTime(article.body || '')} min read</div>
    <h1>{article.title}</h1>
    <p className="blog-subtitle">{article.description}</p>
    <div className="blog-byline"><span className="byline-avatar">SD</span><div><strong>Shriyans Denis Swamy</strong><small>AI Engineer · Technical writing</small></div></div>
    <MarkdownArticle content={article.body}/>
    <div className="blog-end"><p>Thanks for reading.</p><a href="/blog">More writing <ArrowRight size={17}/></a></div>
  </main>;
}

const emptyDraft = { title: '', description: '', category: 'Engineering', body: '', slug: '' };

function BlogEditor() {
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [repoSha, setRepoSha] = useState(null);
  const [posts, setPosts] = useState([]);
  const [draft, setDraft] = useState(emptyDraft);
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'Write | Shriyans Denis Swamy'; }, []);

  async function github(path, options = {}) {
    const response = await fetch(path, {
      ...options,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: 'Bearer ' + token.trim(),
        'X-GitHub-Api-Version': '2022-11-28',
        ...(options.headers || {}),
      },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || 'GitHub request failed (' + response.status + ')');
    return payload;
  }

  async function authenticate(event) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      if (!token.trim()) throw Error('Enter a repository-scoped GitHub token.');
      const user = await github('https://api.github.com/user');
      if (user.login !== OWNER) throw Error('Only the ' + OWNER + ' GitHub account can use this editor.');
      const file = await github(API + '?ref=main');
      const decoded = JSON.parse(fromB64(file.content));
      if (!Array.isArray(decoded)) throw Error('Blog file is not a post array.');
      setPosts(decoded); setRepoSha(file.sha); setAuthenticated(true);
      setMessage('Connected as ' + user.login + '. Publish changes to the main branch.');
    } catch (cause) { setError(cause.message || 'Unable to connect'); }
    finally { setBusy(false); }
  }

  function update(field, value) { setDraft(current => ({ ...current, [field]: value })); }
  function startEditing(post) {
    setDraft({ title: post.title, description: post.description || '', category: post.category || 'Engineering', body: post.body || '', slug: post.slug });
    setPreview(false); setMessage('Editing: ' + post.title); setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function publish(event) {
    event.preventDefault(); setError(''); setMessage('');
    const title = draft.title.trim();
    const description = draft.description.trim();
    const body = draft.body.trim();
    const slug = draft.slug || slugify(title);
    if (!title || !description || !body || !slug) { setError('Title, summary, and article body are required.'); return; }
    if (!draft.slug && posts.some(p => p.slug === slug)) { setError('A post with this title already exists. Edit it from the list below or choose a different title.'); return; }
    setBusy(true);
    try {
      const today = new Date().toISOString().slice(0,10);
      const previous = posts.find(p => p.slug === slug);
      const article = { slug, title, description, category: draft.category.trim() || 'Engineering', date: previous?.date || today, updated: today, readTime: readableTime(body), body, published: true };
      const next = [article, ...posts.filter(p => p.slug !== slug)];
      const result = await github(API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: (previous ? 'docs(blog): update ' : 'docs(blog): publish ') + slug,
          content: asBytesToB64(JSON.stringify(next, null, 2) + '\n'),
          sha: repoSha,
          branch: 'main',
        }),
      });
      setPosts(next); setRepoSha(result.content.sha); setDraft(emptyDraft); setPreview(false);
      setMessage('Published to GitHub. Vercel will rebuild the site; the post will appear at /blog/' + slug + ' once deployment finishes.');
    } catch (cause) {
      setError(cause.message || 'Publishing failed. Refresh and try again.');
    } finally { setBusy(false); }
  }

  return <main className="wrap blog-editor" id="top">
    <a href="/blog" className="blog-home-link"><ArrowLeft size={17}/> Back to writing</a>
    <div className="kicker">PRIVATE / PUBLISHING WORKSPACE</div>
    <h1>Write & publish<span className="blog-period">.</span></h1>
    {!authenticated ? <div className="editor-auth">
      <LockKeyhole size={24}/><h2>Author access</h2><p>Publishing is restricted to the GitHub account that owns this portfolio. Use a <strong>fine-grained personal access token</strong> scoped only to the <strong>shriyans-portfolio</strong> repository with <strong>Contents: Read and write</strong>. The token is kept only in this page's memory; it is never saved to your site or browser storage.</p>
      <form onSubmit={authenticate}>
        <label htmlFor="writer-token">GitHub fine-grained token</label>
        <input type="password" id="writer-token" autoComplete="off" spellCheck="false" value={token} onChange={e=>setToken(e.target.value)} placeholder="github_pat_..." required/>
        <button className="editor-button" disabled={busy}>{busy ? 'Checking access…' : 'Unlock editor'} <ArrowRight size={16}/></button>
      </form>
      <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer" className="editor-help">Create a fine-grained GitHub token <ArrowUpRight size={14}/></a>
      {error && <p className="editor-error" role="alert">{error}</p>}
    </div> : <div className="editor-workspace">
      {message && <div className="editor-success" role="status"><Check size={16}/> {message}</div>}
      {error && <div className="editor-error" role="alert">{error}</div>}
      <div className="editor-tabs"><button type="button" className={!preview?'selected':''} onClick={()=>setPreview(false)}><PenLine size={15}/> Write</button><button type="button" className={preview?'selected':''} onClick={()=>setPreview(true)}><BookOpen size={15}/> Preview</button><button type="button" className="editor-signout" onClick={()=>{setAuthenticated(false);setToken('');setPosts([]);setRepoSha(null);setDraft(emptyDraft);}}>Disconnect</button></div>
      {preview ? <div className="editor-preview">
        <div className="writing-meta">{draft.category || 'Engineering'} · PREVIEW</div>
        <h2>{draft.title || 'Untitled draft'}</h2><p className="blog-subtitle">{draft.description}</p>
        <MarkdownArticle content={draft.body}/>
      </div> : <form className="editor-form" onSubmit={publish}>
        <label>Article title<input maxLength={130} required value={draft.title} onChange={e=>update('title',e.target.value)} placeholder="What I learned building…"/></label>
        <label>Short description<input maxLength={240} required value={draft.description} onChange={e=>update('description',e.target.value)} placeholder="One sentence about the article"/></label>
        <label>Category<input maxLength={40} value={draft.category} onChange={e=>update('category',e.target.value)} placeholder="Engineering"/></label>
        <label>Article body <span>Markdown: ## headings, **bold**, - lists, [links](https://…), and ~~~ for code blocks</span><textarea required rows={18} value={draft.body} onChange={e=>update('body',e.target.value)} placeholder="Start writing your article here…"/></label>
        <div className="editor-submit"><span>{readableTime(draft.body)} min read · {draft.body.trim().split(/\s+/).filter(Boolean).length} words</span><button className="editor-button" disabled={busy}><Save size={16}/>{busy ? 'Publishing…' : draft.slug ? 'Update article' : 'Publish article'}</button></div>
      </form>}
      <div className="editor-existing"><h2>Published articles</h2>{posts.length ? posts.map(p=><button key={p.slug} type="button" onClick={()=>startEditing(p)}><span>{p.title}</span><small>Edit <ArrowUpRight size={13}/></small></button>) : <p>No articles yet. Your first post will appear here.</p>}</div>
    </div>}
  </main>;
}

export default function BlogPage() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/write') return <BlogEditor/>;
  if (path === '/blog') return <BlogIndex/>;
  return <BlogArticle slug={decodeURIComponent(path.slice('/blog/'.length))}/>;
}
