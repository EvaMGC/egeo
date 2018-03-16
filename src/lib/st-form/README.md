# Dynamic form (Component)

   The form component allows to generate forms dynamically using a JSON schema.

## Inputs

| Property   | Type   | Req   | Description                                             | Default |
| ---------- | ------ | ----- | ------------------------------------------------------- | ------- |
| schema     | Any    | False | JSON schema needed to generate the form                 |         |
| parentName | String | False | Name of the parent section. By default, it is undefined |         |

## Outputs

| Property    | Type | Description                                                            |
| ----------- | ---- | ---------------------------------------------------------------------- |
| valueChange | Any  | Event emitted when value is changed. This emits the current form value |

## Example


```html
<st-form [schema]="jsonSchema"
      [(ngModel)]="model"
      #formModel="ngModel">
</st-form>
```

