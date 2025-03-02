import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../../../services/services';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';

@Component({
    selector: 'app-book-list',
    standalone: false,
    templateUrl: './book-list.component.html',
    styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

    bookResponse: PageResponseBookResponse = {};

    page: number = 0;
    size: number = 5;
    message: string = '';
    level: string = 'success';

    constructor(
        private bookService: BookService,
        private router: Router
    ) {

    }

    ngOnInit(): void {
        this.findAllBooks();
    }

    private findAllBooks() {
        this.bookService.findAllBooks({
            page: this.page,
            size: this.size
        }).subscribe({
            next: (books) => {
                this.bookResponse = books;
            }
        });
    }

    // #### PAGINATION ####
    goToFirstPage() {
        this.page = 0;
        this.findAllBooks();
    }

    goToPreviousPage() {
        this.page--;
        this.findAllBooks();
    }

    goToPage(pageNumber: number) {
        this.page = pageNumber;
        this.findAllBooks();
    }

    goToNextPage() {
        this.page++;
        this.findAllBooks();
    }

    goToLastPage() {
        this.page = this.bookResponse.totalPages as number - 1;
        this.findAllBooks();
    }

    get isLastPage(): boolean {
        return this.page == this.bookResponse.totalPages as number - 1;
    }
    // #### PAGINATION END ####

    // #### ACTION METHODS ####
    borrowBook(book: BookResponse) {
        this.message = '';

        this.bookService.borrowBook({
            'book-id': book.id as number
        }).subscribe({
            next: () => {
                this.level = 'success';
                this.message = 'Book successfully added to your list';
                // this.resetMessage();
            },
            error: (err) => {
                console.error(err);
                this.level = 'error';
                this.message = err.error.error;
            }
        })
    }

    resetMessage() {
        setTimeout(() => {
            this.message = '';
        }, 3000);
    }
    // #### ACTION METHODS END ####
}
