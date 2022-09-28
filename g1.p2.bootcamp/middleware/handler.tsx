import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
const handler = nc({
    onError: (err, req:NextApiRequest, res:NextApiResponse, next) => {
      console.error(err.stack);
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("Page is not found");
    }
});
export default  handler;