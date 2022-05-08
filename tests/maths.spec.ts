import { test } from '@japa/runner'
import { CronExpressionGenerator } from '../src'

const c = () => new CronExpressionGenerator()

test.group('Cron expression generator', () => {
  test('empty', ({ assert }) => assert.deepEqual(c().get(), '* * * * *'))

  test('minutes', ({ assert }) => {
    assert.deepEqual(c().everyMinute().get(), '* * * * *')
    assert.deepEqual(c().everyTwoMinutes().get(), '*/2 * * * *')
    assert.deepEqual(c().everyFifteenMinutes().get(), '*/15 * * * *')
    assert.deepEqual(c().everyThirtyMinutes().get(), '0,30 * * * *')
    assert.deepEqual(c().everyXMinutes(42).get(), '*/42 * * * *')
  })

  test('hours', ({ assert }) => {
    assert.deepEqual(c().everyHour().get(), '0 * * * *')
    assert.deepEqual(c().everyTwoHours().get(), '0 */2 * * *')
    assert.deepEqual(c().everyThreeHours().get(), '0 */3 * * *')
    assert.deepEqual(c().everySixHours().get(), '0 */6 * * *')
    assert.deepEqual(c().everyTwelveHours().get(), '0 */12 * * *')
    assert.deepEqual(c().everyXHours(6).get(), '0 */6 * * *')
  })

  test('days', ({ assert }) => {
    assert.deepEqual(c().daily().get(), '0 0 * * *')
    assert.deepEqual(c().dailyAt('14:21').get(), '21 14 * * *')
    assert.deepEqual(c().dailyAt('13:08').get(), '8 13 * * *')
    assert.deepEqual(c().dailyAt('13:08').dailyAt('14:21').get(), '21 14 * * *')
  })
})
