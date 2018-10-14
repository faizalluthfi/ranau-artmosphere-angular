import { Routes } from '@angular/router';

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
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { MaterialsListComponent } from './materials-list/materials-list.component';
import { NewMaterialComponent } from './new-material/new-material.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { SettingComponent } from './setting/setting.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DailyUsesListComponent } from './daily-uses-list/daily-uses-list.component';
import { DailyUseFormComponent } from './daily-use-form/daily-use-form.component';
import { BusinessReportComponent } from './business-report/business-report.component';
import { BackupAndRestoreComponent } from './backup-and-restore/backup-and-restore.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'transactions',
        pathMatch: 'full',
    },
    {
        path: 'backup-and-restore',
        component: BackupAndRestoreComponent
    },
    {
        path: 'report',
        component: BusinessReportComponent
    },
    {
        path: 'transactions/new',
        component: TransactionComponent
    },
    {
        path: 'transactions/:id',
        component: TransactionComponent
    },
    {
        path: 'transactions',
        component: TransactionsListComponent
    },
    {
        path: 'daily-expenses',
        component: DailyUsesListComponent,
        children: [
            {
                path: 'new',
                component: DailyUseFormComponent
            },
            {
                path: ':id',
                component: DailyUseFormComponent
            },
        ]
    },
    {
        path: 'categories',
        component: CategoriesListComponent,
        children: [
            {
                path: 'new',
                component: NewCategoryComponent
            },
            {
                path: ':id',
                component: EditCategoryComponent
            }
        ]
    },
    {
        path: 'materials',
        component: MaterialsListComponent,
        children: [
            {
                path: 'new',
                component: NewMaterialComponent
            },
            {
                path: ':id',
                component: EditMaterialComponent
            }
        ]
    },
    {
        path: 'settings',
        component: SettingComponent
    },
    {
        path: 'quit',
        component: QuitComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        component: UpgradeComponent
    }
]
