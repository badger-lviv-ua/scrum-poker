import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import InputItem from '../InputItem.vue'

describe('InputItem', () => {
  it('renders label element', () => {
    const wrapper = mount(InputItem)
    expect(wrapper.get('label')).toBeTruthy()
  })

  it('renders label with correct classes', () => {
    const classes = 'block text-sm font-medium leading-6 text-gray-900'

    const wrapper = mount(InputItem)
    expect(wrapper.get('label').attributes('class')).toContain(classes)
  })

  it('renders "label" prop on label element', () => {
    const wrapper = mount(InputItem, { props: { label: 'Hello Vitest' } })
    expect(wrapper.get('label').text()).toContain('Hello Vitest')
  })

  it('renders "for" attribute on label element if "id" attr defined', () => {
    const wrapper = mount(InputItem, { attrs: { id: 'test-id' } })
    expect(wrapper.get('label').attributes('for')).toContain('test-id')
  })

  it('renders input element', () => {
    const wrapper = mount(InputItem)
    expect(wrapper.get('input')).toBeTruthy()
  })

  it('renders input with correct classes', () => {
    const classes =
      'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'

    const wrapper = mount(InputItem)
    expect(wrapper.get('input').attributes('class')).toContain(classes)
  })

  it('renders "type" attr on input', () => {
    const wrapper = mount(InputItem, { attrs: { type: 'number' } })
    expect(wrapper.get('input').attributes('type')).toContain('number')
  })
})
