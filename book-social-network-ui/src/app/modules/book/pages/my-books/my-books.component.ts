import { Component, OnInit } from '@angular/core';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-books',
    standalone: false,
    templateUrl: './my-books.component.html',
    styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit {
    bookResponse: PageResponseBookResponse = {};

    page: number = 0;
    size: number = 5;

    constructor(
        private bookService: BookService,
        private router: Router
    ) {

    }

    ngOnInit(): void {
        this.findAllBooks();
    }

    private findAllBooks() {
        this.bookService.findAllByBooksByOwner({
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
    editBook(book: BookResponse) {
        this.router.navigate(['books', 'manage', book.id]);
    }

    shareBook(book: BookResponse) {
        this.bookService.updateShareableStatus({
            "book-id": book.id as number
        }).subscribe({
            next: () => {
                book.shareable = !book.shareable;
            }
        });
    }

    archiveBook(book: BookResponse) {
        this.bookService.updateArchivedStatus({
            "book-id": book.id as number
        }).subscribe({
            next: () => {
                book.archived = !book.archived;

                if (book.archived && book.shareable) {
                    book.shareable = false;
                }
            }
        })
    }
    // #### ACTION METHODS END ####
}
