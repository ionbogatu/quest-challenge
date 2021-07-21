import { Component, EventEmitter, Output } from "@angular/core";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'chip',
    templateUrl: './chip.component.html',
    styleUrls: ['./chip.component.scss']
})
export class ChipComponent {
    icons = {
        faTimes
    }

    @Output()
    remove = new EventEmitter<boolean>();
}