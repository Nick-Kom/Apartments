import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {AnnouncementService} from "../announcements-list/announcement.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DECIMALS_PATTERN, FLOAT_PATTERN} from "../../../helpers/regex/regex";
import {URL} from '../../../api/url';

import {Subscription} from 'rxjs/Subscription'
import {FileUploadService} from "../../file-upload/file-upload.service";
import {Image} from "../announcements-list/image";


@Component({
    selector: 'announcement-editor',
    templateUrl: 'announcement-editor.template.html',
    styleUrls: ['announcement-editor.less']
})

export class AnnouncementEditor implements OnInit {
    routeParams: Params = this.route.params;
    announcementId: number;
    announcementForm: FormGroup;
    annoucementOptions: any[];
    loading: boolean;
    subscription: Subscription;
    imagesNew: any[] = [];
    images: any[] = [];
    urlForImage: string = URL();
    maxImagesUpload: boolean;
    loader: boolean;
    hidden: boolean;

    announcement: any;
    address: any;
    price: any;

    @ViewChild("fileInput") inputEl: ElementRef;


    constructor(private fb: FormBuilder,
                private router: Router,
                private announcementsService: AnnouncementService,
                private dataFileUploadService: FileUploadService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.routeParams.subscribe((params: Params) => this.announcementId = +params['id']);
        this.equipmentsOptions();

        this.subscription = this.dataFileUploadService.getImageSrc()
            .subscribe(message => {
                this.loader = false;
                this.imagesNew = [...this.imagesNew, ...message];
            });

        if (this.announcementId) {
            this.announcementsService.getImages(this.announcementId)
                .subscribe((images: any) => {
                        this.images = images.json().map(
                            (item: any) => {
                                let url = item.imageUrl;
                                return {
                                    id: item.id,
                                    imageId: item.imageId,
                                    title: item.title,
                                    url: `${URL()}${url}`,
                                }
                            }
                        );
                    }
                );
        }
    }

    addImages() {
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let maxImages = ( inputEl.files.length + this.imagesNew.length + this.images.length );

        if (maxImages <= 8) {
            this.dataFileUploadService.uploadImages(inputEl).subscribe(
                (res: any) => {
                    this.inputEl.nativeElement.value = [];
                }
            );
        }
        this.loader = true;
        if (maxImages > 8) {
            this.maxImagesUpload = true;
            this.loader = false;
        }
        else {
            this.maxImagesUpload = false;
        }
    }

    equipmentsOptions() {
        this.announcementsService.getOptions().subscribe(
            res => {
                this.annoucementOptions = JSON.parse(res._body);
                if (!isNaN(this.announcementId)) {
                    this.announcementsService.getAnnouncementByIdSingle(this.announcementId)
                        .subscribe(res => {
                            console.log(res);
                            this.createForm(res)
                        });
                }
                else {
                    this.createForm();
                }
            },
            err => {
                throw new Error(err)
            }
        );
    }

    createForm(val?: any) {
        let options: any = {};
        for (let option of this.annoucementOptions) {
            let a = val ? val.facilities.find((facility: any) => option.id === facility.id) : false;
            options[option.id] = new FormControl(
                !!a
            )
        }

        let optionsFormGroup: FormGroup = new FormGroup(options);

        if (val) {
            this.announcementForm = this.fb.group({
                address: this.fb.group({
                    country: [val.address.country, [Validators.required, Validators.maxLength(50)]],
                    region: [val.address.region, [Validators.required, Validators.maxLength(50)]],
                    city: [val.address.city, [Validators.required, Validators.maxLength(50)]],
                    street: [val.address.street, [Validators.required, Validators.maxLength(50)]],
                    appartment: [val.address.appartment, [Validators.required, Validators.maxLength(50)]],
                }),
                description: this.fb.group({
                    title: [val.description.title, [Validators.required, Validators.maxLength(80)]],
                    shortDescription: [val.description.shortDescription],
                    livingPlaces: [val.description.livingPlaces, Validators.pattern(DECIMALS_PATTERN)],
                    room: [val.description.room, Validators.pattern(DECIMALS_PATTERN)],
                    options: optionsFormGroup
                }),
                priceBlock: this.fb.group({
                    price: [
                        val.price.price, [
                            Validators.required,
                            Validators.maxLength(20),
                            Validators.pattern(FLOAT_PATTERN)
                        ]
                    ],
                    type: [val.price.type]
                })
            });
        }
        else {
            this.announcementForm = this.fb.group({
                address: this.fb.group({
                    country: ['', [Validators.required, Validators.maxLength(50)]],
                    region: ['', [Validators.required, Validators.maxLength(50)]],
                    city: ['', [Validators.required, Validators.maxLength(50)]],
                    street: ['', [Validators.required, Validators.maxLength(50)]],
                    appartment: ['', [Validators.required, Validators.maxLength(50)]],
                }),
                description: this.fb.group({
                    title: ['', [Validators.required, Validators.maxLength(80)]],
                    shortDescription: [''],
                    livingPlaces: ['', Validators.pattern(DECIMALS_PATTERN)],
                    room: ['', Validators.pattern(DECIMALS_PATTERN)],
                    options: optionsFormGroup
                }),
                priceBlock: this.fb.group({
                    price: [
                        '', [
                            Validators.required,
                            Validators.maxLength(20),
                            Validators.pattern(FLOAT_PATTERN)
                        ]
                    ],
                    type: ['PER DAY'],
                })
            });
        }
    }

    saveDetails({value, valid, id = this.announcementId}: {value: any, valid: boolean, id: number}): void {
        this.loading = true;

        if (valid) {
            if (id) {
                this.announcementsService.updateAnnouncement({...value, 'hidden': this.hidden}, id, this.imagesNew)
                    .subscribe(
                        (res: any) => {
                            this.router.navigate(['/portal/announcements']);
                            return res;
                        })
            }
            else {
                this.announcementsService.createAnnouncement(value, this.imagesNew)
                    .subscribe(
                        res => {
                            this.router.navigate(['/portal/announcements']);
                            return res;
                        },
                        error => {
                            throw new Error(error)
                        });
            }
        }
    }

    showMap() {
        alert('Map will be here');
    }

    deleteImage(image: any) {
        this.maxImagesUpload = false;
        this.announcementsService.deleteImageAnnouncement(image, this.announcementId)
            .subscribe(res => {
            });
        this.images = this.images.filter(item => item.id !== image.id);
    }

    deleteImageNew(image: any) {
        this.maxImagesUpload = false;
        this.announcementsService.deleteImageNew(image)
            .subscribe(res => {
            });
        this.imagesNew = this.imagesNew.filter(item => item.id !== image.id);
    }


}


