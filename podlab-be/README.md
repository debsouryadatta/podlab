### Steps:

1. `pip install pytubefix`
2. Download the video from youtube: on yt-download.py
3. `ffmpeg -ss 00:15:00 -to 00:20:00 -i mi6.mp4 -c copy mi65min.mp4`
4. `ffmpeg -ss 00:15:00 -to 00:45:00 -i mi6.mp4 -c copy mi630min.mp4`
5. Cloning this repo: https://github.com/Junhua-Liao/LR-ASD
```
tqdm -> For progress bar in terminal
torch -> Required for deep learning models
opencv-python -> For video processing(frame extraction)
ffmpegcv -> For video writings with gpu acceleration
numpy -> For numerical operations & array handling
python_speech_features -> For audio feature extraction
scipy -> For scientific computing(not directly used)
scenedetect -> Used by asd for scene detect
scikit-learn -> For machine learning
gdown -> Used by asd for pulling down models from gdrive
torchvision -> dependency for torch
pandas -> For data manipulation
transformers -> Hugging Face's library
accelerate -> For gpu acceleration
datasets -> Hugging Face's dataset library
google-genai -> For google genai api
pysubs2 -> For creating subtitles files
boto3 -> aws sdk for s3
fastapi[standard] -> For api
whisperx -> For speech to text
```
6. Install the `pip install "fastapi[standard]"` and `pip install whisperx` separately
6. `pip install -r requirements.txt`
7. `pip install modal` , `setup modal`
8. Creating the modal image, creating the volume & mount path
9. Creating the Podlab class, defining some functions
10. Creating a bucket on s3 and editing the cors permissions
11. Creating an aws IAM user and adding custom policy/permission for s3 access
12. Creating access key for the user and storing it in the modal dashboard secrets
13. Total 4 secrets in modal dashboard: AUTH_TOKEN, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, GOOGLE_API_KEY
14. Loading the whisperx model and writing up the transcribe_video function with whisperx
15. Loading the gemini model and writing up the identify_moments function with gemini
16. Creating the process_clip func where we are processing each viral moments/clips: 
    - 1. Cutting the clip from the original video
    - 2. Extracting the audio from the clip
    - 3. Running the Columbia script to get the tracks and scores
    - 4. Calling the create_vertical_video function
    - 5. Calling the create_subtitles_with_ffmpeg function
    - 6. Uploading the video with subtitles to s3
17. Creating the create_vertical_video function
    - 1. Set the output video size to 1080x1920 (vertical).
    - 2. Load and sort all frame images.
    - 3. For each frame, find the most relevant face using scores.
    - 4. If a face is found, crop the video to focus on it; otherwise, resize and blur the background.
    - 5. Write each processed frame to the video.
    - 6. Combine the video with audio using ffmpeg.
    - 7. Read claude chats for simpler understanding of how tracks.pckl and scores.pckl work, https://claude.ai/share/bad9587f-a446-4aa7-9f2b-e57a31069fde
18. Creating the create_subtitles_with_ffmpeg function
    - 1. Filter transcript segments to match the video clip’s time range.
    - 2. Group words into subtitle lines (max 5 words per line).
    - 3. Format subtitles with style and timing using pysubs2.
    - 4. Save subtitles as an .ass file.
    - 5. Use ffmpeg to burn subtitles onto the video and save the output.
19. For calling the endpoint,
    - 1. Locally: `modal run main.py`
    - 2. For deployment: `modal deploy main.py`, live url: https://debsouryadatta--podlab-podlab-process-video.modal.run
