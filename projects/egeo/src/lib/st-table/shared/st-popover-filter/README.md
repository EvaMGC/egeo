# Popover Filter (Component)

   The popover filter component allows user to filter table data according to column values

## Inputs

| Property              | Type          | Req   | Description                                                 | Default   |
| --------------------- | ------------- | ----- | ----------------------------------------------------------- | --------- |
| field                 | StTableHeader | False | field displayed in the header                               | ''        |
| index                 | Number        | False | index of field displayed in the header                      | ''        |
| templateContentFilter | TemplateRef   | False | Reference to paint a custom template inside popover content | undefined |
| hidden                | Boolean       | False | field to show popover                                       | ''        |

## Outputs

| Property | Type | Description                                                                     |
| -------- | ---- | ------------------------------------------------------------------------------- |
| filter   |      | Event emitted  when user interacts with filter button without a custom template |
| close    |      | Event emitted when menu has to be closed                                        |

