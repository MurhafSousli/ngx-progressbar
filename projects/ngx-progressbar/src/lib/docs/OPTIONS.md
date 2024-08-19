## Global options

You can customize the default configuration for all progress bars using the `provideNgProgressOptions` function.

**Example:**

```ts
import { provideNgProgressOptions } from '@ngx-progressbar';

bootstrapApplication(AppComponent, {
  providers: [
    provideNgProgressOptions({
      trickleSpeed: 200,
      min: 20,
      flat: true
    })
  ]
})
```

**NgProgressOptions API**

| Name                | Default  | Description                                                |
|---------------------|:--------:|------------------------------------------------------------|
| **direction**       |   ltr+   | *Progress bar direction (`ltr+`, `ltr-`, `rtl+`, `rtl-`).* |
| **trickleSpeed**    |   300    | *Progress trickling speed in ms.*                          |
| **trickleFunc**     | Function | *A **function** that returns the trickling amount.*        |
| **debounceTime**    |    0     | *Debounce time before starting the progress bar in ms.*    |
| **speed**           |   200    | *Transition speed in ms.*                                  |
| **min**             |    8     | *Progress initial starting value.*                         |
| **max**             |   100    | *Progress maximum value.*                                  |
| **ease**            |  linear  | *Progress [ease function](http://easings.net/).*           |
| **spinner**         |  false   | *Display spinner.*                                         |
| **spinnerPosition** |  right   | *Spinner position. (`right`, `left`).*                     |
| **relative**        |  false   | *Position the progress bar relative to parent.*            |
| **flat**            |  false   | *Flat style (disables meteor style).*                      |
