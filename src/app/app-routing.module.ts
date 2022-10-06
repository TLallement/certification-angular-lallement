import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockSentimentComponent } from './features/stock-sentiment/stock-sentiment.component';
import { StockTrackerComponent } from './features/stock-tracker/stock-tracker.component';

const APP_ROUTES: Routes = [
  { path: '', component: StockTrackerComponent },
  { path: 'sentiment/:symbol', component: StockSentimentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
