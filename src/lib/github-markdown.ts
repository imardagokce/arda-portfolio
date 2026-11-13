/**
 * GitHub'dan gelen Markdown'ın (README ve release notları) işlenme ayarları.
 *
 * Bu içerik MDX değil, düz Markdown'dır: MDX olarak işlenirse içindeki ham HTML
 * (style="...", <br>, yorumlar) JSX kurallarına takılır. Bu yüzden 'md' formatında derlenir,
 * ham HTML rehype-raw ile korunur ve ardından rehype-sanitize ile süzülür.
 *
 * Süzme GitHub'ın kendi yaptığına benzer: <script>, <iframe>, <style>, <form>, on* olay
 * öznitelikleri, style öznitelikleri ve javascript: adresleri atılır; başlık, tablo, görsel,
 * <details>, <kbd> gibi zararsız etiketler kalır.
 */
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { remarkAlert } from 'remark-github-blockquote-alert';

/** Sayfa içi bağlantıların ve id'lerin önüne eklenen ek (rehype-sanitize'ın varsayılanı). */
const ID_PREFIX = 'user-content-';

/**
 * Varsayılan (GitHub benzeri) şemaya, remark-github-blockquote-alert'in ürettiği uyarı
 * kutuları için gereken sınıfları ve ikonları ekler. Başka hiçbir sınıfa ya da SVG özelliğine
 * izin verilmez.
 */
const sanitizeSchema: typeof defaultSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'svg', 'path'],
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div ?? []), ['className', /^markdown-alert(-[a-z]+)?$/]],
    p: [...(defaultSchema.attributes?.p ?? []), ['className', 'markdown-alert-title']],
    svg: [['className', 'octicon'], 'viewBox', 'width', 'height', 'ariaHidden'],
    path: ['d'],
  },
};

interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

/**
 * rehype-sanitize, DOM clobbering'e karşı her id'nin önüne ID_PREFIX ekler ama bağlantıların
 * hedefini değiştirmez. Bu eklenti sayfa içi bağlantıları (href="#...") aynı ekle günceller;
 * böylece dipnotlar ve README içindeki çapa bağlantıları çalışmaya devam eder.
 */
function rehypePrefixHashLinks() {
  const visit = (node: HastNode) => {
    const href = node.properties?.href;
    if (
      node.tagName === 'a' &&
      typeof href === 'string' &&
      href.length > 1 &&
      href.startsWith('#') &&
      !href.startsWith(`#${ID_PREFIX}`)
    ) {
      node.properties = { ...node.properties, href: `#${ID_PREFIX}${href.slice(1)}` };
    }
    node.children?.forEach(visit);
  };

  return (tree: HastNode) => visit(tree);
}

export const githubMarkdownOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    format: 'md',
    remarkPlugins: [remarkGfm, remarkAlert],
    // Dipnot id'leri eksiz üretilir; eki yalnızca rehype-sanitize ekler (çift ek olmasın diye).
    remarkRehypeOptions: { clobberPrefix: '' },
    // Sıra önemli: ham HTML'i çöz → süz → bağlantıları düzelt → kod bloklarını renklendir.
    // Renklendirme süzmeden sonra çalışır, çünkü ürettiği style özniteliklerini süzgeç atardı.
    rehypePlugins: [
      rehypeRaw,
      [rehypeSanitize, sanitizeSchema],
      rehypePrefixHashLinks,
      [rehypePrettyCode, { theme: 'github-dark' }],
    ],
  },
};
