import visit from 'unist-util-visit'
import whiteSpace from 'hast-util-whitespace'

var unknown = null
var containsImage = true
var containsOther = false

var splice = [].splice

export default function remarkUnwrapImages() {
  return transform
}

function transform(tree) {
  visit(tree, 'paragraph', onparagraph)
}

function onparagraph(node, index, parent) {
  if (applicable(node) === containsImage) {
    splice.apply(parent.children, [index, 1].concat(node.children))
    return [visit.SKIP, index]
  }
}

function applicable(node, inLink) {
  var image = unknown
  var children = node.children
  var length = children.length
  var index = -1
  var child
  var linkResult

  while (++index < length) {
    child = children[index]

    if (whiteSpace(child)) {
      // White space is fine.
    } else if (child.type === 'image' || child.type === 'imageReference') {
      image = containsImage
    } else if (
      !inLink &&
      (child.type === 'link' || child.type === 'linkReference')
    ) {
      linkResult = applicable(child, true)

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
