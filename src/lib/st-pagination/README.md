# Table (Component)

   The pagination component has been designed to allow content to be displayed per pages. This informs user about thenumber of the current page, the items displayed per page and the total of items. Moreover, when there are a lot ofitems, it allows user to customize the number of items displayed per page.

## Inputs

| Property       | Type              | Req   | Description                                                                                          | Default                                                                                                         |
| -------------- | ----------------- | ----- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| currentPage    | Number            | False | Number of the current page                                                                           | 1                                                                                                               |
| perPage        | Number            | False | The maximum number of items displayed per page                                                       | 20                                                                                                              |
| total          | Number            | False | Total of items                                                                                       | ''                                                                                                              |
| label          | PaginateTexts     | False | Translated texts displayed at the pagination                                                         | {element: 'Rows', perPage: 'per page', of: 'of'}                                                                |
| perPageOptions | PaginateOptions[] | False | List of options displayed at a selector where user can change the number of items displayed per page | Array( Object( value: 20, showFrom: 0 ),Object( value: 50, showFrom: 50 ), Object( value: 200, showFrom: 200 )) |

## Outputs

| Property | Type     | Description                                                                                                                                          |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| change   | Paginate | Event emitted when user interacts with some of the elements in the pagination.This sends the new pagination status (current page and items per page) |

## Example


```html
<div class="pagination">
    <st-pagination [total]="items.length"
          [perPage]="perPage"
          [currentPage]="page"
          [id]="'pagination-demo'"
          (change)="onChangePage($event)">
    </st-pagination>
</div>
```

