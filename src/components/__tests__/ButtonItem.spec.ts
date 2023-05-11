import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import ButtonItem from '../ButtonItem.vue'

describe('ButtonItem', () => {
  it('renders label', () => {
    const wrapper = mount(ButtonItem, { props: { label: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })

  it('renders correct classes', () => {
    const classes =
      'rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

    const wrapper = mount(ButtonItem, { props: { label: 'Hello Vitest', type: 'submit' } })
    expect(wrapper.attributes('class')).toContain(classes)
  })

  it('renders extended ButtonHTMLAttributes', () => {
    const wrapper = mount(ButtonItem, { props: { label: 'Hello Vitest', type: 'submit' } })
    expect(wrapper.attributes('type')).toContain('submit')
  })
})
