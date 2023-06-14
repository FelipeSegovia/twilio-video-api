import express, { Request, Response } from "express";
import twilio from "twilio";

const router = express.Router();
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const videoToken = async (identity: string, room: string) => {
  let videoGrant = new VideoGrant({ room: "test"});

  const token = new AccessToken(
          String(process.env.TWILIO_ACCOUNT_SID),
          String(process.env.TWILIO_AUTH_TOKEN),
          String(process.env.TWILIO_API_KEY),
          { identity }
      );
  token.addGrant(videoGrant);

  console.log("Token result =>", token.toJwt())


  return token.toJwt();
};

router.post("/", async (req: Request, res: Response) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = await videoToken(identity, room);
  res.set("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      token: token
    })
  );
});

export default router;
