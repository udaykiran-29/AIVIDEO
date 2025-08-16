import { kv } from '@vercel/kv';

const PLACEHOLDER_VIDEO_URL = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4";

export default async function handler(req, res) {
  // We only want to handle GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Get the dynamic part of the URL, which is the taskId
    const { taskId } = req.query;

    // Retrieve the task data from Vercel KV using the taskId as the key
    const task = await kv.get(taskId);

    // If no task is found, return a 404 error
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Check if 5 seconds (5000 milliseconds) have passed
    const timeElapsed = Date.now() - task.startTime;

    if (timeElapsed < 5000) {
      // If not enough time has passed, it's still processing
      return res.status(200).json({ status: "processing" });
    } else {
      // Otherwise, the task is complete
      return res.status(200).json({
        status: "completed",
        videoUrl: PLACEHOLDER_VIDEO_URL
      });
    }
  } catch (error) {
    console.error('Error fetching task status:', error);
    return res.status(500).json({ error: 'Failed to fetch task status' });
  }
}