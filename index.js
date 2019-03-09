const visit = require('unist-util-visit-parents')

module.exports = () => tree =>
  visit(tree, [ 'image', 'imageReference' ], (node, ancestors) => {
    const parent = ancestors
      .slice()
      .reverse()
      .find(ancestor => ancestor.type === 'paragraph')

    if (parent.children.length === 1) {
      const firstChild = parent.children[0]

      for (const key in firstChild) {
        parent[key] = firstChild[key]
      }
    }
  })
