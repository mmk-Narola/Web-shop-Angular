import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();

  categories: Array<string> | undefined;
  categoriesSubscription: Subscription | undefined;

  constructor(private storeServie: StoreService) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.storeServie
      .getAllCaterogires()
      .subscribe((response) => {
        this.categories = response;
        this.categories.push("AllCategory");
      });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
