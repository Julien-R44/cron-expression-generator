import { test } from '@japa/runner'
import { CronExpressionGenerator } from '../src'

test.group('Cron expression generator', () => {
  const c = () => new CronExpressionGenerator()

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

  test('misc', ({ assert }) => {
    assert.deepEqual('32 8 3 2 2', c().tuesdays().yearlyOn(2, 3, '08:32').get())
    assert.deepEqual('1 9 * 7 1', c().mondays().yearlyOn(7, '*', '09:01').get())
    assert.deepEqual('8 15 5 4 *', c().yearlyOn(4, 5, '15:08').get())
    assert.deepEqual('0 0 1 1 *', c().yearly().get())
    assert.deepEqual('0 0 1 1-12/3 *', c().quarterly().get())
    assert.deepEqual('* * * * 6', c().saturdays().get())
    assert.deepEqual('* * * * 5', c().fridays().get())
  })
})
