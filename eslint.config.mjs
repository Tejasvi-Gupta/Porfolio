import nextVitals from 'eslint-config-next/core-web-vitals';
const config = [...nextVitals,{ignores:['.next/**','out/**','dist/**','.test-python/**','.pip-cache/**','preview/index.html','next-env.d.ts','test-results/**']},{rules:{'@next/next/no-img-element':'off','@next/next/no-html-link-for-pages':'off'}}];
export default config;
