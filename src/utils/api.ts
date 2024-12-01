import axios from 'axios';
import { Story, Comment } from '@/types';
import { HttpsProxyAgent } from 'https-proxy-agent';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

// Create HTTPS proxy agent using environment variable
const httpsProxyAgent = new HttpsProxyAgent(process.env.HTTPS_PROXY || process.env.https_proxy || '');

// Create axios instance with custom config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Increase timeout to 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  proxy: false,
  httpsAgent: httpsProxyAgent
});

export async function getTopStories(page: number = 1, limit: number = 30): Promise<Story[]> {
  try {
    const response = await api.get('/topstories.json');
    const storyIds = response.data;
    const start = (page - 1) * limit;
    const end = start + limit;
    const pageStoryIds = storyIds.slice(start, end);
    
    const stories = await Promise.all(
      pageStoryIds.map((id: number) => getStory(id))
    );
    
    return stories.filter((story): story is Story => story !== null);
  } catch (error) {
    console.error('Error fetching top stories:', error);
    return [];
  }
}

export async function getStory(id: number): Promise<Story | null> {
  try {
    const response = await api.get(`/item/${id}.json`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching story ${id}:`, error);
    return null;
  }
}

export async function getComment(id: number): Promise<Comment | null> {
  try {
    const response = await api.get(`/item/${id}.json`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comment ${id}:`, error);
    return null;
  }
}
