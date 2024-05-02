import { rest } from "msw";
import {
  races,
  backgrounds,
  sources,
  classes,
  languages,
  proficiencyTools,
  subclasses,
} from "./generalData";
import { Background, Race } from "@definitions/characterForm";

export const handlers = [
  rest.get("/races", (req, res, ctx) => {
    const sources = req.url.searchParams.get("source");
    let filteredRaces = races.filter((race: Race) =>
      sources?.includes(race.source.id),
    );
    if (!sources) filteredRaces = races;
    return res(ctx.status(200), ctx.json(filteredRaces));
  }),

  rest.get("/backgrounds", (req, res, ctx) => {
    const sources = req.url.searchParams.get("source");
    let filteredBackgrounds = sources
      ? backgrounds.filter((background: Background) =>
          sources?.includes(background.source.id),
        )
      : backgrounds;
    return res(ctx.status(200), ctx.json(filteredBackgrounds));
  }),

  rest.get("/sources", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(sources));
  }),

  rest.get("/classes", (req, res, ctx) => {
    const sources = req.url.searchParams.get("source");
    let filteredClasses = sources
      ? classes.filter((c) => sources?.includes(c.source.id))
      : classes;
    return res(ctx.status(200), ctx.json(filteredClasses));
  }),

  rest.get("/languages", (req, res, ctx) => {
    const sources = req.url.searchParams.get("source");
    let filteredLanguages = sources
      ? languages.filter((l) => sources?.includes(l.source.id))
      : languages;
    return res(ctx.status(200), ctx.json(languages));
  }),

  rest.get("/tools", (req, res, ctx) => {
    const sources = req.url.searchParams.get("source");
    let filteredTools = sources
      ? proficiencyTools.filter((t) => sources?.includes(t.source.id))
      : proficiencyTools;
    return res(ctx.status(200), ctx.json(proficiencyTools));
  }),

  rest.get("/subclasses", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(subclasses));
  }),

  rest.post("/characters", (req, res, ctx) => {
    const { message } = JSON.parse(req.bodyUsed?.toString() || "");
    return res(
      ctx.status(200),
      ctx.json({ id: Math.floor(Math.random() * 100), message }),
    );
  }),
];
