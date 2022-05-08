<div align="center">
  <img src="https://i.imgur.com/x3dh9en.png" width="600px">
  <h2>Cron Expression Generator</h2>
  <p>Generate crontab expression using friendly and declarative API heavily inspired by Laravel.</p>
</div>

<br />
<hr>

# Usage

```ts
// ESM
import { cron } from 'cron-generator-expression' 

// CJS
const { cron } = require('cron-generator-expression')

const expression = cron().mondays().everyTwoMinutes().get()
console.log(expression) // */2 * * * 1
```


## License

[MIT](./LICENSE) License © 2022 [Julien Ripouteau](https://github.com/Julien-R44)
