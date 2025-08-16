import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // We only want to handle POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Create a unique task ID
    const taskId = `task_${Date.now()}`;

    // Prepare the task data to be stored
    const taskData = {
      id: taskId,
      startTime: Date.now(),
      status: 'processing',
    };

    // Save the task data to Vercel KV. The key is the taskId.
    await kv.set(taskId, taskData);

    // Return the new task ID to the client
    return res.status(200).json({ taskId });

  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ error: 'Failed to create task' });
  }
}