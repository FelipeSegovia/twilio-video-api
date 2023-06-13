import express, { Request, Response } from "express";
import twilio from "twilio";

const router = express.Router();
const AccessToken = twilio.jwt.AccessToken;

const videoToken = (identity: string, room: string) => {
  let videoGrant;
  if (typeof room !== "undefined") {
    videoGrant = new AccessToken.VideoGrant({ room });
  } else {
    videoGrant = new AccessToken.VideoGrant();
  }
  // const token = new AccessToken(
  //         String(process.env.TWILIO_ACCOUNT_SID),
  //         String(process.env.TWILIO_API_KEY),
  //         String(process.env.TWILIO_API_SECRET),
  //         { identity }
  //     );
  const token = new AccessToken(
    "AC1edee71fe1c02062b5d19c030ed0d296",
    "1134dd63659c2fe5e5a8f11ef8e8171b",
    "SK582999eef4618d56961c9635e06a4e2c",
    { identity }
  );
  token.addGrant(videoGrant);
  return token;
};

router.post("/", (req: Request, res: Response) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room);
  res.set("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    })
  );
});

export default router;
