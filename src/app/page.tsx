import { getTopStories } from '@/utils/api';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default async function Home() {
  const stories = await getTopStories(1, 30);

  return (
    <div className="space-y-3">
      {stories.map((story) => (
        <article key={story.id} className="bg-white rounded-lg p-4">
          <div className="flex gap-3">
            {/* Score Circle */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <span className="text-orange-500 font-medium">{story.score}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Title and URL */}
              <h2 className="text-base font-medium text-gray-900 mb-1">
                <Link href={story.url || `/item/${story.id}`} className="hover:underline">
                  {story.title}
                </Link>
                {story.url && (
                  <span className="text-sm text-gray-500 ml-2">
                    ({new URL(story.url).hostname})
                  </span>
                )}
              </h2>

              {/* Meta Info */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{story.by}</span>
                <span>•</span>
                <span>{dayjs(story.time * 1000).fromNow()}</span>
                {story.descendants !== undefined && (
                  <>
                    <span>•</span>
                    <Link 
                      href={`/item/${story.id}`}
                      className="hover:text-gray-700"
                    >
                      {story.descendants} comments
                    </Link>
                  </>
                )}
              </div>

              {/* Story Text (if any) */}
              {story.text && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{story.text}</p>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
