import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('NextOfKin e2e test', () => {

    let navBarPage: NavBarPage;
    let nextOfKinDialogPage: NextOfKinDialogPage;
    let nextOfKinComponentsPage: NextOfKinComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load NextOfKins', () => {
        navBarPage.goToEntity('next-of-kin');
        nextOfKinComponentsPage = new NextOfKinComponentsPage();
        expect(nextOfKinComponentsPage.getTitle())
            .toMatch(/patientManegementTaskApp.nextOfKin.home.title/);

    });

    it('should load create NextOfKin dialog', () => {
        nextOfKinComponentsPage.clickOnCreateButton();
        nextOfKinDialogPage = new NextOfKinDialogPage();
        expect(nextOfKinDialogPage.getModalTitle())
            .toMatch(/patientManegementTaskApp.nextOfKin.home.createOrEditLabel/);
        nextOfKinDialogPage.close();
    });

    it('should create and save NextOfKins', () => {
        nextOfKinComponentsPage.clickOnCreateButton();
        nextOfKinDialogPage.setSurnameInput('surname');
        expect(nextOfKinDialogPage.getSurnameInput()).toMatch('surname');
        nextOfKinDialogPage.setOtherNamesInput('otherNames');
        expect(nextOfKinDialogPage.getOtherNamesInput()).toMatch('otherNames');
        nextOfKinDialogPage.setIdNumberInput('idNumber');
        expect(nextOfKinDialogPage.getIdNumberInput()).toMatch('idNumber');
        nextOfKinDialogPage.save();
        expect(nextOfKinDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class NextOfKinComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-next-of-kin div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class NextOfKinDialogPage {
    modalTitle = element(by.css('h4#myNextOfKinLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    surnameInput = element(by.css('input#field_surname'));
    otherNamesInput = element(by.css('input#field_otherNames'));
    idNumberInput = element(by.css('input#field_idNumber'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSurnameInput = function(surname) {
        this.surnameInput.sendKeys(surname);
    };

    getSurnameInput = function() {
        return this.surnameInput.getAttribute('value');
    };

    setOtherNamesInput = function(otherNames) {
        this.otherNamesInput.sendKeys(otherNames);
    };

    getOtherNamesInput = function() {
        return this.otherNamesInput.getAttribute('value');
    };

    setIdNumberInput = function(idNumber) {
        this.idNumberInput.sendKeys(idNumber);
    };

    getIdNumberInput = function() {
        return this.idNumberInput.getAttribute('value');
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
