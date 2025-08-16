import time
from flask import Flask, request, jsonify, Blueprint

# --- 1. Create an API Blueprint ---
# We define all API routes on this "api" blueprint
api = Blueprint('api', __name__)
tasks = {}
PLACEHOLDER_VIDEO_URL = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"

# --- 2. Attach Routes to the Blueprint ---
# Note the routes are now @api.route, not @app.route
@api.route('/generate', methods=['POST'])
def generate():
    task_id = f"mock_{int(time.time())}"
    tasks[task_id] = {"start_time": time.time()}
    return jsonify({"taskId": task_id})

@api.route('/status/<taskId>', methods=['GET'])
def status(taskId):
    task = tasks.get(taskId)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    if time.time() - task["start_time"] < 5:
        return jsonify({"status": "processing"})
    else:
        return jsonify({
            "status": "completed",
            "videoUrl": PLACEHOLDER_VIDEO_URL
        })

# --- 3. Create and Configure the Main Flask App ---
app = Flask(__name__)
# Register the blueprint, telling it all its routes will start with /api
app.register_blueprint(api, url_prefix='/api')

# This block is for local testing only and will be ignored by Vercel
if __name__ == '__main__':
    app.run(debug=True, port=5001)
