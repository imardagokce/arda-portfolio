import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // API route'ları, Next.js/Vercel iç yolları ve uzantılı dosyalar (favicon.ico vb.) dışındaki
  // tüm adresler; böylece /about gibi dil öneki olmayan adresler de /en/about ya da /tr/about'a yönlenir.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
