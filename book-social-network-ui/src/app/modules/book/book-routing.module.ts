import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { ManageBookComponent } from './pages/manage-book/manage-book.component';
import { BorrowedBooksComponent } from './pages/borrowed-books/borrowed-books.component';
import { ReturnedBooksComponent } from './pages/returned-books/returned-books.component';
import { authGuard } from '../../services/guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: BookListComponent,
                canActivate: [authGuard]
            },
            {
                path: 'my-books',
                component: MyBooksComponent,
                canActivate: [authGuard]
            },
            {
                path: 'manage',
                component: ManageBookComponent,
                canActivate: [authGuard]
            },
            {
                path: 'manage/:bookId',
                component: ManageBookComponent,
                canActivate: [authGuard]
            },
            {
                path: 'borrowed-books',
                component: BorrowedBooksComponent,
                canActivate: [authGuard]
            },
            {
                path: 'my-returned-books',
                component: ReturnedBooksComponent,
                canActivate: [authGuard]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BookRoutingModule { }
