import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DropdownComponent } from "./dropdown.component";
import { ChipComponent } from "./chip/chip.component";
import { SelectionSearchListComponent } from "./selection-search-list/selection-search-list.component";

@NgModule({
    declarations: [
        DropdownComponent,
        ChipComponent,
        SelectionSearchListComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
    ],
    exports: [
        DropdownComponent
    ]
})
export class DropdownModule {}