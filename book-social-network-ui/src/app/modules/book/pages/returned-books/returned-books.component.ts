import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';

@Component({
    selector: 'app-returned-books',
    standalone: false,
    templateUrl: './returned-books.component.html',
    styleUrl: './returned-books.component.scss'
})
export class ReturnedBooksComponent implements OnInit {

    page = 0;
    size = 5;
    returnedBooks: PageResponseBorrowedBookResponse = {};
    message: string = '';
    level: string = 'success';

    constructor(
        private bookService: BookService
    ) {

    }

    ngOnInit(): void {
        this.findAllReturnedBooks();
    }

    private findAllReturnedBooks() {
        this.bookService.findALlReturnedBooks({
            page: this.page,
            size: this.size
        }).subscribe({
            next: (resp) => {
                this.returnedBooks = resp;
            }
        })
    }

    // #### PAGINATION ####
    goToFirstPage() {
        this.page = 0;
        this.findAllReturnedBooks();
    }

    goToPreviousPage() {
        this.page--;
        this.findAllReturnedBooks();
    }

    goToPage(pageNumber: number) {
        this.page = pageNumber;
        this.findAllReturnedBooks();
    }

    goToNextPage() {
        this.page++;
        this.findAllReturnedBooks();
    }

    goToLastPage() {
        this.page = this.returnedBooks.totalPages as number - 1;
        this.findAllReturnedBooks();
    }

    get isLastPage(): boolean {
        return this.page == this.returnedBooks.totalPages as number - 1;
    }
    // #### PAGINATION END ####

    // #### ACTION METHODS ####
    approveBookReturn(book: BorrowedBookResponse) {
        if (!book.returned) {
            this.level = 'error';
            this.message = 'The book is not yet returned';
            return;
        }

        this.bookService.approveReturnBorrowedBook({
            'book-id': book.id as number
        }).subscribe({
            next: () => {
                this.level = 'success';
                this.message = 'Book return approved';
                this.findAllReturnedBooks();
            }, error: (err) => {
                console.error(err);
                this.level = 'error';
                this.message = err.error.error;
            }
        })
    }
    // #### ACTION METHODS END ####
}
