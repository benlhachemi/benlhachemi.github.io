export default function Page() {
  const content = require('@/content/about/index.mdx')

  return (
    <div className="prose prose-lg dark:prose-invert">
      <content.default />
    </div>
  )
}