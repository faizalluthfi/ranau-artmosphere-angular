import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { QuitComponent } from './shared/quit/quit.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ServicesInputsComponent } from './services-inputs/services-inputs.component';
import { NewMaterialComponent } from './new-material/new-material.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { MaterialsListComponent } from './materials-list/materials-list.component';
import { SettingComponent } from './setting/setting.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionComponent } from './transaction/transaction.component';
import { PaddingPipe } from './pipes/padding.pipe';
import { TransactionNoteComponent } from './transaction-note/transaction-note.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    QuitComponent,
    CategoriesListComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    ServicesInputsComponent,
    NewMaterialComponent,
    EditMaterialComponent,
    MaterialsListComponent,
    SettingComponent,
    TransactionsListComponent,
    TransactionComponent,
    PaddingPipe,
    TransactionNoteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
