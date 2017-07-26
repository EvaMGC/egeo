# Tree (Component)

   The tree is a component for representing information in a hierarchical way.It allows navigating between the different nodes and visualizing the parent-child relationships between nodes.Up to 5 depth levels can be displayed at a time. To avoid a horizontal scroll,from the 5th level will be collapsing previous levels, starting with the first parent.

## Inputs

| Property                 | Type                               | Required | Description                                                                                                                                                  |
| ------------------------ | ---------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| qaTag                    | String                             | False    | Id value for qa test, default: ''                                                                                                                            |
| tree                     | StNodeTree                         | True     | Tree root node                                                                                                                                               |
| maxLevel                 | Number                             | False    | Max level to show. From this level the tree does not expand more                                                                                             |
| isRoot                   | Boolean                            | False    | TRUE: the first node is root and not show dots, FALSE: the first node is not root andwe put three dots to indicate that are more levels upper, default: true |
| expandFatherBranch       | Boolean                            | False    | TRUE: Expand the path from the root to the expanded node if any node is not expanded.FALSE: Only expand the selected node, default: true                     |
| collapseChildsBranch     | Boolean                            | False    | TRUE: Collapse all child nodes. FALSE: Only collapse the selected node, default: true                                                                        |
| changeStreamNotification | Observable&lt;StNodeTreeChange&gt; | False    | Stream for notificating changes in some node and not change all tree                                                                                         |

## Outputs

| Property         | Type             | Required | Description                                                                          |
| ---------------- | ---------------- | -------- | ------------------------------------------------------------------------------------ |
| toogleNode       | StNodeTreeChange | False    | Notify any node expansion or collapsed                                               |
| selectNode       | StNodeTreeChange | False    | Notify any node selection                                                            |
| navigatePrevious | Event            | False    | Notify click over three dots to indicate that user wants to go up in tree structrure |

## Example
```
<st-tree [tree]="treeA" [maxLevel]="treeModel.max" [isRoot]="true" (toogleNode)="onToogleNode($event, treeA)" (selectNode)="onSelectNode($event, treeA)" (navigatePrevious)="onNavigatePrevious($event)" [changeStreamNotification]="notificationChangeStream">
</st-tree>
```
