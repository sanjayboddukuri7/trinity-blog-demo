import { getBlog } from './blogs';
import { useRoute } from './shared';
import { Home } from './Home';
import { BlogHome, PostPage } from './Blog';

export default function App() {
  const [slug, view, id] = useRoute();
  const blog = slug ? getBlog(slug) : undefined;
  if (!blog) return <Home />;
  if (view === 'post') {
    const post = blog.posts.find(p => p.slug === id);
    if (post) return <PostPage key={`${slug}-${id}`} blog={blog} post={post} />;
  }
  const category = view === 'category' && id ? decodeURIComponent(id) : undefined;
  return <BlogHome key={slug} blog={blog} category={category} />;
}
