# StBubbleLabel (Component)

   This component displays a bubble below a content if its width is longer than container

## Inputs

| Property   | Type    | Req   | Description                                                | Default |
| ---------- | ------- | ----- | ---------------------------------------------------------- | ------- |
| text       | String  | False | Text of the bubble                                         |         |
| minWidth   | String  | False | min width for bubble                                       |         |
| maxWidth   | String  | False | max width for bubble                                       |         |
| openToLeft | Boolean | False | when true, bubble is displayed with the arrow to the right | true    |

## Example


```html
<st-bubble-label [qaTag]="qaTag"
      [text]="text"
      [hidden]="hidden">
</st-bubble-label>
```

