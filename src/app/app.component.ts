import { Component } from '@angular/core';
import { OptionInterface } from './shared-components/dropdown/selection-search-list/types/option.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options1: OptionInterface[] = [
    {
      value: 'CV Pro CV',
      checked: false,
    }, {
      value: 'CV Pro A1',
      checked: false,
    }, {
      value: 'ELV 2',
      checked: false,
    }
  ];

  options2: OptionInterface[] = [
    {
      value: 'CV Pro CV',
      checked: false,
    }, {
      value: 'CV Pro A1',
      checked: false,
    }, {
      value: 'ELV 2',
      checked: false,
    }
  ];
}
