To customize the appearance of the progress bar, you can use the following CSS variables / classes

### CSS variables

| Variable name                     | Default value |
|-----------------------------------|:--------------|
| `--ng-progress-thickness`         | 2             |
| `--ng-progress-color`             | #1B95E0       |
| `--ng-progress-holder-color`      | transparent   |
| `--ng-progress-ease`              | linear        |
| `--ng-progress-spinner-thickness` | 2             |
| `--ng-progress-spinner-spacing`   | 15            |
| `--ng-progress-spinner-size`      | 18            |
| `--ng-progress-spinner-speed`     | 250ms         |


### CSS classes

| Class name                   | Description                                                                                   |
|------------------------------|:----------------------------------------------------------------------------------------------|
| **.ng-progress-bar**         | This class is applied to the host element of the progress bar.                                |
| **.ng-progress-bar-active**  | This class is applied to the host element when the progress bar is running.                   |
| **.ng-progress-bar-wrapper** | This class is applied to the overall wrapper element that wraps the bar and the spinner.      |
| **.ng-bar-placeholder**      | This class is applied to the direct wrapper of the progress bar.                              |
| **.ng-bar**                  | This class is applied to the actual bar element that translates when the progress increments. |
| **.ng-spinner**              | This class is applied to the spinner wrapper element.                                         |
| **.ng-spinner-icon**         | This class is applied to the spinner icon element.                                            |

