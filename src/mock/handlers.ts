import { rest } from 'msw';
import { races, backgrounds, sources, classes, languages, proficiencyTools, subclasses } from './generalData';
import { randomInt } from 'crypto';



export const handlers = [
    rest.get('races', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(races),
        );
    }),

    rest.get('backgrounds', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(backgrounds),
        );
    }),

    rest.get('sources', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(sources),
        );
    }),

    rest.get('classes', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(classes),
        );
    }),

    rest.get('languages', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(languages),
        );
    }),

    rest.get('tools', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(proficiencyTools),
        );
    }),

    rest.get('subclasses', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(subclasses),
        );
    }),

    rest.post('characters', (req, res, ctx) => {
        const { message } = JSON.parse(req.bodyUsed?.toString() || '');
        return res(
            ctx.status(200),
            ctx.json({id: Math.floor(Math.random() * 100), message}),
        );
    }),



    
];
