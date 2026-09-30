// Shape check shared by the public site (js/app.js) and the panel (js/admin.js).
// Returns '' when the data has the shape the renderers expect, else a description
// of the first problem.
function portfolioDataError(d) {
  'use strict';
  const isObj = (v) => v != null && typeof v === 'object' && !Array.isArray(v);
  const isText = (v) => typeof v === 'string' || (isObj(v) && typeof v.pt === 'string');
  const isStrList = (v) => Array.isArray(v) && v.every((s) => typeof s === 'string');
  const isLinks = (v) => v === undefined || (Array.isArray(v) && v.every((l) => isObj(l) && typeof l.url === 'string'));
  const isChips = (v) => v === undefined || (isObj(v) && isStrList(v.pt) && (v.en === undefined || isStrList(v.en)));

  if (!isObj(d)) return 'os dados não são um objeto';
  const p = d.personal;
  if (!isObj(p)) return '"personal" ausente';
  for (const k of ['name', 'location', 'github', 'email']) {
    if (typeof p[k] !== 'string') return `personal.${k} deve ser texto`;
  }
  for (const k of ['title', 'bio', 'education', 'languages', 'quote']) {
    if (!isText(p[k])) return `personal.${k} deve ser texto ou { pt, en }`;
  }
  const itemChecks = {
    techStack: (g) => isText(g.category) && isStrList(g.items),
    roadmap: (r) => isText(r.title) && isText(r.desc),
    projects: (x) => x.id != null && typeof x.title === 'string' && isStrList(x.tags) && (!x.badge || isText(x.badge))
      && isText(x.shortDesc) && isText(x.longDesc) && isLinks(x.links),
    certifications: (c) => c.id != null && isText(c.name) && isText(c.description) && isLinks(c.links),
    career: (j) => j.id != null && typeof j.company === 'string' && isText(j.role) && isText(j.period)
      && isText(j.shortDesc) && isText(j.description) && isChips(j.achievements),
  };
  for (const [key, ok] of Object.entries(itemChecks)) {
    if (!Array.isArray(d[key])) return `"${key}" deve ser uma lista`;
    const bad = d[key].findIndex((item) => !isObj(item) || !ok(item));
    if (bad !== -1) return `${key}[${bad}] tem campos faltando ou com formato errado`;
  }
  return '';
}
