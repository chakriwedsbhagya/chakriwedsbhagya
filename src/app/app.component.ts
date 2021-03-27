import { Component, ElementRef, ViewChild, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
declare var google;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  map;
  title = 'wedding';
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  videoTag;
  location;
  gmarkers = [];
  height;
  imageGallry = [
    {
      type : 'pre-wedding',
      src: './assets/gallery/img1.jpg'
    },
    {
      type : 'pre-wedding',
      src: './assets/gallery/img2.JPG'
    },
    {
      type : 'pre-wedding',
      src: './assets/gallery/img3.jpg'
    },
    {
      type : 'pre-wedding',
      src: './assets/gallery/img4.jpg'
    },
    {
      type : 'shoot',
      src: ''
    },
    {
      type : 'pre-wedding',
      src: './assets/gallery/img5.jpg'
    },
    {
      type : 'pre-wedding',
      src: './assets/gallery/img6.jpg'
    },
    {
      type : 'pre-wedding',
      src: './assets/gallery/img7.jpg'
    },
    {
      type : 'pre-wedding',
      src: './assets/gallery/img8.JPG'
    },
    {
      type : 'pre-wedding',
      src: './assets/gallery/img9.jpg'
    },
    {
      type : 'pre-wedding',
      src: './assets/gallery/img10.JPG'
    },
    {
      type : 'pre-wedding',
      src: './assets/gallery/img11.jpg'
    },
    {
      type : 'pre-wedding',
      src: './assets/gallery/img12.jpg'
    },
    {
      type : 'pre-wedding',
      src: './assets/gallery/img13.jpg'
    }

  ]
  constructor(private sanitizer: DomSanitizer) {
    //this.videoTag = this.getVideoTag();
    
  }
  ngOnChanges() {
    this.setCountDown()
    console.log(document.getElementById('img-5').offsetHeight)
  }
  ngOnInit() {
    
    this.setCountDown();
    this.renderMap();
  }
  ngAfterViewInit() {
   // document.getElementById('video').play();
   setTimeout(() => {
     this.height = document.getElementById('img-5').getBoundingClientRect().height;
    console.log()
   },2000)
   
  }

  myNavFunc(){
    // If it's an iPhone..
    if( (navigator.platform.indexOf("iPhone") != -1) 
        || (navigator.platform.indexOf("iPod") != -1)
        || (navigator.platform.indexOf("iPad") != -1))
         window.open("maps://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=[16.727503114319212],[81.85060050735873]");
    else
         window.open("https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=[16.727503114319212],[81.85060050735873]");
}

  setCountDown() {
    var countDownDate = new Date("May 27, 2021 01:00:00 ").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("seconds").innerHTML = this.seconds;
      document.getElementById("days").innerHTML = this.days;
      document.getElementById("minutes").innerHTML = this.minutes;
      document.getElementById("hours").innerHTML = this.hours;
    }, 1000);
  }
  private getVideoTag() {
    return this.sanitizer.bypassSecurityTrustHtml(
      ``
    );
  }



  renderMap(){
    this.location = { lat: 16.727503114319212, lng: 81.85060050735873 };
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.location,
      zoom: 16,
      disableDefaultUI: true,
      mapTypeId: 'roadmap',
      /* styles: [
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#B8B8B8'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#CDCDCD'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#8C9098'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#E3E5E7'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6D7C8C'}]
        },{
          featureType: 'road.highway',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#ffffff'}]
        }
      ]  */
    });
    let marker = new google.maps.Marker({
      position: this.location,
      icon: "./assets/wedding-couple.svg",
      map: this.map,
    });
    let infowindow = new google.maps.InfoWindow()
    this.gmarkers.push(marker);

        //Added event listners for blood bonar pointers
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent("<a href='comgooglemaps://?center=16.727503114319212,81.85060050735873&zoom=14&views=traffic' target='_blank'>Get Directions</a>");
              infowindow.open(this.map, marker);
            }
        })(marker));
    this.map.setCenter(this.location);
  }
}


