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
    let filteredRaces = races.content.filter((race: Race) =>
      sources?.includes(race.source.id),
    );
    if (!sources) filteredRaces = races.content;
    return res(ctx.status(200), ctx.json({ content: filteredRaces , totalElements: filteredRaces.length }));
  }),

  rest.get("/backgrounds", (req, res, ctx) => {
    const sources = req.url.searchParams.get("source");
    let filteredBackgrounds = sources
      ? backgrounds.content.filter((background: Background) =>
          sources?.includes(background.source.id),
        )
      : backgrounds.content;
    return res(ctx.status(200), ctx.json({ content: filteredBackgrounds , totalElements: filteredBackgrounds.length }));
  }),

  rest.get("/sources", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(sources));
  }),

  rest.get("/classes", (req, res, ctx) => {
    const sources = req.url.searchParams.get("source");
    let filteredClasses = sources
      ? classes.content.filter((c) => sources?.includes(c.source.id))
      : classes.content;
    return res(ctx.status(200), ctx.json({ content: filteredClasses , totalElements: filteredClasses.length }));
  }),

  rest.get("/languages", (req, res, ctx) => {
    const sources = req.url.searchParams.get("source");
    let filteredLanguages = sources
      ? languages.content.filter((l) => sources?.includes(l.source.id))
      : languages.content;
    return res(ctx.status(200), ctx.json({ content: filteredLanguages , totalElements: filteredLanguages.length }));
  }),

  rest.get("/tools", (req, res, ctx) => {
    const sources = req.url.searchParams.get("source");
    let filteredTools = sources
      ? proficiencyTools.content.filter((t) => sources?.includes(t.source.id))
      : proficiencyTools.content;
    return res(ctx.status(200), ctx.json({ content: filteredTools , totalElements: filteredTools.length }));
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
