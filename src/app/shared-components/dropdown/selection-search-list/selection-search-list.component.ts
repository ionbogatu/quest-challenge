import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Subject, Subscription } from "rxjs";
import { OptionInterface } from "./types/option.interface";

@Component({
    selector: 'selection-search-list',
    templateUrl: './selection-search-list.component.html',
    styleUrls: ['./selection-search-list.component.scss']
})
export class SelectionSearchListComponent implements OnInit, OnDestroy {
    @Input('options')
    options: OptionInterface[] = [];

    @Input('isOpen')
    isOpen = false;

    @Input('multiple')
    multiple = false;

    @Output('selectionChanged')
    selectionChanged = new EventEmitter();

    @ViewChild('searchInputRef', {static: false}) searchInputRef;

    icons = {
        faSearch
    };

    optionAll = {
        visible: true,
        checked: false
    };

    search: {
        options: OptionInterface[]
    } = {
        options: []
    };

    private subscriptions: Subscription[] = [];

    ngOnInit() {
        // Delay execution
        setTimeout(() => {
            this.optionAll.checked = this.options.every((option) => option.checked);
        });

        // Clone array
        this.search.options = this.options.map(option => option);
    }

    ngOnDestroy() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    handleSearch() {
        const searchInputValue = this.searchInputRef.nativeElement.value;

        this.optionAll.visible = searchInputValue === '';

        this.search.options = this.options.filter((option) => option.value.includes(searchInputValue));
    }

    toggleAllOptions() {
        this.optionAll.checked = !this.optionAll.checked;

        for (const option of this.options) {
            option.checked = this.optionAll.checked;
        }

        this.selectionChanged.emit(true);
    }

    toggleOption(option: OptionInterface) {
        if (!this.multiple) {
            this.uncheckPreviousSelectedOption();
        }
        
        option.checked = !option.checked;

        if (this.optionAll.checked) {
            // Uncheck optionAll if at least one is unchecked
            if (!option.checked && this.optionAll.checked) {
                this.optionAll.checked = false;
            }
        } else if (!this.optionAll.checked) {
            // Check optionAll if all are checked
            const allOptionsChecked = this.options.every((option) => option.checked);
            
            if (allOptionsChecked) {
                this.optionAll.checked = true;
            }
        }

        this.selectionChanged.emit(true);
    }

    updateSelection() {
        if (this.optionAll.checked) {
            const allOptionsChecked = this.options.every((option) => option.checked);
            
            if (!allOptionsChecked) {
                this.optionAll.checked = false;
            }
        }
    }

    private uncheckPreviousSelectedOption() {
        const selectedOption = this.options.find((option) => option.checked);
        
        if (selectedOption) {
            selectedOption.checked = false;
        }
    }
}