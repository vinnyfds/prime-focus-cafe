import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    const s = statSync(p)
    if (s.isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

function main() {
  const srcDir = 'src'
  const html = readFileSync('index.html', 'utf8')
  const tsxFiles = walk(srcDir).filter(f => f.endsWith('.tsx'))

  const referenced: Set<string> = new Set()
  const addRefs = (text: string) => {
    const re = /["'`](\/images\/[\w\-\/\.]+|\/content\/[\w\-\/\.]+)["'`]/g
    let m: RegExpExecArray | null
    while ((m = re.exec(text))) referenced.add(m[1])
  }

  addRefs(html)
  for (const f of tsxFiles) addRefs(readFileSync(f, 'utf8'))

  const missing: string[] = []
  for (const ref of referenced) {
    const docPath = ref.replace(/^\/(images|content)\//, 'docs/$1/')
    if (!existsSync(docPath)) missing.push(docPath)
  }

  if (missing.length > 0) {
    console.error('Missing source assets in docs/:')
    for (const m of missing) console.error(' -', m)
    process.exit(1)
  }

  // After build, ensure outputs exist
  const distMissing: string[] = []
  for (const ref of referenced) {
    const distPath = join('dist', ref)
    if (!existsSync(distPath)) distMissing.push(distPath)
  }

  if (distMissing.length > 0) {
    console.error('Missing built assets in dist/:')
    for (const m of distMissing) console.error(' -', m)
    process.exit(2)
  }

  console.log(`verify-images OK (${referenced.size} refs)`) 
}

main()
