import {Component, inject, Signal} from '@angular/core';
import { ManifestService } from '../service/manifest.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {BlogPost} from '../model/blog-manifest.model';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-blog-home',
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './blog-home.html',
  styleUrl: './blog-home.scss'
})
export class BlogHome {

  manifestService = inject(ManifestService);
  posts: Signal<BlogPost[] | undefined> = toSignal(this.manifestService.getAllPosts());


}
