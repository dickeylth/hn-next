import { Story } from '@/types'
import Link from 'next/link'

interface StoryListProps {
  stories: Story[]
}

export default function StoryList({ stories }: StoryListProps) {
  return (
    <div className="space-y-4">
      {stories.map((story, index) => (
        <div
          key={story.id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 text-center text-gray-500">
              {index + 1}.
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-medium">
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-orange-600"
                >
                  {story.title}
                </a>
              </h2>
              <div className="mt-2 text-sm text-gray-500">
                {story.score} points by {story.by} |{' '}
                <Link href={`/item/${story.id}`} className="hover:text-orange-600">
                  {story.descendants} comments
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
