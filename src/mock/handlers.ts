import { rest } from 'msw';
import { races, backgrounds, sources } from './generalData';



export const handlers = [
    rest.get('/api/races', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(races),
        );
    }),

    rest.get('/api/backgrounds', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(backgrounds),
        );
    }),

    rest.get('/api/sources', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(sources),
        );
    }),

    rest.get('/api/classes', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([]),
        );
    }),

    
];
