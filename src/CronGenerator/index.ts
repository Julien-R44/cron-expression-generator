export enum Day {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export class CronGenerator {
  /**
   * The cron expression
   */
  private expression = '* * * * *'

  /**
   * Insert the given value into the given position
   */
  private spliceIntoPosition(position: number, value: string) {
    const segments = this.expression.split(' ')
    segments[position] = value
    return this.cron(segments.join(' '))
  }

  /**
   * Returns the built cron expression
   */
  public get() {
    return this.expression
  }

  /**
   * Schedule with a custom cron expression
   */
  private cron(expression: string) {
    this.expression = expression
    return this
  }

  /**
   * Schedule to run every minute
   */
  public everyMinute() {
    return this.spliceIntoPosition(0, '*')
  }

  /**
   * Schedule to run every two minutes
   */
  public everyTwoMinutes() {
    return this.spliceIntoPosition(0, '*/2')
  }

  /**
   * Schedule to run every five minutes
   */
  public everyFiveMinutes() {
    return this.spliceIntoPosition(0, '*/5')
  }

  /**
   * Schedule to run every ten minutes
   */
  public everyTenMinutes() {
    return this.spliceIntoPosition(0, '*/10')
  }

  /**
   * Schedule to run every fifteen minutes
   */
  public everyFifteenMinutes() {
    return this.spliceIntoPosition(0, '*/15')
  }

  /**
   * Schedule to run every thirty minutes
   */
  public everyThirtyMinutes() {
    return this.spliceIntoPosition(0, '0,30')
  }

  /**
   * Schedule to run x minutes
   */
  public everyXMinutes(minutes: number) {
    return this.spliceIntoPosition(0, `*/${minutes}`)
  }

  /**
   * Schedule to run every hour
   */
  public everyHour() {
    return this.spliceIntoPosition(0, '0')
  }

  /**
   * Schedule to run every two hours
   */
  public everyTwoHours() {
    return this.spliceIntoPosition(1, '*/2').spliceIntoPosition(0, '0')
  }

  /**
   * Schedule to run every three hours
   */
  public everyThreeHours() {
    return this.spliceIntoPosition(1, '*/3').spliceIntoPosition(0, '0')
  }

  /**
   * Schedule to run every six hours
   */
  public everySixHours() {
    return this.spliceIntoPosition(1, '*/6').spliceIntoPosition(0, '0')
  }

  /**
   * Schedule to run every twelves hours
   */
  public everyTwelveHours() {
    return this.spliceIntoPosition(1, '*/12').spliceIntoPosition(0, '0')
  }

  /**
   * Schedule to run every x hours
   */
  public everyXHours(hours: number) {
    return this.spliceIntoPosition(1, `*/${hours}`).spliceIntoPosition(0, '0')
  }

  /**
   * Schedule to run daily
   */
  public daily() {
    return this.spliceIntoPosition(1, '0').spliceIntoPosition(0, '0')
  }

  /**
   * Set the days of the week the command should run on
   */
  public days(days: Day[] | Day | string) {
    const elements = Array.isArray(days) ? days : [days]
    return this.spliceIntoPosition(4, elements.join(','))
  }

  /**
   * Schedule to run only on weekdays
   */
  public weekdays() {
    return this.days(`${Day.Monday}-${Day.Friday}`)
  }

  /**
   * Schedule to run only on weekends
   */
  public weekends() {
    return this.days(`${Day.Saturday},${Day.Sunday}`)
  }

  /**
   * Schedule to run only on mondays
   */
  public mondays() {
    return this.days(Day.Monday)
  }

  /**
   * Schedule to run only on Tuesdays
   */
  public tuesdays() {
    return this.days(Day.Tuesday)
  }

  /**
   * Schedule to run only on Wednesdays
   */
  public wednesdays() {
    return this.days(Day.Wednesday)
  }

  /**
   * Schedule to run only on thursdays
   */
  public thursdays() {
    return this.days(Day.Thursday)
  }

  /**
   * Schedule to run only on fridays
   */
  public fridays() {
    return this.days(Day.Friday)
  }

  /**
   * Schedule to run only on Saturdays
   */
  public saturdays() {
    return this.days(Day.Saturday)
  }

  /**
   * Schedule to run only on Sundays
   */
  public sundays() {
    return this.days(Day.Sunday)
  }

  /**
   * Schedule to run weekly
   */
  public weekly() {
    return this.spliceIntoPosition(0, '0').spliceIntoPosition(1, '0').spliceIntoPosition(4, '0')
  }

  /**
   * Schedule at the given time
   */
  public at(time: string) {
    return this.dailyAt(time)
  }

  /**
   * Schedule to run daily at the given time
   */
  public dailyAt(time: string) {
    const segments = time.split(':')

    const hour = (+segments[0]).toString()
    const minute = (+segments[1]).toString() || '0'

    return this.spliceIntoPosition(1, hour).spliceIntoPosition(0, minute)
  }

  /**
   * Schedule to run weekly on q given day and time
   */
  public weeklyOn(day: Day, time: string) {
    return this.dailyAt(time).days(day)
  }

  /**
   * Schedule to run monthly
   */
  public monthly() {
    return this.spliceIntoPosition(0, '0').spliceIntoPosition(1, '0').spliceIntoPosition(2, '1')
  }

  /**
   * Schedule to run monthly on the given day and time
   */
  public monthlyOn(day: Day, time: string) {
    return this.dailyAt(time).spliceIntoPosition(2, day.toString())
  }

  /**
   * Schedule to run quarterly
   */
  public quarterly() {
    return this.spliceIntoPosition(0, '0')
      .spliceIntoPosition(1, '0')
      .spliceIntoPosition(2, '1')
      .spliceIntoPosition(3, '1-12/3')
  }

  /**
   * Schedule to run yearly.
   */
  public yearly() {
    return this.spliceIntoPosition(0, '0')
      .spliceIntoPosition(1, '0')
      .spliceIntoPosition(2, '1')
      .spliceIntoPosition(3, '1')
  }

  /**
   * Schedule to run yearly on the given day and time
   */
  public yearlyOn(month = 1, dayOfMonth: string | number = 1, time = '00:00') {
    return this.dailyAt(time)
      .spliceIntoPosition(2, dayOfMonth.toString())
      .spliceIntoPosition(3, month.toString())
  }
}
