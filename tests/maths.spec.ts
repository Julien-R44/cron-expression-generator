import { test } from '@japa/runner'

test.group('Maths.add', () => {
  test('add two numbers', ({ assert }) => {
    assert.equal(2 + 2, 4)
  })
})
