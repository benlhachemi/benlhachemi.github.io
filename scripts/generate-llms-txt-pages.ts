import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const { homepage } = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'))
const outDir = path.join(process.cwd(), 'public', 'llms')
fs.mkdirSync(outDir, { recursive: true })

function stripMdx(mdx: string): string {
  let content = mdx

  // Remove frontmatter
  content = content.replace(/^---[\s\S]*?---\n*/, '')

  // Remove import statements
  content = content.replace(/^import .+?;?$/gm, '')

  // Extract text from JSX expression strings {"..."} or {'...'} or {`...`}
  content = content.replace(/\{(["'`])([^"'`]*?)\1\}/g, '$2')

  // Remove remaining JSX expression blocks like {condition && ...}
  content = content.replace(/\{[^}]+\}/g, '')

  // Remove self-closing component tags <Component ... />
  content = content.replace(/<[A-Z][^>]*?\/\s*>/g, '')

  // Remove opening component tags <Component ...>
  content = content.replace(/<[A-Z][^>]*?>/g, '')

  // Remove closing component tags </Component>
  content = content.replace(/<\/[A-Z][^>]*?>/g, '')

  // Remove HTML-like opening tags <div ...>, <span ...>, <h1 ...>, etc.
  content = content.replace(/<([a-z][a-z0-9]*)(\s+[^>]*?)?\s*\/?\s*>/gi, '')

  // Remove HTML-like closing tags </div>, </span>, </h1>, etc.
  content = content.replace(/<\/([a-z][a-z0-9]*)\s*>/gi, '')

  // Collapse multiple blank lines
  content = content.replace(/\n{3,}/g, '\n\n')

  // Strip trailing whitespace per line
  content = content.replace(/[ \t]+$/gm, '')

  return content.trim()
}

// --- about ---
const aboutSource = fs.readFileSync(path.join(process.cwd(), 'content', 'about.mdx'), 'utf-8')
const aboutContent = stripMdx(aboutSource)
fs.writeFileSync(path.join(outDir, 'about.txt'), aboutContent, 'utf-8')
console.log('Generated llms/about.txt')

// --- services ---
const servicesSource = fs.readFileSync(path.join(process.cwd(), 'content', 'services.mdx'), 'utf-8')
const servicesContent = stripMdx(servicesSource)
fs.writeFileSync(path.join(outDir, 'services.txt'), servicesContent, 'utf-8')
console.log('Generated llms/services.txt')

// --- contact ---
const contactSource = fs.readFileSync(path.join(process.cwd(), 'content', 'contact.mdx'), 'utf-8')
const contactContent = stripMdx(contactSource)
fs.writeFileSync(path.join(outDir, 'contact.txt'), contactContent, 'utf-8')
console.log('Generated llms/contact.txt')

// --- projects ---
const projectsDir = path.join(process.cwd(), 'content', 'projects')
const slugs = fs.readdirSync(projectsDir)
  .filter(f => f.endsWith('.mdx') && f !== 'index.mdx')
  .map(f => f.replace(/\.mdx$/, ''))

const projects = slugs.map(slug => {
  const source = fs.readFileSync(path.join(projectsDir, `${slug}.mdx`), 'utf-8')
  const { data } = matter(source)
  return {
    slug,
    title: data.title ?? slug,
    shortDescription: data.shortDescription ?? '',
    date: data.date ?? '',
  }
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const projectList = projects
  .map(p => `- [${p.title}](${homepage}/llms/projects/${p.slug}.txt): ${p.shortDescription}`)
  .join('\n')

const projectsContent = `# Projects

> A list of projects I've built and shipped.

${projectList}
`
fs.writeFileSync(path.join(outDir, 'projects.txt'), projectsContent, 'utf-8')
console.log(`Generated llms/projects with ${projects.length} projects`)
