import express, { Request, Response } from "express";
import twilio from "twilio";

const router = express.Router();
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const videoToken = async (identity: string, room: string) => {
  let videoGrant = new VideoGrant({ room: "08pRN000001Lz7xYAC"});

  const token = new AccessToken(
    'AC4b43abed27693ecfdd7403a4527fe818',
    'SK4d044783a137f4bb6f9ebf815b3cefc7',
    'cMgvGcXpdnAjFiDrOICB2lXzrNsifUzZ',
    { identity }
)
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
