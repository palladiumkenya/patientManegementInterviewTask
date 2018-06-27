import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Enrollment e2e test', () => {

    let navBarPage: NavBarPage;
    let enrollmentDialogPage: EnrollmentDialogPage;
    let enrollmentComponentsPage: EnrollmentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Enrollments', () => {
        navBarPage.goToEntity('enrollment');
        enrollmentComponentsPage = new EnrollmentComponentsPage();
        expect(enrollmentComponentsPage.getTitle())
            .toMatch(/patientManegementTaskApp.enrollment.home.title/);

    });

    it('should load create Enrollment dialog', () => {
        enrollmentComponentsPage.clickOnCreateButton();
        enrollmentDialogPage = new EnrollmentDialogPage();
        expect(enrollmentDialogPage.getModalTitle())
            .toMatch(/patientManegementTaskApp.enrollment.home.createOrEditLabel/);
        enrollmentDialogPage.close();
    });

    it('should create and save Enrollments', () => {
        enrollmentComponentsPage.clickOnCreateButton();
        enrollmentDialogPage.setEnrollmentDateInput('2000-12-31');
        expect(enrollmentDialogPage.getEnrollmentDateInput()).toMatch('2000-12-31');
        enrollmentDialogPage.setEnrollmentNumberInput('enrollmentNumber');
        expect(enrollmentDialogPage.getEnrollmentNumberInput()).toMatch('enrollmentNumber');
        enrollmentDialogPage.patientSelectLastOption();
        enrollmentDialogPage.save();
        expect(enrollmentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EnrollmentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-enrollment div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EnrollmentDialogPage {
    modalTitle = element(by.css('h4#myEnrollmentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    enrollmentDateInput = element(by.css('input#field_enrollmentDate'));
    enrollmentNumberInput = element(by.css('input#field_enrollmentNumber'));
    patientSelect = element(by.css('select#field_patient'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setEnrollmentDateInput = function(enrollmentDate) {
        this.enrollmentDateInput.sendKeys(enrollmentDate);
    };

    getEnrollmentDateInput = function() {
        return this.enrollmentDateInput.getAttribute('value');
    };

    setEnrollmentNumberInput = function(enrollmentNumber) {
        this.enrollmentNumberInput.sendKeys(enrollmentNumber);
    };

    getEnrollmentNumberInput = function() {
        return this.enrollmentNumberInput.getAttribute('value');
    };

    patientSelectLastOption = function() {
        this.patientSelect.all(by.tagName('option')).last().click();
    };

    patientSelectOption = function(option) {
        this.patientSelect.sendKeys(option);
    };

    getPatientSelect = function() {
        return this.patientSelect;
    };

    getPatientSelectedOption = function() {
        return this.patientSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
