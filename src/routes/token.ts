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
    "AC1fd9d39d0f8079fe6cde9f8c3a6cdf15",
    "4721218117e56ce9fbad51ea2f33f4b1",
    "SKea537c0285222ddb22e399eecc0fbd91",
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
