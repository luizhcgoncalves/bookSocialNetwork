import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, FeedbackRequest, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService, FeedbackService } from '../../../../services/services';

@Component({
    selector: 'app-borrowed-books',
    standalone: false,
    templateUrl: './borrowed-books.component.html',
    styleUrl: './borrowed-books.component.scss'
})
export class BorrowedBooksComponent implements OnInit {

    borrowedBooks: PageResponseBorrowedBookResponse = {};
    selectedBook: BorrowedBookResponse | undefined = undefined;
    feedbackRequest: FeedbackRequest = {
        bookId: 0,
        comment: '',
        note: 0
    };
    page: number = 0;
    size: number = 5;

    constructor(
        private bookService: BookService,
        private feedbackService: FeedbackService
    ) {

    }

    ngOnInit(): void {
        this.findAllBorrowedBooks();
    }

    private findAllBorrowedBooks() {
        this.bookService.findAllBorrowedBooks({
            page: this.page,
            size: this.size
        }).subscribe({
            next: (resp) => {
                this.borrowedBooks = resp
            }
        });
    }

    // #### PAGINATION ####
    goToFirstPage() {
        this.page = 0;
        this.findAllBorrowedBooks();
    }

    goToPreviousPage() {
        this.page--;
        this.findAllBorrowedBooks();
    }

    goToPage(pageNumber: number) {
        this.page = pageNumber;
        this.findAllBorrowedBooks();
    }

    goToNextPage() {
        this.page++;
        this.findAllBorrowedBooks();
    }

    goToLastPage() {
        this.page = this.borrowedBooks.totalPages as number - 1;
        this.findAllBorrowedBooks();
    }

    get isLastPage(): boolean {
        return this.page == this.borrowedBooks.totalPages as number - 1;
    }
    // #### PAGINATION END ####

    // #### ACTION METHODS ####
    returnBorrowedBook(book: BorrowedBookResponse) {
        this.selectedBook = book;
        this.feedbackRequest.bookId = book.id as number;
    }

    returnBook(hasFeedback: boolean) {
        this.bookService.returnBorrowedBook({
            'book-id': this.selectedBook?.id as number,
        }).subscribe({
            next: () => {
                if (hasFeedback) {
                    this.giveFeedback();
                }
                this.selectedBook = undefined;
                this.feedbackRequest = {
                    bookId: 0,
                    comment: '',
                    note: 0
                };
                this.findAllBorrowedBooks();
            }
        })
    }

    private giveFeedback() {
        this.feedbackService.saveFeedback({
            body: this.feedbackRequest
        }).subscribe({
            next: () => { /* Subscription mandatory :) */ }
        })
    }
    // #### ACTION METHODS END ####
}
