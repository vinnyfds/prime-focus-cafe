import favicons from 'favicons'
import { writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs'
import { join } from 'path'

async function main() {
  const src = 'docs/images/logo-owl.png'
  const outDir = 'public'
  if (!existsSync('public')) mkdirSync('public')

  const configuration = {
    path: '/',
    appName: 'Prime Focus C.A.F.E.',
    appShortName: 'PFC',
    appDescription: 'Clarity • Awareness • Focus • Energy',
    developerName: 'Prime Focus, Inc.',
    theme_color: '#0b0e11',
    background: '#ffffff',
  }

  const response = await favicons(src, configuration as any)
  for (const file of response.files) {
    writeFileSync(join(outDir, file.name), file.contents)
  }
  for (const image of response.images) {
    writeFileSync(join(outDir, image.name), image.contents)
  }
  // Ensure OG image exists (copy if present)
  if (existsSync('docs/images/og-banner.png')) {
    copyFileSync('docs/images/og-banner.png', join(outDir, 'images/og-banner.png'))
  }
  console.log('Favicons generated into /public')
}

main().catch(err => { console.error(err); process.exit(1) })
