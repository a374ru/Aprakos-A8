'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ДОКУМЕНТАЦИЯ АПРАКОСЪ</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#additional-pages"'
                            : 'data-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>Маркированные объекты</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="link ">
                                        <a href="additional-documentation/начало.html" data-type="entity-link" data-context-id="additional">Начало</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/введение.html" data-type="entity-link" data-context-id="additional">Введение</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/настройка-проекта.html" data-type="entity-link" data-context-id="additional">Настройка проекта</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/установка-версий-angular.html" data-type="entity-link" data-context-id="additional">Установка версий Angular</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/маркировка.html" data-type="entity-link" data-context-id="additional">Маркировка</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/001.html" data-type="entity-link" data-context-id="additional">001</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/002.html" data-type="entity-link" data-context-id="additional">002</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/003.html" data-type="entity-link" data-context-id="additional">003</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/004.html" data-type="entity-link" data-context-id="additional">004</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/005.html" data-type="entity-link" data-context-id="additional">005</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/006.html" data-type="entity-link" data-context-id="additional">006</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/007.html" data-type="entity-link" data-context-id="additional">007</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/008.html" data-type="entity-link" data-context-id="additional">008</a>
                                    </li>
                                    <li class="link ">
                                        <a href="additional-documentation/009.html" data-type="entity-link" data-context-id="additional">009</a>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-b44007d25bbb7a4bac8562fb1025c8e0"' : 'data-target="#xs-components-links-module-AppModule-b44007d25bbb7a4bac8562fb1025c8e0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-b44007d25bbb7a4bac8562fb1025c8e0"' :
                                            'id="xs-components-links-module-AppModule-b44007d25bbb7a4bac8562fb1025c8e0"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ComponentTestingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComponentTestingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaskhaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaskhaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SedComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-b44007d25bbb7a4bac8562fb1025c8e0"' : 'data-target="#xs-injectables-links-module-AppModule-b44007d25bbb7a4bac8562fb1025c8e0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-b44007d25bbb7a4bac8562fb1025c8e0"' :
                                        'id="xs-injectables-links-module-AppModule-b44007d25bbb7a4bac8562fb1025c8e0"' }>
                                        <li class="link">
                                            <a href="injectables/DateService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DateService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LinksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LinksService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SedService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SedService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Easter.html" data-type="entity-link" >Easter</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});