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
    "SKcf5fbc226bb61a984f07c61d9f24da73",
    "Ie4zpHWbl1rriqRsTQv92z2hRvfBGhtM",
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
