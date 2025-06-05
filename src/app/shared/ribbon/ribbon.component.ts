import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, Type, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-ribbon',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ribbon.component.html',
    styleUrl: './ribbon.component.css'
})
export class RibbonComponent implements OnInit {
    @ViewChild('ribbonContainer', { read: ViewContainerRef, static: true })
    private containerRef!: ViewContainerRef;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngOnInit() {
        // Subscribe to route changes
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            // Get the current route data
            this.route.firstChild?.data.subscribe(data => {
                const ribbonName = data['ribbon'] + "Component";
                debugger;
                if (ribbonName) {
                    this.loadRibbonComponent(ribbonName);
                }
            });
        });

        // Initial load
        this.route.firstChild?.data.subscribe(data => {
            const ribbonName = data['ribbon'] + "Component";
            if (ribbonName) {
                this.loadRibbonComponent(ribbonName);
            }
        });
    }

    private async loadRibbonComponent(ribbonName: string) {
        try {
            switch (ribbonName) {

                case "RibbonDashboardComponent":
                    this.loadDashboardribbon();
                    break;
                case "RibbonScanComponent":
                    this.loadScanribbon();
                    break;
                case "RibbonScanExceptionComponent":
                    this.loadScanExceptionribbon();
                    break;
                case "RibbonQaScanComponent":
                    this.loadQaScanribbon();
                    break;
                case "RibbonIndexComponent":
                    this.loadIndexRibbon();
                    break;
                case "RibbonQaIndexComponent":
                    this.loadQaIndexRibbon();
                    break;
                case "RibbonReleaseComponent":
                    this.loadReleaseRibbon();
                    break;
                case "RibbonBatchControlComponent":
                    this.loadBatchControlribbon();
                    break;
                case "RibbonSupervisionComponent":
                    this.loadSupervisionRibbon();
                    break;
                case "RibbonProjectComponent":
                    this.loadProject();
                    break;
                case "RibbonConfigurationComponent":
                    this.loadConfigurationRibbon();
                    break
            }

        } catch (error) {
            console.error(`Error loading ribbon component ${ribbonName}:`, error);
        }
    }


    loadDashboardribbon = async () => {
        this.containerRef.clear();
        const x = await import(`./ribbon-dashboard/ribbon-dashboard.component`).then(c => c.RibbonDashboardComponent)
        const componentRef = this.containerRef.createComponent(x);
    }

    loadScanribbon = async () => {
        this.containerRef.clear();
        const x = await import(`./ribbon-scan/ribbon-scan.component`).then(c => c.RibbonScanComponent)
        const componentRef = this.containerRef.createComponent(x);
    }

    loadScanExceptionribbon = async () => {
        this.containerRef.clear();
        const x = await import(`./ribbon-scan-exception/ribbon-scan-exception.component`).then(c => c.RibbonScanExceptionComponent)
        const componentRef = this.containerRef.createComponent(x);
    }

    loadQaScanribbon = async () => {
        this.containerRef.clear();
        const x = await import(`./ribbon-qa-scan/ribbon-qa-scan.component`).then(c => c.RibbonQaScanComponent)
        const componentRef = this.containerRef.createComponent(x);
    }

    loadIndexRibbon = async () => {
        this.containerRef.clear();
        const x = await import(`./ribbon-index/ribbon-index.component`).then(c => c.RibbonIndexComponent)
        const componentRef = this.containerRef.createComponent(x);
    }

    loadQaIndexRibbon = async () => {
        this.containerRef.clear();
        const x = await import(`./ribbon-qa-index/ribbon-qa-index.component`).then(c => c.RibbonQaIndexComponent)
        const componentRef = this.containerRef.createComponent(x);
    }

    loadReleaseRibbon = async () => {
        this.containerRef.clear();
        const x = await import(`./ribbon-release/ribbon-release.component`).then(c => c.RibbonReleaseComponent)
        const componentRef = this.containerRef.createComponent(x);
    }

    loadSupervisionRibbon = async () => {
        this.containerRef.clear();
        const x = await import(`./ribbon-supervision/ribbon-supervision.component`).then(c => c.RibbonSupervisionComponent)
        const componentRef = this.containerRef.createComponent(x);
    }

    loadProject = async () => {
        this.containerRef.clear();
        const x = await import(`./ribbon-project/ribbon-project.component`).then(c => c.RibbonProjectComponent)
        const componentRef = this.containerRef.createComponent(x);
    }

    loadBatchControlribbon = async () => {
        this.containerRef.clear();
        const x = await import(`./ribbon-batch-control/ribbon-batch-control.component`).then(c => c.RibbonBatchControlComponent)
        const componentRef = this.containerRef.createComponent(x);
    }

    loadConfigurationRibbon = async () => {
        this.containerRef.clear();
        const x = await import(`./ribbon-configuration/ribbon-configuration.component`).then(c => c.RibbonConfigurationComponent)
        const componentRef = this.containerRef.createComponent(x);
    }



}