import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }}
        {...(props as ImageProps)}
        alt={props.alt || ''}
      />
    ),
  }
}
