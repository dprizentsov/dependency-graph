import { Component, Input } from '@angular/core';
import { Node } from '../../../d3';

@Component({
  selector: '[nodeVisual]',
  // <svg:circle
  //     class="node"
  //     [attr.fill]="node.color"
  //     cx="0"
  //     cy="0"
  //     [attr.r]="node.r">
  // </svg:circle>
  template: `
  <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:text
          class="node-name"
          
          [attr.font-size]="node.fontSize">
        {{node.name}}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
}
