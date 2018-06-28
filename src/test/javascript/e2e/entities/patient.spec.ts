import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Patient e2e test', () => {

    let navBarPage: NavBarPage;
    let patientDialogPage: PatientDialogPage;
    let patientComponentsPage: PatientComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Patients', () => {
        navBarPage.goToEntity('patient');
        patientComponentsPage = new PatientComponentsPage();
        expect(patientComponentsPage.getTitle())
            .toMatch(/patientManegementTaskApp.patient.home.title/);

    });

    it('should load create Patient dialog', () => {
        patientComponentsPage.clickOnCreateButton();
        patientDialogPage = new PatientDialogPage();
        expect(patientDialogPage.getModalTitle())
            .toMatch(/patientManegementTaskApp.patient.home.createOrEditLabel/);
        patientDialogPage.close();
    });

    it('should create and save Patients', () => {
        patientComponentsPage.clickOnCreateButton();
        patientDialogPage.setSurnameInput('surname');
        expect(patientDialogPage.getSurnameInput()).toMatch('surname');
        patientDialogPage.setOtherNamesInput('otherNames');
        expect(patientDialogPage.getOtherNamesInput()).toMatch('otherNames');
        patientDialogPage.setDateOfBirthInput('2000-12-31');
        expect(patientDialogPage.getDateOfBirthInput()).toMatch('2000-12-31');
        patientDialogPage.setCountyInput('county');
        expect(patientDialogPage.getCountyInput()).toMatch('county');
        patientDialogPage.setSubcountyInput('subcounty');
        expect(patientDialogPage.getSubcountyInput()).toMatch('subcounty');
        patientDialogPage.setWardInput('ward');
        expect(patientDialogPage.getWardInput()).toMatch('ward');
        patientDialogPage.setVillageInput('village');
        expect(patientDialogPage.getVillageInput()).toMatch('village');
        patientDialogPage.getIsDeletedInput().isSelected().then((selected) => {
            if (selected) {
                patientDialogPage.getIsDeletedInput().click();
                expect(patientDialogPage.getIsDeletedInput().isSelected()).toBeFalsy();
            } else {
                patientDialogPage.getIsDeletedInput().click();
                expect(patientDialogPage.getIsDeletedInput().isSelected()).toBeTruthy();
            }
        });
        patientDialogPage.nextOfKinSelectLastOption();
        patientDialogPage.save();
        expect(patientDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PatientComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-patient div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PatientDialogPage {
    modalTitle = element(by.css('h4#myPatientLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    surnameInput = element(by.css('input#field_surname'));
    otherNamesInput = element(by.css('input#field_otherNames'));
    dateOfBirthInput = element(by.css('input#field_dateOfBirth'));
    countyInput = element(by.css('input#field_county'));
    subcountyInput = element(by.css('input#field_subcounty'));
    wardInput = element(by.css('input#field_ward'));
    villageInput = element(by.css('input#field_village'));
    isDeletedInput = element(by.css('input#field_isDeleted'));
    nextOfKinSelect = element(by.css('select#field_nextOfKin'));

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

    setDateOfBirthInput = function(dateOfBirth) {
        this.dateOfBirthInput.sendKeys(dateOfBirth);
    };

    getDateOfBirthInput = function() {
        return this.dateOfBirthInput.getAttribute('value');
    };

    setCountyInput = function(county) {
        this.countyInput.sendKeys(county);
    };

    getCountyInput = function() {
        return this.countyInput.getAttribute('value');
    };

    setSubcountyInput = function(subcounty) {
        this.subcountyInput.sendKeys(subcounty);
    };

    getSubcountyInput = function() {
        return this.subcountyInput.getAttribute('value');
    };

    setWardInput = function(ward) {
        this.wardInput.sendKeys(ward);
    };

    getWardInput = function() {
        return this.wardInput.getAttribute('value');
    };

    setVillageInput = function(village) {
        this.villageInput.sendKeys(village);
    };

    getVillageInput = function() {
        return this.villageInput.getAttribute('value');
    };

    getIsDeletedInput = function() {
        return this.isDeletedInput;
    };
    nextOfKinSelectLastOption = function() {
        this.nextOfKinSelect.all(by.tagName('option')).last().click();
    };

    nextOfKinSelectOption = function(option) {
        this.nextOfKinSelect.sendKeys(option);
    };

    getNextOfKinSelect = function() {
        return this.nextOfKinSelect;
    };

    getNextOfKinSelectedOption = function() {
        return this.nextOfKinSelect.element(by.css('option:checked')).getText();
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
