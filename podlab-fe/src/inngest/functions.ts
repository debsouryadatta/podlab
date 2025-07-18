import { env } from "~/env";
import { inngest } from "./client";

export const processVideo = inngest.createFunction(
  { id: "process-video", concurrency: {
    limit: 1,
    key: "event.data.userId",
  }},
  { event: "process-video-events" },
  async ({ event, step }) => {
    await step.run("call-modal-endpoint", async () => {
        await fetch(env.PROCESS_VIDEO_ENDPOINT, {
            method: "POST",
            body: JSON.stringify({ s3_key: "test1/mi65min.mp4" }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${env.PROCESS_VIDEO_ENDPOINT_AUTH}`,
            }
        })
    })
  },
);