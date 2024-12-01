import { getStory, getComment } from '@/utils/api';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { notFound } from 'next/navigation';
import { Comment } from '@/types';

dayjs.extend(relativeTime);

// Recursive comment component
function CommentComponent({ comment }: { comment: Comment }) {
  const hasChildren = comment.kids && comment.kids.length > 0;
  
  if (!comment.text) return null;
  
  return (
    <div className="comment mb-4">
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
        <span>{comment.by}</span>
        <span>•</span>
        <span>{dayjs.unix(comment.time).fromNow()}</span>
      </div>
      <div 
        className="prose prose-xs max-w-none mb-2"
        dangerouslySetInnerHTML={{ __html: comment.text }}
      />
      {hasChildren && (
        <div className="pl-4 border-l-2 border-gray-200 mt-4 space-y-4">
          {comment.kids?.map((kidId) => (
            <AsyncComment key={kidId} commentId={kidId} />
          ))}
        </div>
      )}
    </div>
  );
}

// Async comment loader
async function AsyncComment({ commentId }: { commentId: number }) {
  const comment = await getComment(commentId);
  if (!comment) return null;
  return <CommentComponent comment={comment} />;
}

export default async function ItemPage({ params }: { params: { id: string } }) {
  const story = await getStory(parseInt(params.id));
  
  if (!story) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Story Header */}
      <article className="bg-white rounded-lg p-6 mb-6">
        <div className="flex gap-4">
          {/* Score Circle */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
              <span className="text-orange-500 font-medium">{story.score}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h1 className="text-xl font-medium text-gray-900 mb-2">
              {story.url ? (
                <Link href={story.url} className="hover:underline">
                  {story.title}
                </Link>
              ) : (
                story.title
              )}
            </h1>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>by {story.by}</span>
              <span>•</span>
              <span>{dayjs.unix(story.time).fromNow()}</span>
              {story.url && (
                <>
                  <span>•</span>
                  <span className="truncate">
                    {new URL(story.url).hostname.replace('www.', '')}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Text Content (if any) */}
        {story.text && (
          <div 
            className="prose prose-sm max-w-none mt-4 pt-4 border-t border-gray-100"
            dangerouslySetInnerHTML={{ __html: story.text }}
          />
        )}
      </article>

      {/* Comments Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-base font-medium text-gray-900 mb-6">
          Comments ({story.descendants || 0})
        </h2>
        
        <div className="space-y-6 text-sm">
          {story.kids?.map((commentId) => (
            <AsyncComment key={commentId} commentId={commentId} />
          ))}
          {(!story.kids || story.kids.length === 0) && (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
