import createMDX from '@next/mdx';
const withMDX = createMDX();
export default withMDX({ output: 'export', trailingSlash: true, images: { unoptimized: true }, pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'] });
