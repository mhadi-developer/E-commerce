import express from "express"

import {chatWithAI} from "../controllers/chat.ai.controller.js"

const router = express.Router();

router.route("/chat/ai").post(chatWithAI);

