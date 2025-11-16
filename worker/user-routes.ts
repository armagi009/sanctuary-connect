import { Hono } from "hono";
import type { Env } from './core-utils';
import { PractitionerEntity, ArticleEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Ensure seed data is present on first load
  app.use('/api/*', async (c, next) => {
    await PractitionerEntity.ensureSeed(c.env);
    await ArticleEntity.ensureSeed(c.env);
    await next();
  });
  // PRACTITIONERS
  app.get('/api/practitioners', async (c) => {
    const page = await PractitionerEntity.list(c.env);
    return ok(c, page);
  });
  // ARTICLES
  app.get('/api/articles', async (c) => {
    const page = await ArticleEntity.list(c.env);
    return ok(c, page);
  });
  // Health check and test routes
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'Sanctuary Connect API' }}));
}