import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { NextOfKin } from './next-of-kin.model';
import { NextOfKinService } from './next-of-kin.service';

@Injectable()
export class NextOfKinPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private nextOfKinService: NextOfKinService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.nextOfKinService.find(id)
                    .subscribe((nextOfKinResponse: HttpResponse<NextOfKin>) => {
                        const nextOfKin: NextOfKin = nextOfKinResponse.body;
                        this.ngbModalRef = this.nextOfKinModalRef(component, nextOfKin);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.nextOfKinModalRef(component, new NextOfKin());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    nextOfKinModalRef(component: Component, nextOfKin: NextOfKin): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.nextOfKin = nextOfKin;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
