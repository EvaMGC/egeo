# Form list (Component)

   The form list component allows to create dynamically list of any item.

## Inputs

| Property    | Type    | Req   | Description                                      | Default |
| ----------- | ------- | ----- | ------------------------------------------------ | ------- |
| schema      | Any     | False | JSON schema of items                             | ''      |
| buttonLabel | String  | False | String displayed in the button to add more items | 'Add'   |
| disabled    | Boolean | False | Boolean to enable or disable form list           | 'false' |
| value       | Any[]   | False | Current list value                               | ''      |

## Example


```html
<st-form-list [schema]="jsonSchema"
      [(value)]="model">
</st-form-list>
```

