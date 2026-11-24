import {readFileSync,writeFileSync} from 'node:fs';
import {renderPortfolio} from './render.tsx';
const read=p=>readFileSync(new URL('../'+p,import.meta.url));
let html=renderPortfolio().replace(/ (?:srcSet|imageSrcSet)="[^"]*"/gi,"").replace(/<a class="text-button" href="\/projects\/([\w-]+)\/">/g,'<a class="text-button" href="#work" data-project="$1">');for(const file of ['profile','netra'])html=html.replaceAll(`/images/${file}.webp`,`data:image/webp;base64,${read('public/images/'+file+'.webp').toString('base64')}`);
// Also embed image URLs in the JSON used by project dialogs.
const full=`<!doctype html><html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Tejasvi Gupta | Arctic Glass</title><meta name="description" content="Software engineering portfolio"><style>${read('public/arctic.css')}
${read('public/premium.css')}</style></head><body>${html}<script type="application/octet-stream" id="embedded-resume">${read('public/resume/Tejasvi_Gupta_Resume.pdf').toString('base64')}</script><script>${read('public/arctic.js')}</script><script>${read('public/premium.js')}</script></body></html>`;
writeFileSync(new URL('./index.html',import.meta.url),full);
