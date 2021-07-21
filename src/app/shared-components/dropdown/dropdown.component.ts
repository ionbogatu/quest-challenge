import { ChangeDetectorRef, Component, Input, ViewChild } from "@angular/core";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { SelectionSearchListComponent } from "./selection-search-list/selection-search-list.component";
import { OptionInterface } from "./selection-search-list/types/option.interface";

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
    @Input('placeholder') placeholder;

    @Input('options') options = [];

    @Input('multiple') multiple = false;

    @ViewChild('dropdownListRef', {static: true}) dropdownListRef;

    @ViewChild(SelectionSearchListComponent, {static: true}) selectionSearchList

    icons = {
        faChevronDown
    };

    isDropdownOpen: boolean = true;

    selectedOptions: OptionInterface[] = [];

    constructor(
        private cdRef: ChangeDetectorRef
    ) {
    }

    removeChip(index: number) {
        this.updateSelectionList(this.selectedOptions[index]);
        this.selectedOptions.splice(index, 1);
        this.cdRef.detectChanges();
        this.setTopPosition();
    }

    toggleDropdown($event) {
        // Toggle dropdown on if clicked on top part
        if ($event.target.closest('.dropdown-top')) {

            // In case the chip was clicked, prevent toggle
            if ($event.target.closest('.chip-wrapper')) {
                return ;
            }

            this.isDropdownOpen = !this.isDropdownOpen;
        
            this.setTopPosition();
        }
    }

    handleSelectionChanged() {
        this.selectedOptions = this.options.filter((option) => option.checked);
        this.cdRef.detectChanges();
        this.setTopPosition();
    }

    private setTopPosition() {
        if (this.isDropdownOpen) {
            const borderRadius = 4;

            this.dropdownListRef.nativeElement.style.top =
                (this.dropdownListRef.nativeElement.parentElement.offsetHeight - borderRadius) + "px";
        }
    }

    private updateSelectionList(option: OptionInterface) {
        this.selectionSearchList.toggleOption(option);
        this.selectionSearchList.updateSelection();
    }
}