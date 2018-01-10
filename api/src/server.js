const Koa = require("koa");
const logger = require("koa-logger");
const cors = require("@koa/cors");
const router = require("koa-router")();
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const db = require("./db");

// -- Middleware ---------------------------------------------------------------

app.use(bodyParser());
app.use(logger());
app.use(cors());

// -- Routes -------------------------------------------------------------------

const api = "/api";

router
  .get(`${api}/ping`, async ctx => ctx.body = "ping")
  .get(`${api}/submissions`, getTalkProposals)
  .post(`${api}/speaker-submission`, createTalkProposal);

app.use(router.routes());

// -- Handlers -----------------------------------------------------------------

async function createTalkProposal(ctx) {
  const speakerSubmissionForm = ctx.request.body;
  try {
    const rdata = await db.speaker.createProposal(speakerSubmissionForm);
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: "THIS SHOULD WORK"
    };
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
}

// I don't like these names yet.
async function getTalkProposals(ctx) {
  const proposals = await db.speaker.getProposals();
  ctx.body = {
    data: proposals
  };
}

app.listen(3001);
