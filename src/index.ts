import { CronGenerator } from './CronGenerator'

export { Day } from './CronGenerator'

export function cron() {
  return new CronGenerator()
}
