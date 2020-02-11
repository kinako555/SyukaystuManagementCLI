import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectionsComponent } from './components/selections/selections.component';

const routes: Routes = [
	{ path: '', redirectTo: '/selections', pathMatch: 'full' },
	{ path: 'selections', component: SelectionsComponent }

];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
