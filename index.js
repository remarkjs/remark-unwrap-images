const visit = require('unist-util-visit')

module.exports = () => tree =>
  visit(tree, 'image', (node, _index, parent) => {
    if (parent.children.length === 1) {
      parent.type = node.type
      parent.title = node.title
      parent.url = node.url
      parent.alt = node.alt
      parent.children = []
    }
  })
