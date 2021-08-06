import {visit, SKIP} from 'unist-util-visit'
import {whitespace} from 'hast-util-whitespace'

const unknown = null
const containsImage = true
const containsOther = false

export default function remarkUnwrapImages() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (
        parent &&
        typeof index === 'number' &&
        applicable(node) === containsImage
      ) {
        parent.children.splice(index, 1, ...node.children)
        return [SKIP, index]
      }
    })
  }
}

function applicable(node, inLink) {
  let image = unknown
  let index = -1

  while (++index < node.children.length) {
    const child = node.children[index]

    if (whitespace(child)) {
      // White space is fine.
    } else if (child.type === 'image' || child.type === 'imageReference') {
      image = containsImage
    } else if (
      !inLink &&
      (child.type === 'link' || child.type === 'linkReference')
    ) {
      const linkResult = applicable(child, true)

      if (linkResult === containsOther) {
        return containsOther
      }

      if (linkResult === containsImage) {
        image = containsImage
      }
    } else {
      return containsOther
    }
  }

  return image
}
