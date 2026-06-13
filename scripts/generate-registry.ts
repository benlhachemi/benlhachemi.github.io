import fs from 'fs'
import path from 'path'

const projectsDir = path.join(process.cwd(), 'content', 'projects')
const outputFile = path.join(process.cwd(), 'lib', 'project-registry.tsx')

const slugs = fs.readdirSync(projectsDir)
  .filter(f => f.endsWith('.mdx') && f !== 'index.mdx')
  .map(f => f.replace(/\.mdx$/, ''))

const imports = slugs
  .map(s => `import ${toVarName(s)} from '@/content/projects/${s}.mdx'`)
  .join('\n')

const mapEntries = slugs
  .map(s => `  '${s}': ${toVarName(s)},`)
  .join('\n')

const content = `// Auto-generated — do not edit manually. Run \`bun run generate-registry\` to update.
${imports}

export const projectRegistry: Record<string, React.ComponentType> = {
${mapEntries}
}

export const projectSlugs: string[] = [${slugs.map(s => `'${s}'`).join(', ')}]
`

fs.writeFileSync(outputFile, content, 'utf-8')
console.log(`Generated registry with ${slugs.length} projects: ${slugs.join(', ')}`)

function toVarName(slug: string) {
  return slug.replace(/[^a-zA-Z0-9_$]/g, '_').replace(/^(\d)/, '_$1')
}