import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ChangeSet e2e test', () => {

    let navBarPage: NavBarPage;
    let changeSetDialogPage: ChangeSetDialogPage;
    let changeSetComponentsPage: ChangeSetComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ChangeSets', () => {
        navBarPage.goToEntity('change-set');
        changeSetComponentsPage = new ChangeSetComponentsPage();
        expect(changeSetComponentsPage.getTitle())
            .toMatch(/patientManegementTaskApp.changeSet.home.title/);

    });

    it('should load create ChangeSet dialog', () => {
        changeSetComponentsPage.clickOnCreateButton();
        changeSetDialogPage = new ChangeSetDialogPage();
        expect(changeSetDialogPage.getModalTitle())
            .toMatch(/patientManegementTaskApp.changeSet.home.createOrEditLabel/);
        changeSetDialogPage.close();
    });

    it('should create and save ChangeSets', () => {
        changeSetComponentsPage.clickOnCreateButton();
        changeSetDialogPage.setTableNameInput('tableName');
        expect(changeSetDialogPage.getTableNameInput()).toMatch('tableName');
        changeSetDialogPage.setOperationInput('operation');
        expect(changeSetDialogPage.getOperationInput()).toMatch('operation');
        changeSetDialogPage.setColumnNameInput('columnName');
        expect(changeSetDialogPage.getColumnNameInput()).toMatch('columnName');
        changeSetDialogPage.setEntityInput('5');
        expect(changeSetDialogPage.getEntityInput()).toMatch('5');
        changeSetDialogPage.setUserInput('5');
        expect(changeSetDialogPage.getUserInput()).toMatch('5');
        changeSetDialogPage.setOldValueInput('oldValue');
        expect(changeSetDialogPage.getOldValueInput()).toMatch('oldValue');
        changeSetDialogPage.setNewValueInput('newValue');
        expect(changeSetDialogPage.getNewValueInput()).toMatch('newValue');
        changeSetDialogPage.save();
        expect(changeSetDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ChangeSetComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-change-set div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ChangeSetDialogPage {
    modalTitle = element(by.css('h4#myChangeSetLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    tableNameInput = element(by.css('input#field_tableName'));
    operationInput = element(by.css('input#field_operation'));
    columnNameInput = element(by.css('input#field_columnName'));
    entityInput = element(by.css('input#field_entity'));
    userInput = element(by.css('input#field_user'));
    oldValueInput = element(by.css('input#field_oldValue'));
    newValueInput = element(by.css('input#field_newValue'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTableNameInput = function(tableName) {
        this.tableNameInput.sendKeys(tableName);
    };

    getTableNameInput = function() {
        return this.tableNameInput.getAttribute('value');
    };

    setOperationInput = function(operation) {
        this.operationInput.sendKeys(operation);
    };

    getOperationInput = function() {
        return this.operationInput.getAttribute('value');
    };

    setColumnNameInput = function(columnName) {
        this.columnNameInput.sendKeys(columnName);
    };

    getColumnNameInput = function() {
        return this.columnNameInput.getAttribute('value');
    };

    setEntityInput = function(entity) {
        this.entityInput.sendKeys(entity);
    };

    getEntityInput = function() {
        return this.entityInput.getAttribute('value');
    };

    setUserInput = function(user) {
        this.userInput.sendKeys(user);
    };

    getUserInput = function() {
        return this.userInput.getAttribute('value');
    };

    setOldValueInput = function(oldValue) {
        this.oldValueInput.sendKeys(oldValue);
    };

    getOldValueInput = function() {
        return this.oldValueInput.getAttribute('value');
    };

    setNewValueInput = function(newValue) {
        this.newValueInput.sendKeys(newValue);
    };

    getNewValueInput = function() {
        return this.newValueInput.getAttribute('value');
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
