import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Contact e2e test', () => {

    let navBarPage: NavBarPage;
    let contactDialogPage: ContactDialogPage;
    let contactComponentsPage: ContactComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Contacts', () => {
        navBarPage.goToEntity('contact');
        contactComponentsPage = new ContactComponentsPage();
        expect(contactComponentsPage.getTitle())
            .toMatch(/patientManegementTaskApp.contact.home.title/);

    });

    it('should load create Contact dialog', () => {
        contactComponentsPage.clickOnCreateButton();
        contactDialogPage = new ContactDialogPage();
        expect(contactDialogPage.getModalTitle())
            .toMatch(/patientManegementTaskApp.contact.home.createOrEditLabel/);
        contactDialogPage.close();
    });

    it('should create and save Contacts', () => {
        contactComponentsPage.clickOnCreateButton();
        contactDialogPage.setCellPhoneInput('cellPhone');
        expect(contactDialogPage.getCellPhoneInput()).toMatch('cellPhone');
        contactDialogPage.setEmailInput('email');
        expect(contactDialogPage.getEmailInput()).toMatch('email');
        contactDialogPage.setAlternativeCellNumberInput('alternativeCellNumber');
        expect(contactDialogPage.getAlternativeCellNumberInput()).toMatch('alternativeCellNumber');
        contactDialogPage.patientSelectLastOption();
        contactDialogPage.save();
        expect(contactDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ContactComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-contact div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ContactDialogPage {
    modalTitle = element(by.css('h4#myContactLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    cellPhoneInput = element(by.css('input#field_cellPhone'));
    emailInput = element(by.css('input#field_email'));
    alternativeCellNumberInput = element(by.css('input#field_alternativeCellNumber'));
    patientSelect = element(by.css('select#field_patient'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCellPhoneInput = function(cellPhone) {
        this.cellPhoneInput.sendKeys(cellPhone);
    };

    getCellPhoneInput = function() {
        return this.cellPhoneInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    setAlternativeCellNumberInput = function(alternativeCellNumber) {
        this.alternativeCellNumberInput.sendKeys(alternativeCellNumber);
    };

    getAlternativeCellNumberInput = function() {
        return this.alternativeCellNumberInput.getAttribute('value');
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
