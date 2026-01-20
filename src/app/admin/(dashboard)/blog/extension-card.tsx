
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { InfoCardComponent } from './info-card-component'

export const InfoCard = Node.create({
    name: 'infoCard',
    group: 'block',
    content: 'block+',
    draggable: true,

    addAttributes() {
        return {
            type: {
                default: 'info',
                parseHTML: element => element.getAttribute('data-type'),
                renderHTML: attributes => ({
                    'data-type': attributes.type,
                }),
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="info-card"]',
            },
            {
                tag: 'div.info-card',
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'info-card', class: 'info-card' }), 0]
    },

    addNodeView() {
        return ReactNodeViewRenderer(InfoCardComponent)
    },
})
